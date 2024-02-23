import json
from view.user.user import User
from db.db_connection import SQLiteDBManager


class UserManager:

    def __init__(self):
        pass

    def get_users(self, exclude_keys=[]):
        """
        Used to list all existing user
        :return: [
        {
          "username": "Alessandro Pansera",
          "user_pwd": "AP01",
          "user__id": "AP__0001",
          "userrole": "A"
        }
        , ...]
        """
        QUERY_SELECT_USER = """
        SELECT 
        user__id, username, user_pwd, userrole
        FROM users"""
        db_connection = SQLiteDBManager()
        db_connection.connect()
        rows = db_connection.fetch_all(QUERY_SELECT_USER, json=True)
        db_connection.disconnect()
        for inner_dict in rows:
            for key in exclude_keys:
                inner_dict.pop(key, None)
        return rows

    def get_roles(self):
        """
        Used to list all existing roles
        :return: [
        {
          "role__id": "ADMIN",
          "rolename": "Admin"
        }
        , ...]
        """
        QUERY_SELECT_ROLES = """
                SELECT role__id, rolename
                FROM users_roles"""
        db_connection = SQLiteDBManager()
        db_connection.connect()
        rows = db_connection.fetch_all(QUERY_SELECT_ROLES)
        db_connection.disconnect()
        return json.dumps([dict(ix) for ix in rows])

    def get_user_by_id(self, user__id):
        # get all existing user
        users = self.get_users()
        # compare user id with all listed inside user var.
        for user in users:
            if user.get("user__id") == user__id:
                return True, User(**user)
        return False, "User not found"

    def check(self, user__id, user_pwd):
        """
        Return user instance weather user exists or not
        :param user__id: login attempt id
        :param user_pwd: login attempt passwd
        :return: True, user instance; otherwise False, str(error)
        """
        # get all existing user
        users = self.get_users()
        # compare login credential with all existing user
        for user in users:
            if user.get("user__id") == user__id and user.get("user_pwd") == user_pwd:
                return True, User(**user)
        return False, "User not found"

    ## FUNCTIONS FOR PAGINATIONS

    def get_users_len(self):
        """
        Method related to pagination for total rows param handling.
        TODO: optimize this method considering the usage of index or checking table properties
        :return: integer value representing total number of instances
        """
        query_select = """SELECT COUNT(*) FROM users"""
        db_connection = SQLiteDBManager()
        db_connection.connect()
        rows = db_connection.fetch_all(query_select, json=False)
        db_connection.disconnect()
        return int(rows[0][0])

    def get_users_pagination(self, exclude_keys=[], limit=100, offset=0):
        """
        Used to list all existing users.
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
        user__id, username, userrole
        FROM users
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

