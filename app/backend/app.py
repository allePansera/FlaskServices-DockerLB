from flask import Flask
from flask_login import LoginManager
from flask_debugtoolbar import DebugToolbarExtension
from flask.blueprints import Blueprint
from db.db_connection import SQLiteDBManager


# Session expirancy
SESSION_EXPRIANCE_MIN = 360
# Defining flask application
app = Flask(__name__)
# Defining securities constraint
app.config['SECRET_KEY'] = "TestAppKey"
# Login manager cookies based
login_manager = LoginManager()
login_manager.init_app(app)
# Configuring debug toolbar
toolbar = DebugToolbarExtension(app)
# Init DB
db_connection = SQLiteDBManager()
db_connection.connect()
db_connection.initialize()
db_connection.disconnect()

# View connection
from view.home.home_view import home
from view.login.login_view import login
from view.user.user_view import user
from view.category.category_view import category
from view.product.product_view import product

# API prefix
base_prefix = "/api"
parent = Blueprint('parent', __name__, url_prefix=base_prefix)
parent.register_blueprint(home)
parent.register_blueprint(login)
parent.register_blueprint(user)
parent.register_blueprint(category)
parent.register_blueprint(product)
app.register_blueprint(parent)

