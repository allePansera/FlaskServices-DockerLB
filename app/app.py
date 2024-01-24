from flask import Flask, Response
from flask_login import LoginManager
from library import register_view


# Defining flask application
app = Flask(__name__)
# Defining securities constraint
app.config['SECRET_KEY'] = "TestAppKey"
# Login manager defined -> cookies based system
login_manager = LoginManager()
login_manager.init_app(app)
# Register all implemented view to the application
register_view(app)
# Session expirancy
SESSION_EXPRIANCE_MIN = 360

@app.route("/home_page")
def home_page():
    return Response(response="Home Page", status=200)



if '__main__' == __name__:
    app.run(host="0.0.0.0", debug=True)


