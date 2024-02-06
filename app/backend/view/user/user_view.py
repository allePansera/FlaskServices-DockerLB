from flask import request
from flask import jsonify
from flask.blueprints import Blueprint
from view.user.user_manager import UserManager
import flask_login


user = Blueprint('user', __name__, template_folder='templates', static_folder='static', url_prefix='/user')


@user.route('/list', methods=["GET"])
def list():
    """
    Endpoint used to populate select
    :return: list of username and related id
    """
    user_manager = UserManager()
    output = user_manager.get_users(exclude_keys=['user_pwd', 'userrole'])
    return jsonify(output)
