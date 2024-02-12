import json
from view.product.product import Product
from db.db_connection import SQLiteDBManager


class ProductManager:

    def __init__(self):
        pass

    def get_products_len(self):
        """
        Method related to pagination for total rows param handling.
        TODO: optimize this method considering the usage of index or checking table properties
        :return: integer value representing total number of instances
        """
        query_select = """SELECT COUNT(*) FROM products"""
        db_connection = SQLiteDBManager()
        db_connection.connect()
        rows = db_connection.fetch_all(query_select, json=False)
        db_connection.disconnect()
        return int(rows[0][0])

    def get_products_pagination(self, exclude_keys=[], limit=100, offset=0):
        """
        Used to list all existing product.
        This method is built for pagination, it's mandatory to keep track of stat row and end row.
        :param exclude_keys: list of keys to remove from output's dictionaries
        :
        :return: [
        {
          "prod__id": "Sedia",
          "prodname": "Sedia da ufficio",
          "proddesc": "Sedia Ergonomica ...",
          "prodcate": "ARREDAMENTO"
        }
        , ...]
        """
        query_select = f"""
        SELECT 
        prod__id, prodname, proddesc, prodcate
        FROM products
        LIMIT {limit} OFFSET {offset}
        """
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

