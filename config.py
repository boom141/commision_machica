from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

class Config:
    TESTING = os.getenv('TESTING')
    FLASK_DEBUG = os.getenv('FLASK_DEBUG')
    SECRET_KEY = os.getenv('SECRET_KEY')
    SERVER = os.getenv('SERVER')
    OTP_PASSKEY = os.getenv('OTP_PASSKEY')
    INQUIRY_PASSKEY = os.getenv('INQUIRY_PASSKEY')
    MACHICA_ADMIN = os.getenv('MACHICA_ADMIN')
    MONGODB_URI = os.getenv('MONGODB_URI')

