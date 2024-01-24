from flask_classful import FlaskView
from flask_classful import route
from flask import render_template

config = dict
config["ASSETS_ROOT"] = "static/assets"


class TemplateView(FlaskView):

    @route("/", defaults={'path': 'homePage'}, methods=["GET"])
    @route('/<path:path>')
    def index(self, path):
        return render_template("index.html", config=config, path=f"/{path}")

