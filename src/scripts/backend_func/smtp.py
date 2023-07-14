import smtplib,random,string
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from config import Config
from flask import session

class emailService:

    @classmethod
    def send_otp(cls, receiver_address = None):
             #The mail addresses and password
        sender_address = 'otpmachica@gmail.com'
        sender_pass = Config.OTP_PASSKEY

        generated_otp = ''
        for i in range(4):
            generated_otp += str(random.randint(0,9))

        mail_content = f'Your One-Time Password (OTP) is {generated_otp}'

        try:
            #Setup the MIME
            message = MIMEMultipart()
            message['From'] = sender_address
            message['To'] = receiver_address
            message['Subject'] = 'Machica OTP'   #The subject line

            #The body and the attachments for the mail
            message.attach(MIMEText(mail_content, 'plain'))

            #Create SMTP session for sending the mail
            session_smtp = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
            session_smtp.starttls() #enable security
            session_smtp.login(sender_address, sender_pass) #login with mail_id and password
            text = message.as_string()
            session_smtp.sendmail(sender_address, receiver_address, text)
            session_smtp.quit()
            
            session['gen_otp'] = generated_otp

            return True
        
        except Exception as e:
            return e