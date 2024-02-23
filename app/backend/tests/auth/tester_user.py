from app import app
import unittest

USERNAME = "tester"
PASSWORD = "tester"


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
        response = self.app.post('/api/login/auth', json=data, content_type=content_type)
        data = response.get_json()
        self.assertEqual(response.status_code, 200)

    def test_logout_process(self):
        """
        Check if logout is performed correctly.
        200 Ok
        401 User not found
        503 Internal error
        """
        content_type = "application/json"
        data = {"user__id": USERNAME, "user_pwd": PASSWORD}
        self.app.post('/api/login/auth', json=data, content_type=content_type)
        response = self.app.post('/api/login/logout')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)




if __name__ == '__main__':
    unittest.main()
