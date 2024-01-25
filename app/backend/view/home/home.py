from flask.blueprints import Blueprint
import flask_login

home = Blueprint('home', __name__, template_folder='templates', static_folder='static', url_prefix='/home')


@home.route('/dashboard', methods=["POST"])
@flask_login.login_required
def dashboard():
    pass