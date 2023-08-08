from flask import Blueprint, request, session
from src.scripts.backend_func.db_init import mongoDb
from src.scripts.backend_func.payment import requestPayment
core = Blueprint('core', __name__)

@core.route('/dayInformation', methods=['GET', 'POST'])
def dayInformation():
    data = request.get_json()
    appointments = list(mongoDb.machica_bookings.find({'date': data['value']},{'_id': 0}))

    if appointments:
        return {'status': 200 , 'value': appointments}
    else:
        return {'status': 200, 'value': None}
    

@core.route('/processBooking',methods=['GET', 'POST'])
def processBooking():
    data = request.get_json()

    result = requestPayment.createCheckout(data)

    if result:
        session['value'] = data
        return {'status': 200 , 'value': result}
    else:
        return {'status': 401}



    