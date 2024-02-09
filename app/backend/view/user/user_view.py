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
    Endpoint used to populate user registry
    :return: list of username, id and role
    """
    user_manager = UserManager()
    exclude_keys = ["user_pwd"]
    output = user_manager.get_users(exclude_keys=exclude_keys)
    return jsonify(output), 200
