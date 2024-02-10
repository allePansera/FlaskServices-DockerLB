from flask import jsonify
from flask.blueprints import Blueprint
from view.product.product_manager import ProductManager
import flask_login


product = Blueprint('product', __name__, template_folder='templates', static_folder='static', url_prefix='/product')


@product.route('/list', methods=["GET"])
def list_products():
    """
    Endpoint used to populate datatable
    :return: list of product and related id
    """
    products_manager = ProductManager()
    output = products_manager.get_products()
    return jsonify(output), 200


@product.route('/list/<key>/<value>', methods=["GET"])
@flask_login.login_required
def list_products_key_value_pair(key, value):
    """
    Return product considering key and value
    :return: list of product and related id
    """
    category_manager = ProductManager()
    output = category_manager.get_product_by_key_value_pair(key=key, value=value)
    return jsonify(output), 200
