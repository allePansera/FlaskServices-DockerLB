from flask import Flask
from flask_login import LoginManager


login_manager = None
app = None
# Session expirancy
SESSION_EXPRIANCE_MIN = 360

def create_app():
    # Defining flask application
    app_instance = Flask(__name__)
    # Defining securities constraint
    app_instance.config['SECRET_KEY'] = "TestAppKey"
    return app_instance


def create_login_manager(app_instance: Flask):
    # Login manager defined -> cookies based system
    global login_manager
    login_manager = LoginManager()
    login_manager.init_app(app_instance)


def register_blue_print(app_instance: Flask):
    # View connection
    from view.home.home import home
    from view.login.login import login
    from view.template.template import template

    app_instance.register_blueprint(template)
    app_instance.register_blueprint(home)
    app_instance.register_blueprint(login)






if '__main__' == __name__:
    app = create_app()
    create_login_manager(app)
    register_blue_print(app)
    app.run(host="0.0.0.0", debug=True)


