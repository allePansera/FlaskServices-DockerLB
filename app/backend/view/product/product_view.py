from flask import jsonify, request
from flask.blueprints import Blueprint
from view.product.product_manager import ProductManager
import flask_login


product = Blueprint('product', __name__, template_folder='templates', static_folder='static', url_prefix='/product')


@product.route('/list', methods=["GET"])
def list_products():
    """
    Endpoint used to populate datatable.
    Args required:
    - start_row: starting row for pagination
    - end_row: ending row for pagination
    :return:
    """
    start_row = int(request.args.get('startRow', 0))
    end_row = int(request.args.get('endRow', 10))
    products_manager = ProductManager()
    output = products_manager.get_products_pagination(start_row=start_row, end_row=end_row)
    rows = products_manager.get_products_len()
    return jsonify({
        'rowData': output,
        'rowCount': rows
    }), 200


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
