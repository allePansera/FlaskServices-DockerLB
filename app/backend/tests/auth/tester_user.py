from app import app
import unittest


USERNAME = "tester"
PASSWORD = "tester"
LOGIN_API = "/api/login/auth"
LOGOUT_API = "/api/login/logout"


def session_decorator(func):
    """
    Given an 'app' instance from each unit class performs, if required, the login and logout task
    :return: nothing
    """
    def wrapper(*args, **kwargs):
        app = args[0].app
        """1st: perform the login"""
        content_type = "application/json"
        data = {"user__id": USERNAME, "user_pwd": PASSWORD}
        response = app.post(LOGIN_API, json=data, content_type=content_type)
        error_msg = eval(response.data.decode()).get("message")
        unittest.TestCase().assertEqual(response.status_code, 200, error_msg)
        """2nd: perform the function real task"""
        result = func(*args, **kwargs)
        """3rd: perform the logoout"""
        response = app.post(LOGOUT_API)
        error_msg = eval(response.data.decode()).get("message")
        unittest.TestCase().assertEqual(response.status_code, 200, error_msg)
        return result
    return wrapper


class TesterUser(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_login_process(self):
        """
        Check if login, given a specific user, is performed correctly.
        200 Ok
        401 User not found
        503 Internal error
        """
        content_type = "application/json"
        data = {"user__id": USERNAME, "user_pwd": PASSWORD}
        response = self.app.post(LOGIN_API, json=data, content_type=content_type)
        error_msg = eval(response.data.decode()).get("message")
        self.assertEqual(response.status_code, 200, error_msg)

    def test_logout_process(self):
        """
        Check if logout is performed correctly.
        200 Ok
        401 User not found
        503 Internal error
        """
        content_type = "application/json"
        data = {"user__id": USERNAME, "user_pwd": PASSWORD}
        self.app.post(LOGIN_API, json=data, content_type=content_type)
        response = self.app.post(LOGOUT_API)
        error_msg = eval(response.data.decode()).get("message")
        self.assertEqual(response.status_code, 200, error_msg)


if __name__ == '__main__':
    unittest.main()
