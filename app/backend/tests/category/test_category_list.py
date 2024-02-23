from app import app
from tests.auth.tester_user import session_decorator
import unittest

CATEGORY_LIST_API = "api/category/list"


class TestCategoryList(unittest.TestCase):
    def setUp(self):
        """
        Define client
        """
        self.app = app.test_client()

    @session_decorator
    def test_listing(self):
        """
        Check if login, given a specific user, is performed correctly.
        200 Ok
        401 User not found
        503 Internal error
        """
        response = self.app.get(CATEGORY_LIST_API)
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
