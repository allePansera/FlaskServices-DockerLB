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
    - limit: limit to use for paginated requests
    - offset: offset to use for paginated requests
    - like_index: list of indexes to use for text research, empty list if not used
    - like_search: text research value, leave empty string if not used
    - sorting_col: col used for sorting, default index is 0 (it's supposed to be an ID)
    - sorting_direction: sorting direction for specified col, default is 'asc'
    FILTERS REGARDING CONTENT OR SORTING ARE CURRENTLY NOT IMPLEMENTED!
    :return:
    """
    limit = int(request.args.get("limit", 10))
    offset = int(request.args.get("offset", 0))
    like_index = request.args.getlist('like_index')
    like_search = request.args.get("like_search", "")
    sorting_col = int(request.args.get("sorting_col", 0))
    sorting_direction = request.args.get("sorting_direction", "asc")
    products_manager = ProductManager()
    output = products_manager.get_products_pagination(limit=limit, offset=offset)
    rows = products_manager.get_products_len()
    # TODO define row filtered
    # TODO handle like and sorting params
    # TODO add from front-end 'where' param for specific search
    return jsonify({
        'rowData': output,
        'rowCount': rows,
        'rowFilteredRecords': 100
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
