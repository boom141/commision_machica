from flask import Blueprint, redirect, render_template, url_for, request, flash, session
from src.scripts.backend_func.db_init import mongoDb
from src.scripts.backend_func.smtp import emailService

views = Blueprint('views', __name__)

@views.route('/')
def landing():
    return render_template('landing.html')


@views.route('/services')
def services():
    return render_template('services.html')


@views.route('/register', methods=['POST','GET'])
def register():
    if request.method == 'POST':
        data = request.get_json()

        #register validations
        if data['password'] != data['r_password']:
            flash('Password not matched', 'warning')
            return {'status': 400}

        elif mongoDb.machica_users.find_one({'email':data['email']}):
            flash('Email is already taken!', 'danger')
            return {'status': 400}
        
        else:
            if emailService.send_otp(data['email']):
                return {'status': 200}

        if 'otp' in data:
            if session.get('gen_otp') == data['otp']:
                if mongoDb.register(data['fullname'],data['email'],data['password']):
                    flash('Registration successful!', 'success')
                    # return redirect(url_for('views.landing'))
            else:
                flash('OTP is not correct', 'danger')
            
    return render_template('user_register.html')