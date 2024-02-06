from flask.blueprints import Blueprint
from flask import jsonify
import flask_login

home = Blueprint('home', __name__, template_folder='templates', static_folder='static', url_prefix='/home')


@home.route('/dashboard', methods=["POST", "GET"])
def dashboard():
    return jsonify({"status": True, "msg": "Test dashboard"})

