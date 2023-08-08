from flask import Blueprint, redirect, render_template, url_for, request, flash, session
from src.scripts.backend_func.db_init import mongoDb
from src.scripts.backend_func.payment import requestPayment
from src.scripts.backend_func.smtp import emailService

views = Blueprint('views', __name__)

@views.route('/', methods=['POST','GET'])
def landing():
    return render_template('landing.html')

@views.route('/about')
def about():
    return render_template('about.html')

@views.route('/services', methods=['POST','GET'])
def services():
    return render_template('services.html')


@views.route('/confirm')
def confirm():
    if 'value' in session:
        print("\n",session['value'])

        if mongoDb.AddBooking(session['value']):
            return render_template('confirm.html', email=session['value']['email']) 
        else:
            return redirect(url_for('.services'))
    