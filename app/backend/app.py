from flask import Flask
from flask_login import LoginManager
from flask.blueprints import Blueprint

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

# API prefix
base_prefix = "/api"
parent = Blueprint('parent', __name__, url_prefix=base_prefix)
parent.register_blueprint(home)
parent.register_blueprint(login)
app.register_blueprint(parent)

