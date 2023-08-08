import smtplib,random,string
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from config import Config
from flask import session
from src.scripts.backend_func.comfirmation_template import Email_confirmation

class emailService:

    @classmethod
    def send_mail(cls,sender_pass,sender_address,receiver_address,subject,mail_content,content_type):
        try:
            #Setup the MIME
            message = MIMEMultipart()
            message['From'] = sender_address
            message['To'] = receiver_address
            message['Subject'] = subject   #The subject line

            #The body and the attachments for the mail
            message.attach(MIMEText(mail_content, content_type))

            #Create SMTP session for sending the mail
            session_smtp = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
            session_smtp.starttls() #enable security
            session_smtp.login(sender_address, sender_pass) #login with mail_id and password
            text = message.as_string()
            session_smtp.sendmail(sender_address, receiver_address, text)
            session_smtp.quit()
    

            return True
        
        except Exception as e:
            return e



    @classmethod
    def send_otp(cls, receiver_address = None):
             #The mail addresses and password
        sender_address = 'otpmachica@gmail.com'
        sender_pass = Config.OTP_PASSKEY

        generated_otp = ''
        for i in range(4):
            generated_otp += str(random.randint(0,9))

        mail_content = f'Your One-Time Password (OTP) is {generated_otp}'
        
        result =  cls.send_mail(sender_pass,sender_address,receiver_address,'Machica OTP',mail_content,'plain')
        
        if result:
            session['gen_otp'] = generated_otp
            return True
        else:
            return result
      

    @classmethod
    def send_confirmation(cls, user_data):
        sender_address = 'otpmachica@gmail.com'
        sender_pass = Config.OTP_PASSKEY

        mail_content = Email_confirmation.generate_html(user_data)

        result =  cls.send_mail(sender_pass,sender_address,user_data['email'],'Machica | Appoinment Successful',mail_content,'html')
        
        if result:
            return True
        else:
            return result