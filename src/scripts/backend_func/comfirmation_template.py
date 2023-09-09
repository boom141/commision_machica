
class Email_confirmation:
	@classmethod
	def generate_html(cls,data):
		 return f"""
                    <html>
					<head>
					<title></title>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
					<body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee; font-family: 'Poppins', sans-serif;" bgcolor="#eeeeee">
					<table border="0" cellpadding="0" cellspacing="0" width="100%" style="box-shadow:  rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
					<tr>
					<td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
					<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
					<tr>
					<td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#042C84">
					<div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
					<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
					<tr>
					<td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
					<h1 style="font-size: 1.2rem; font-weight: 800; margin: 0; color: #ffffff; font-family: 'Poppins', sans-serif;">Mahica Dental clinic</h1>
					</td>
					</tr>
					</table>
					</div>
					<div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
					<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
					<tr>
					<td align="right" valign="middle" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
					<table cellspacing="0" cellpadding="0" border="0" align="right">
					<tr>
					</tr>
					</table>
					</td>
					</tr>
					</table>
					</div>
					</td>
					</tr>
					<tr>
					<td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
					<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
					<tr>
					<td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img width="370" height="350" src="https://img.freepik.com/free-vector/appointment-booking-illustrated_23-2148579430.jpg?w=740&t=st=1691925542~exp=1691926142~hmac=fb1ee748479427a5e58fe41ffd8eef3b1245b5311f99a4a2486bc57538ead69b" style="display: block; border: 0px;" /><br>
					<h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #042C84; margin: 0;">Your Appointment is confirmed! </h2>
					</td>
					</tr>
					<tr>
					</tr>
					<tr>
					<td align="left" style="padding-top: 20px;">
					<table cellspacing="0" cellpadding="0" border="0" width="100%">
					<tr>
					<td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Reference Id</td>
					<td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">{data['reference_code']}</td>
                    </tr>
                    <tr>
                    <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Email</td>
                    <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">{data['email']}</td>
                    </tr>
					<tr>
					<td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">Service</td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">{data['item_name']}-{data['description']}</td>
					</tr>
					<tr>
					<td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Reservation Fee</td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">₱{data['amount']}</td>
					</tr>
					</table>
					</td>
					</tr>
					<tr>
					<td align="left" style="padding-top: 20px;">
					<table cellspacing="0" cellpadding="0" border="0" width="100%">
					<tr>
					<td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> TOTAL </td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">₱{data['amount']}</td>
					</tr>
					</table>
					</td>
					</tr>
					</table>
					</td>
					</tr>
					<tr>
					<td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
					<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
					</table>
					</td>
					</tr>
					<tr>
					</tr>
					<tr>
					<td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
					<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
					<tr>
					<td align="center"> <img src="https://i.pinimg.com/564x/75/8d/cc/758dccad44bd73e2a5f7106024b27fef.jpg" width="100" height="100" style="display: block; border: 0px;" /> </td>
					</tr>
					<tr>
					<td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
					<p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">48 A, Macabagdal, Grace Park East, Maynila,<br> 1403 Kalakhang Maynila </p>
					</td>
					</tr>
					<tr>
					<td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                    <a href="https://www.facebook.com/profile.php?id=100065627434891"><img width="30" height="30" src="https://img.icons8.com/ios/50/042C84/facebook-new.png" alt="facebook-new"/></a>
                    <a href=""><img width="30" height="30" src="https://img.icons8.com/ios/50/042C84/instagram-new--v1.png" alt="instagram-new--v1"/></a>
                    <a href=""><img width="30" height="30" src="https://img.icons8.com/ios/50/042C84/twitterx.png" alt="twitter--v1"/></a>
					</td>
					</tr>
					</table>
					</td>
					</tr>
					</table>
					</td>
					</tr>
					</table>
					</body>
					</html> 
                """