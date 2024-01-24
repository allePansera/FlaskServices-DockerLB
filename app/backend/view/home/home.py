from flask_classful import FlaskView, route
from flask.blueprints import Blueprint
import flask_login

home = Blueprint('home', __name__, template_folder='templates', static_folder='static')


class HomeView(FlaskView):
    #METODI ACCETTATI PER LA RICHIESTA
    default_methods = ['POST']

    @home.route('/dashboard', methods=default_methods)
    @flask_login.login_required
    def dashboard(self):
        pass