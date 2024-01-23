from view.home.home import HomeView
from view.login.login import LoginView
import flask


def register_view(app: flask.Flask):
    """
    Func. used to register all available view inside the application
    :param app: flask application instance
    :return: nothing
    """
    # last class registered first
    LoginView.register(app)
    HomeView.register(app)


