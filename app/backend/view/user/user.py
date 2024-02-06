from flask_login import UserMixin


class User(UserMixin):
    def __init__(self, user__id, username, user_pwd, userrole="GUEST"):
        """
        Build UserMixin override class used inside flask login module to handle auth.
        :param user__id: user id
        :param username: user name
        :param user_pwd: user password
        :param userrole: user role
        """
        self.user__id = user__id
        self.username = username
        self.user_pwd = user_pwd
        self.userrole = userrole

