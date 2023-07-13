from flask import Blueprint, redirect, render_template, url_for

views = Blueprint('views', __name__)

@views.route('/')
def landing():
    return render_template('landing.html')


@views.route('/services')
def services():
    return render_template('services.html')


@views.route('/register')
def register():
    return render_template('user_register.html')