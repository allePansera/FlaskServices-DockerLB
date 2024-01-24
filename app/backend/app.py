from flask import Flask
from flask_login import LoginManager
from view.home.home import HomeView
from view.login.login import LoginView
from view.template.template import TemplateView


# Defining flask application
app = Flask(__name__)
# Defining securities constraint
app.config['SECRET_KEY'] = "TestAppKey"
# Login manager defined -> cookies based system
login_manager = LoginManager()
login_manager.init_app(app)
# Session expirancy
SESSION_EXPRIANCE_MIN = 360
# View connection
TemplateView.register(app)
LoginView.register(app)
HomeView.register(app)


if '__main__' == __name__:
    app.run(host="0.0.0.0", debug=True)


