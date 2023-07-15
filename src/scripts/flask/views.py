from flask import Blueprint, redirect, render_template, url_for, request, flash, session
from src.scripts.backend_func.db_init import mongoDb
from src.scripts.backend_func.smtp import emailService
from werkzeug.security import check_password_hash

views = Blueprint('views', __name__)

@views.route('/', methods=['POST','GET'])
def landing():
    if request.method == 'POST':

        email = request.form.get('email')
        password = request.form.get('password')

        session_user =  mongoDb.machica_users.find_one({'email': email},{'_id':0})

        if session_user:
            if check_password_hash(session_user['password'], password):
                return render_template('landing.html', user_in_session={'fullname':session_user['fullname'], 'email':session_user['email']})
            else:
                flash('Password Incorrrect!', 'danger')
        else:
             flash('Email Not Existing', 'danger')
    
    return render_template('landing.html', user_in_session=None)


@views.route('/services')
def services():
    return render_template('services.html')

@views.route('/login')
def login():
    return render_template('user_login.html')


@views.route('/form_validation', methods=['POST'])
def form_validation():
    if request.method == 'POST':
        data = request.get_json()

        #register validations
        if 'otp' not in data:
            if data['password'] != data['r_password']:
                flash('Password not matched', 'warning')
                return {'status': 401}

            elif mongoDb.machica_users.find_one({'email':data['email']}):
                flash('Email is already taken!', 'danger')
                return {'status': 401}
            
            elif emailService.send_otp(data['email']):
                return {'status': 200}



@views.route('/register', methods=['POST','GET'])
def register():
    if request.method == 'POST':
        data = request.get_json()

        if session.get('gen_otp') == data['otp']:
            if mongoDb.register(data['fullname'],data['email'],data['password']):
                return {'status': 200}
            else:
                flash('Account not registered', 'danger')
                return {'status': 401}
            
         
    return render_template('user_register.html')