from view.home.home import HomeView
from view.login.login import LoginView
from view.template.template import TemplateView
import flask


def register_view(app: flask.Flask):
    """
    Func. used to register all available view inside the application
    :param app: flask application instance
    :return: nothing
    """
    # last class registered first
    TemplateView.register(app)
    LoginView.register(app)
    HomeView.register(app)


