from flask import request
from flask import jsonify
from flask.blueprints import Blueprint
from view.user.user_manager import UserManager
import flask_login

user = Blueprint('user', __name__, template_folder='templates', static_folder='static', url_prefix='/user')


@user.route('/list/login', methods=["GET"])
def list_login():
    """
    Endpoint used to populate select inside login page
    :return: list of username and related id
    """
    user_manager = UserManager()
    exclude_keys = ["user_pwd", "userrole"]
    output = user_manager.get_users(exclude_keys=exclude_keys)
    return jsonify(output), 200


@user.route('/list/registry', methods=["GET"])
@flask_login.login_required
def list_registry():
    """
    Endpoint used to populate user category-registry
    :return: list of username, id and role
    """
    user_manager = UserManager()
    exclude_keys = ["user_pwd"]
    output = user_manager.get_users(exclude_keys=exclude_keys)
    return jsonify(output), 200


@user.route('/list', methods=["GET"])
def list_users():
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
    products_manager = UserManager()
    output = products_manager.get_users_pagination(limit=limit, offset=offset)
    rows = products_manager.get_users_len()
    # TODO define row filtered
    # TODO handle like and sorting params
    # TODO add from front-end 'where' param for specific search
    return jsonify({
        'rowData': output,
        'rowCount': rows,
        'rowFilteredRecords': 100
    }), 200
