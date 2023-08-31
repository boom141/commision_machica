from flask import Flask
from flask_cors import CORS

import os
APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES = os.path.join(APP_PATH, 'src/templates')
STATIC = os.path.join(APP_PATH, 'src/static')


def create_app():
    app = Flask(__name__, instance_relative_config=False,
                 template_folder=TEMPLATES, static_folder= STATIC)
    
    app.config.from_object('config.Config')
    CORS(app)

    with app.app_context():
        from src.scripts.controllers.views import views
        from src.scripts.controllers.auth import auth
        from src.scripts.controllers.core_func import core

        app.register_blueprint(views, url_prefix='/')
        app.register_blueprint(auth, url_prefix='/')
        app.register_blueprint(core, url_prefix='/')

        return app