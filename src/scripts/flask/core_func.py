from flask import Blueprint, request, session
from src.scripts.backend_func.db_init import mongoDb
from src.scripts.backend_func.payment import requestPayment
from datetime import datetime
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


@core.route('/processAnalytics',methods=['GET', 'POST'])
def processAnalytics():

    data = list(mongoDb.machica_bookings.find({},{'_id': 0}))
    service_month_analytics = [0,0,0,0,0,0]
    service_overall_analytics = [0,0,0,0,0,0]

    for obj in data:
        if int(obj['date'].split('-')[1]) == datetime.now().month:
            if obj['item_name'] == 'Service 1 ':
                service_month_analytics[0] += 1
            elif obj['item_name'] == 'Service 2 ':
                service_month_analytics[1] += 1
            elif obj['item_name'] == 'Service 3 ':
                service_month_analytics[2] += 1
            elif obj['item_name'] == 'Service 4 ':
                service_month_analytics[3] += 1
            elif obj['item_name'] == 'Service 5 ':
                service_month_analytics[4] += 1
            elif obj['item_name'] == 'Service 6 ':
                service_month_analytics[5] += 1
    
    for obj in data:
            if obj['item_name'] == 'Service 1 ':
                service_overall_analytics[0] += 1
            elif obj['item_name'] == 'Service 2 ':
                service_overall_analytics[1] += 1
            elif obj['item_name'] == 'Service 3 ':
                service_overall_analytics[2] += 1
            elif obj['item_name'] == 'Service 4 ':
                service_overall_analytics[3] += 1
            elif obj['item_name'] == 'Service 5 ':
                service_overall_analytics[4] += 1
            elif obj['item_name'] == 'Service 6 ':
                service_overall_analytics[5] += 1
        

    if service_month_analytics:
        return {'status': 200 , 'month': service_month_analytics, 'overall': service_overall_analytics , 'value': data}
    else:
        return {'status': 401}
    
@core.route('/deleteBooking',methods=['GET', 'POST'])
def deleteBooking():
    data = request.get_json()
    result = mongoDb.machica_bookings.delete_one({'reference_code': data['ref_code']})
    if result:
        return {'status': 200}
    else:
        return {'status': 401}