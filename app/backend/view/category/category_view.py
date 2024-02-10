from flask import request
from flask import jsonify
from flask.blueprints import Blueprint
from view.category.category_manager import CategoryManager
import flask_login


category = Blueprint('category', __name__, template_folder='templates', static_folder='static', url_prefix='/category')


@category.route('/list', methods=["GET"])
@flask_login.login_required
def list_categories():
    """
    Endpoint used to populate category-category-registry data-table
    :return: list of categories and related id
    """
    category_manager = CategoryManager()
    output = category_manager.get_categories()
    return jsonify(output), 200


@category.route('/list/<key>/<value>', methods=["GET"])
@flask_login.login_required
def list_categories_key_value_pair(key, value):
    """
    Return categories considering key and value
    :return: list of categories and related id
    """
    category_manager = CategoryManager()
    output = category_manager.get_category_by_key_value_pair(key=key, value=value)
    return jsonify(output), 200
