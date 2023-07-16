from flask import Blueprint, redirect, render_template, url_for, request, flash, session
from src.scripts.backend_func.db_init import mongoDb
from src.scripts.backend_func.payment import requestPayment


views = Blueprint('views', __name__)

@views.route('/', methods=['POST','GET'])
def landing():
    return render_template('landing.html')


@views.route('/about')
def about():
    return render_template('about.html')

@views.route('/services', methods=['POST','GET'])
def services():
    if request.method == 'POST':
        data = request.get_json()

        result = requestPayment.createCheckout(data)
        if result:
            if mongoDb.AddBooking(data['fullname'],data['phone'],data['email'],
                                  data['date'],data['time'],data['POA'],data['PRP'],data['message']):
               
               return {'status': 200 , 'data': result}
            else:
                return {'status': 401}
        else:
            return {'status': 401}
        
    
    return render_template('services.html')

