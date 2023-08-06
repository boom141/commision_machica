from flask import Blueprint, redirect, render_template, url_for, request, flash, session
from src.scripts.backend_func.db_init import mongoDb
from src.scripts.backend_func.smtp import emailService
from werkzeug.security import check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()

        session_user =  mongoDb.machica_users.find_one({'email': data['email']},{'_id':0})

        if session_user:
            if session_user['email'] == 'admin01@sampleEmail.com':
                return {'status': 200, 'url': 'https://machica-main.vercel.app/admin/login'}

            elif check_password_hash(session_user['password'], data['password']):
                return {'status': 200, 'data': {'fullname': session_user['fullname'], 'email': session_user['email']}}
            else:
                flash('Password Incorrrect!', 'danger')
                return {'status': 401}
        else:
             flash('Email Not Existing', 'danger')
             return {'status': 401}

    return render_template('user_login.html')


@auth.route('/form_validation', methods=['POST'])
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



@auth.route('/register', methods=['POST','GET'])
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