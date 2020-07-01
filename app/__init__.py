

from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False)

    app.config.from_object('config.DevelopmentConfig') # grabbing the development config class out of config.py

    db.init_app(app)
    migrate.init_app(app, db)


    with app.app_context():

        from .public_access_blueprint import public_access # giving the app access to this folder and this file
        from .errors_blueprint import error_handlers

        app.register_blueprint(public_access.public_access_bp)  # registering the blueprint inside that file
        app.register_blueprint(error_handlers.error_handlers_bp)

        from . import models

        return app


