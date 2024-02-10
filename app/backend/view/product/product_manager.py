import json
from view.product.product import Product
from db.db_connection import SQLiteDBManager


class ProductManager:

    def __init__(self):
        pass

    def get_products(self, exclude_keys=[]):
        """
        Used to list all existing product
        :param exclude_keys: list of keys to remove from output's dictionaries
        :return: [
        {
          "prod__id": "Sedia",
          "prodname": "Sedia da ufficio",
          "proddesc": "Sedia Ergonomica ...",
          "prodcate": "ARREDAMENTO"
        }
        , ...]
        """
        query_select = """
        SELECT 
        prod__id, prodname, proddesc, prodcate
        FROM products"""
        db_connection = SQLiteDBManager()
        db_connection.connect()
        rows = db_connection.fetch_all(query_select, json=True)
        db_connection.disconnect()
        for inner_dict in rows:
            for key in exclude_keys:
                inner_dict.pop(key, None)
        return rows

    def get_products_by_key_value_pair(self, key, value, exclude_keys=[]):
        """
        Returns a list with all element matching specific keys and value.
        Constraints are under AND condition.
        :param key: db key to use for filter
        :param value: value to use for filtering given a key
        :return: list of dictionary or empty list if nothing matched the required constraints
        """
        query_select = f"""
                SELECT 
                prod__id, prodname, proddesc, prodcate
                FROM products
                WHERE {key}=%s"""
        params_condition = (value,)
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

