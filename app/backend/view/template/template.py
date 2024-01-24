from flask_classful import FlaskView
from flask_classful import route
from flask import render_template
from flask.blueprints import Blueprint

config = dict
config["ASSETS_ROOT"] = "static/assets"

template = Blueprint('template', __name__, template_folder='templates', static_folder='static')

class TemplateView(FlaskView):

    @template.route("/", defaults={'path': 'homePage'}, methods=["GET"])
    @template.route('/<path:path>')
    def index(self, path):
        return render_template("index.html", config=config, path=f"/{path}")

