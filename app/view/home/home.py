from flask_classful import FlaskView, route
import flask_login


class HomeView(FlaskView):
    #METODI ACCETTATI PER LA RICHIESTA
    default_methods = ['POST']

    @route('/dashboard', methods=default_methods)
    @flask_login.login_required
    def dashboard(self):
        pass