-- Ti arriva dal front
SET @search_term = '%search_term%';
-- Passa qui la lista di nomi di colonne, ti arriva dal front
SET @columns_to_search = 'column1, column2, column3';
-- Te la passo come parametro in quanto estraggo tutto da un file e faccio le replace delle variabili
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


/*
Segue anche la vecchia procedura che era stata creata.
*/

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Datatable`(OUT recordsFiltered int, OUT recordsTotal int, baseQuery varchar(1000), myLimit int, myOffset int, whereCondition json, likeCondition json, sortedColumn varchar(100), sortedOrder varchar(4))
BEGIN
/* Viene eseguita la query passata come baseQuery aggiugendo i parametri extra che
        servono per la paginazione all'interno delle datatable.
        Regola: se limit >= 0 e offset > 0 aggiungo le 2 chiavi nella ricerca per la paginazione
        Regola: se sortedColumn e sortedOrder sono 2 stringhe vuote non eseguo l'ordinamento
        Regola: se non ho condizioni di where allora passo la stringa '{}'
        Regola: se non ho condizioni di like allora passo la stringa '{}'
        */
--
        --
        DECLARE queryDatatable varchar(1000);
        DECLARE cond1_json json;
        DECLARE cond2_json json;
        DECLARE sortedCol varchar(100);
DECLARE sortedOrd varchar(4);
        DECLARE jsonkey varchar(1000);
        DECLARE keynum INT;
        DECLARE numSearch INT;
DECLARE numCond INT;
        DECLARE i INT;
        DECLARE c INT;
        DECLARE almeno1cond INT;
        DECLARE mykey VARCHAR(5000);
DECLARE myvalue VARCHAR(5000);
        DECLARE myField VARCHAR(5000);
        DECLARE myval VARCHAR(5000);

        set queryDatatable = baseQuery; -- salvo in una variabile la mia query su cui fare l'append
        set cond1_json = whereCondition; -- metto la condizione di where in una variabile
        set cond2_json = likeCondition; -- metto la condizione di like in una variabile
        set sortedCol = sortedColumn; -- setto la colonna di sorting
set sortedOrd = sortedOrder; -- serve ad identificare il tipo di ordinamento per attributo ('ASC','DESC')

        set jsonkey = '';
set keynum = 0;

        -- se il json per la whereCondition ha almeno una chiave allora estraggo le chiavi
        if cond1_json <> '{}' and cond1_json is not null then
set jsonkey = JSON_KEYS(cond1_json); -- estrae le chiavi di ricerca per la condizione di where
set keynum = JSON_LENGTH(jsonkey,'$'); -- verifico il numero di chiavi di ricerca
        end if;

        set numSearch = 0;
set numCond = 0;

        -- se il json per la likeCondition ha un elemento almeno allora estraggo i dati per la like
        if cond2_json <> '{}' and cond2_json is not null then
set numSearch = JSON_LENGTH(cond2_json,'$.index'); -- estraggo le stringhe da ricercare
set numCond = JSON_LENGTH(cond2_json,'$.search'); -- estraggo le stringhe da ricercare
end if;

        set i=0;
        set almeno1cond = 0; -- serve a verificare se ho messo almeno una codizione di where semplice

        WHILE i < keynum DO -- ciclo per il numero di chiavi
-- setto la variabile che indica che ho trovato almeno 1 condizione
set almeno1cond = 1;
            -- se è la prima volta che ciclo sul numero delle condizioni allora vado a concatenare la where condition
if i=0 then
set queryDatatable = concat(queryDatatable, ' where ') ; -- sulla prima condizione metto la where
end if;
-- inserisco le coppie <chiave:valore> a seguito della where con la corretta spaziatura
set mykey = JSON_UNQUOTE(JSON_EXTRACT(jsonkey ,CONCAT('$[',i,']'))); -- estraggo la chiave senza apici
set myvalue = JSON_UNQUOTE(JSON_EXTRACT(cond1_json ,CONCAT('$.',JSON_UNQUOTE(mykey)))); -- estraggo il valore relativo alla chiave
set queryDatatable = concat(queryDatatable, mykey,'=',quote(myvalue)) ; -- concateno la condizione di where
set i = i + 1;
            -- dopo aver concatenato la condizione di where singola aggiungo la and per la corretta composizione della query
if i < keynum then
set queryDatatable = concat(queryDatatable, ' and ') ; -- se ho più di una condizione e non sono sulla ultima aggiungo and
end if ;
            -- ora leggo la prossima condizione da testare
END WHILE;

        /* ESEGUO LA EVENTUALE RICERCA FULL TEXT*/
        set i=0;
WHILE i < numCond DO
set c=0;

            /*vecchia chiamata
            call formatLike(@queryDatatable, @i , @numSearch, @almeno1cond, @cond2_json);
            */

            /******* format like ******/

            WHILE c < numSearch DO

if i=0 and c=0 then
if almeno1cond=0 then
set queryDatatable = concat(queryDatatable, ' where (');
else
set queryDatatable = concat(queryDatatable, ' and ((');
end if;
end if;

if  i>0 and c=0 then
set queryDatatable = concat(queryDatatable, ' and (');
end if;

set myField = JSON_UNQUOTE(JSON_EXTRACT(cond2_json ,CONCAT('$.index[',c,']')));
set myval = JSON_UNQUOTE(JSON_EXTRACT(cond2_json ,CONCAT('$.search[',i,']')));
set queryDatatable = concat(queryDatatable,myField, ' like "%',myval,'%"');
set c = c + 1;
if c < numSearch then
set queryDatatable = concat(queryDatatable, ' or ') ; -- se ho più di una condizione e non sono sulla ultima aggiungo or
else
set queryDatatable = concat(queryDatatable, ')') ; -- chiudo le parentesi
end if ;
/*** remmato non serve
set baseQuery = @baseQuery;
select baseQuery, @baseQuery;***/
END WHILE;

            /******* fine format like ******/


            -- select @queryDatatable, @numCond;
set i = i + 1;
            -- in questo caso vado a concatenare la mia query di select con la condizione di like
            -- se ho raggiunto il numero delle concatenazioni da fare allora aggiungo la tonda finale
if i = numCond and almeno1cond>0 then
set queryDatatable = concat(queryDatatable, ')') ;
end if ;

        END WHILE;

        -- vado ad inserire le opzioni di sorting solo se necessario
        if sortedCol is not null and sortedCol <> '' then
set queryDatatable = concat(queryDatatable, ' order by ',sortedCol ,' ',case when sortedOrd is null then 'asc' else sortedOrd end);
        end if;

        -- vado ad inserire le opzioni per la paginazione solo se necessario
if myLimit > 0 and myOffset >= 0 then
set queryDatatable = concat(queryDatatable, ' limit ',myLimit ,' offset ', myOffset);
end if;


-- aggiorno le variabili che contengono i conteggi
set recordsFiltered = 1;
set recordsTotal = 2;
-- select queryDatatable, myLimit, myOffset;
set @queryDatatable = queryDatatable;
PREPARE stmt FROM @queryDatatable;
EXECUTE stmt;



END$$
DELIMITER ;
