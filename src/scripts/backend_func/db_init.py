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

    @classmethod
    def register(cls,fullname,email,password):
        new_user = {
            
            'fullname':fullname,
            'email': email,
            'password': generate_password_hash(password, method="sha256")
        }

        try:
            cls.machica_users.insert_one(new_user)
            return True
        except Exception as e: 
            return e

