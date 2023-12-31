import pymongo
from pymongo import MongoClient
from config import Config
from  werkzeug.security import generate_password_hash


class mongoDb:
    uri = Config.MONGODB_URI
    cluster = MongoClient(uri)
    db = cluster['machica_db']
    
    # database collections
    machica_users = db['machica_users']
    machica_bookings = db['machica_bookings']
    machica_admins = db['machica_admin']
    machica_feedbacks = db['machica_feedbacks']

    @classmethod
    def register(cls,data):
        new_user = {
            'fullname': data['fullname'],
            'birthday': data['birthday'],
            'age': data['age'],
            'address': data['address'],
            'gender': data['gender'],    
            'phone': data['phone'],
            'email': data['email'],
            'password': generate_password_hash(data['password'], method="sha256")
        }

        try:
            cls.machica_users.insert_one(new_user)
            return True
        except Exception as e: 
            return e
        
    @classmethod
    def updateUser(cls,data,user_email):
        filter_key = {'email':user_email}
        new_data = {'$set':{
            'fullname': data['fullname'],
            'birthday': data['birthday'],
            'age': data['age'],
            'address': data['address'],
            'gender': data['gender'],    
            'phone': data['phone'],
            'email': data['email'],
            'password': data['password']
        }}

        try:
            cls.machica_users.update_one(filter_key,new_data)
            return True
        except Exception as e: 
            return e
        
    @classmethod
    def AddBooking(cls,data):
  
        new_booking = {

            'fullname': data['fullname'],
            'email': data['email'],
            'phone': data['phone'],
            'date': data['date'],
            'time': data['time'],
            'item_name': data['item_name'],
            'description': data['description'],
            'amount': data['amount'],
            'message': data['message'],
            'reference_code': data['reference_code'],
            'reservation_fee' : 'paid',
            'isDone': False
        }

        try:
            cls.machica_bookings.insert_one(new_booking)
            return True
        except Exception as e: 
            return False
        
    @classmethod
    def UpdateBooking(cls, filter_data):
        filter_key = {'email':filter_data['email'], 'date': filter_data['date'], 'time':filter_data['time']}
        new_data = {'$set': {'isDone':True}}
        
        try:
            cls.machica_bookings.update_one(filter_key,new_data)
            return True
        except Exception as e: 
            return e
        
    
    @classmethod
    def SendFeedback(cls,data):

        new_feedback = {
            'email': data['email'],
            'type': data['type'],
            'message': data['message'],
            'rating': data['rating'],
        }

        try:
            cls.machica_feedbacks.insert_one(new_feedback)
            return True
        except Exception as e:
            return e