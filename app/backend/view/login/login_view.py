from flask import redirect
from flask import url_for
from flask import session
from flask import request
from flask import jsonify
from flask.blueprints import Blueprint
from flask_login import current_user
from datetime import timedelta
from app import login_manager
from app import app
from app import SESSION_EXPRIANCE_MIN
from view.user.user_manager import UserManager
import flask_login
import json
import traceback


LOGIN_SUCCESSFULLY = "Login attempted correctly"
LOGIN_FAILED = "Login failed, wrong credentials"
LOGOUT_SUCCESSFULLY = "Logout attempted correctly"
LOGOUT_FAILED = "Logout failed"

login = Blueprint('login', __name__, template_folder='templates', static_folder='static', url_prefix='/login')


@login_manager.user_loader
def load_user(ut____id):
    """
    Func. used to load per request user infos receiving its id
    :param ut____id: user unique id
    :return: User istance if found otherwise not
    """
    user_manager = UserManager()
    check, output = user_manager.get_user_by_id(ut____id)
    if check:
        user_instance = output
        return user_instance
    else:
        return None


@app.before_request
def make_session_permanent():
    """By default, each session lasts an amount of min decided inside app.py script"""
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=SESSION_EXPRIANCE_MIN)


@login_manager.unauthorized_handler
def unauthorized_callback():
    """Redirects for unsupported request due to lack of permission"""
    return redirect(url_for('login.logout'))


@app.errorhandler(500)
def internal_error(error):
    """Redirects to page containing 500 error description"""
    # TODO: Create error page
    return redirect(url_for('login.logout'))


@login.route('/auth', methods=["POST"])
def auth():
    """
    Check the login attempt considering the following expected variables:
    :param user__id: user attempted id
    :param user_pwd: user attempted passwd
    :return: {"status": True, "msg": LOGIN_SUCCESSFULLY} or
    {"status": False, "msg": LOGIN_FAILED}
    """
    try:
        req = json.loads(request.data.decode())
        user__id = req.get("user__id", "")
        user_pwd = req.get("user_pwd", "")
        user_manager = UserManager()
        check, output = user_manager.check(user__id, user_pwd)
        if check:
            user_instance = output
            flask_login.login_user(user_instance)
            return jsonify(message=LOGIN_SUCCESSFULLY), 200
        else:
            return jsonify(message=LOGIN_FAILED), 401
    except Exception as e:
        return jsonify(message=str(traceback.print_exc())), 503


@login.route('/logout', methods=["POST"])
def logout():
    """
    Execute logout of user given its id retrieved from current user cookies
    :return: {"status": True, "msg": LOGOUT_SUCCESSFULLY} or
    {"status": False, "msg": LOGOUT_FAILED}
    """
    try:
        if current_user.is_authenticated:
            flask_login.logout_user()
            return jsonify(message=LOGOUT_SUCCESSFULLY), 200
        else:
            return jsonify(message=LOGOUT_FAILED), 401
    except Exception as e:
        return jsonify(message=str(traceback.print_exc())), 503
