from flask import Flask
from flask_login import LoginManager

# Session expirancy
SESSION_EXPRIANCE_MIN = 360
# Defining flask application
app = Flask(__name__)
# Defining securities constraint
app.config['SECRET_KEY'] = "TestAppKey"
# Login manager cookies based
login_manager = LoginManager()
login_manager.init_app(app)

# View connection
from view.home.home import home
from view.login.login import login
from view.template.template import template
app.register_blueprint(template)
app.register_blueprint(home)
app.register_blueprint(login)

