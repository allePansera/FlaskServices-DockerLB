import json
from view.category.category import Category
from db.db_connection import SQLiteDBManager


class CategoryManager:

    def __init__(self):
        pass

    def get_categories(self, exclude_keys=[]):
        """
        Used to list all existing user
        :param exclude_keys: list of keys to remove from output's dictionaries
        :return: [
        {
          "cate__id": "ARREDAMENTO",
          "catename": "AP01"
        }
        , ...]
        """
        query_select = """
        SELECT 
        cate__id, catename
        FROM categories"""
        db_connection = SQLiteDBManager()
        db_connection.connect()
        rows = db_connection.fetch_all(query_select, json=True)
        db_connection.disconnect()
        for inner_dict in rows:
            for key in exclude_keys:
                inner_dict.pop(key, None)
        return rows

    def get_category_by_key_value_pair(self, key, value, exclude_keys=[]):
        """
        Returns a list with all element matching specific keys and value.
        Constraints are under AND condition.
        :param key: db key to use for filter
        :param value: value to use for filtering given a key
        :return: list of dictionary or empty list if nothing matched the required constraints
        """
        query_select = f"""
                SELECT 
                cate__id, catename
                FROM categories 
                WHERE {key}=%s"""
        params_condition = (value, )
        db_connection = SQLiteDBManager()
        db_connection.connect()
        rows = db_connection.fetch_all(query_select,
                                       params=params_condition,
                                       json=True)
        db_connection.disconnect()
        for inner_dict in rows:
            for key in exclude_keys:
                inner_dict.pop(key, None)
        return rows
