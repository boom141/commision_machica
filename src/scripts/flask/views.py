from flask import Blueprint, redirect, render_template, url_for

views = Blueprint('views', __name__)

@views.route('/')
def landing():
    return render_template('landing.html')