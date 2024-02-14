SET @search_term = '%search_term%';
SET @columns_to_search = 'column1, column2, column3'; -- Passa qui la lista di nomi di colonne

SET @sql = CONCAT('
    SELECT *
    FROM YourTableName
    WHERE ',
    (
        SELECT GROUP_CONCAT(CONCAT('`', column_name, '` LIKE ', QUOTE(@search_term)))
        FROM information_schema.columns
        WHERE table_name = 'YourTableName' AND column_name IN (@columns_to_search)
    ),
    ' ORDER BY
        CASE @sort_index
            WHEN 1 THEN column1
            WHEN 2 THEN column2
            WHEN 3 THEN column3
        END
    LIMIT @page_size OFFSET @start_index;'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
