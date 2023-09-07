from flask import Blueprint, redirect, render_template, url_for, request, flash, session
from src.scripts.backend_func.db_init import mongoDb
from src.scripts.backend_func.payment import requestPayment
from src.scripts.backend_func.smtp import emailService
import secrets

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


@views.route('/contact', methods=['POST','GET'])
def contact():
    return render_template('contactus.html')

@views.route('/profile/personal_details', methods=['POST','GET'])
def personal():
    if request.method == 'POST':
        print(request.form)
        new_data = {
            'fullname': request.form['fullname'],
            'birthday': request.form['birthday'],
            'age': request.form['age'],
            'address': request.form['address'],
            'gender': request.form['gender'],    
            'phone': request.form['phone'],
            'email': request.form['email'],
            'password': request.form['password'],
        }

        

        if request.form['password'] != request.form['r-password']:
            flash('Password not matched', 'warning')
        else:
            if mongoDb.updateUser(new_data,new_data['email']):
                return redirect(url_for('.personal'))
            

    return render_template('personal_details.html')

@views.route('/profile/appointment_list', methods=['POST','GET'])
def personalAppointment():
    return render_template('user_appointment.html')

@views.route('/profile/records', methods=['POST','GET'])
def personalRecords():
    return render_template('records.html')

@views.route('/confirm')
def confirm():
    if 'value' in session:
        session['value']['reference_code'] = secrets.token_hex(8)
        emailService.send_confirmation(session['value'])

        if mongoDb.AddBooking(session['value']):
            return render_template('confirm.html', email=session['value']['email']) 
        else:
            return redirect(url_for('.services'))
    

@views.route('/admin/dashboard')
def dashboard():
    return render_template('dashboard.html')

@views.route('/admin/appointments')
def appointments():
    return render_template('appointment.html')

@views.route('/admin/records')
def adminRecords():
    return render_template('admin-records.html')