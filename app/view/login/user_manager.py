import json
from app.view.login.user import User


class UserManager:

    def __init__(self, user_file_storage = "static/db/users/user.json"):
        self.user_file_storage = user_file_storage

    def get_users(self):
        """
        Used to list all existing users
        :return: [
        {
          "username": "Alessandro Pansera",
          "password": "AP01",
          "id": "AP__0001",
          "role": "A"
        }
        , ...]
        """
        data = []
        with open() as fd:
            json_content = json.load(fd)
            data.extend(json_content.get("user_list", []))

        return data

    def get_roles(self):
        """
        Used to list all existing roles
        :return: [
        {
          "description": "Admin",
          "code": "A"
        }
        , ...]
        """
        data = []
        with open() as fd:
            json_content = json.load(fd)
            data.extend(json_content.get("roles", []))

        return data

    def get_user_by_id(self, id):
        # get all existing users
        users = self.get_users()
        # compare user id with all listed inside users var.
        for user in users:
            if user.get("id") == id:
                return True, User(ut____id=user.get("id"),
                                  utdescri=user.get("description"),
                                  ut__role=user.get("role"))
        return False, "User not found"

    def check(self, id, password):
        """
        Return user instance weather user exists or not
        :param id: login attempt id
        :param password: login attempt passwd
        :return: True, user instance; otherwise False, str(error)
        """
        # get all existing users
        users = self.get_users()
        # compare login credential with all existing users
        for user in users:
            if user.get("id") == id and user.get("password") == password:
                return True, User(ut____id=user.get("id"),
                            utdescri=user.get("description"),
                            ut__role=user.get("role"))
        return False, "User not found"

