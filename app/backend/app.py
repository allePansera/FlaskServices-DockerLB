from flask import Flask
from flask_login import LoginManager
from view.home.home import home
from view.login.login import login
from view.template.template import template




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
app.register_blueprint(template)
app.register_blueprint(home)
app.register_blueprint(login)


if '__main__' == __name__:
    app.run(host="0.0.0.0", debug=True)


