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
    service_monthly_analytics = [0,0,0,0,0,0,0,0,0,0,0,0]
    service_analytics = [0,0,0,0,0,0]

    for obj in data:
        if int(obj['date'].split('-')[1]) == 1:
            service_monthly_analytics[0] += 1
        elif int(obj['date'].split('-')[1]) == 2:
            service_monthly_analytics[1] += 1
        elif int(obj['date'].split('-')[1]) == 3:
            service_monthly_analytics[2] += 1
        elif int(obj['date'].split('-')[1]) == 4:
            service_monthly_analytics[3] += 1
        elif int(obj['date'].split('-')[1]) == 5:
            service_monthly_analytics[4] += 1
        elif int(obj['date'].split('-')[1]) == 6:
            service_monthly_analytics[5] += 1
        elif int(obj['date'].split('-')[1]) == 7:
            service_monthly_analytics[6] += 1
        elif int(obj['date'].split('-')[1]) == 8:
            service_monthly_analytics[7] += 1
        elif int(obj['date'].split('-')[1]) == 9:
            service_monthly_analytics[8] += 1
        elif int(obj['date'].split('-')[1]) == 10:
            service_monthly_analytics[9] += 1
        elif int(obj['date'].split('-')[1]) == 11:
            service_monthly_analytics[10] += 1
        elif int(obj['date'].split('-')[1]) == 12:
            service_monthly_analytics[11] += 1
            
    
    for obj in data:
            if obj['item_name'] == 'Service 1 ':
                service_analytics[0] += 1
            elif obj['item_name'] == 'Service 2 ':
                service_analytics[1] += 1
            elif obj['item_name'] == 'Service 3 ':
                service_analytics[2] += 1
            elif obj['item_name'] == 'Service 4 ':
                service_analytics[3] += 1
            elif obj['item_name'] == 'Service 5 ':
                service_analytics[4] += 1
            elif obj['item_name'] == 'Service 6 ':
                service_analytics[5] += 1
        
    unit_revenue = [ (value*1000) for value in service_analytics ]
    monthly_revenue = [ (value*1000) for value in service_monthly_analytics ]

    print(monthly_revenue)

    if service_analytics:
        return {'status': 200 , 'month': monthly_revenue, 'units_sold': unit_revenue , 'value': data}
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
    

@core.route('/userList',methods=['GET', 'POST'])
def usreList():
    data = request.get_json()

    user_data = list(mongoDb.machica_users.find({'email':data['email']} if data['email'] else {},{'_id': 0}))
    booking_data = list(mongoDb.machica_bookings.find({'email':data['email']} if data['email'] else {},{'_id': 0}))

    new_user_list = []

    for user in user_data:
        history_Data = []
        for booking in booking_data:
            if user['email'] == booking['email']:
                history_Data.append({'service': booking['item_name'], 'date': booking['date'], 'time': booking['time']})

        user['history_data'] = history_Data
        new_user_list.append(user)    

    if new_user_list:
        return {'status': 200, 'value': new_user_list}
    else:
        return {'status': 401}