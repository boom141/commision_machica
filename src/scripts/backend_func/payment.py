import secrets, requests

class requestPayment:
    @classmethod
    def createCheckout(cls,data):

        url = "https://pg-sandbox.paymaya.com/checkout/v1/checkouts"

        payload = {
            "totalAmount": {
                "value": data['amount'],
                "currency": "PHP"
            },
            "buyer": {
                "contact": {
                    "phone": data['phone'],
                    "email": data['email']
                },
                "billingAddress": { "line1": 'myaddress1'},
                "firstName": data['fullname'].split(' ')[0],
                "lastName": data['fullname'].split(' ')[-1]
            },
            "redirectUrl": {
                "success": data['success_url'],
                "failure": data['failure_url'],
                "cancel": data['cancel_url']
            },
            "items": [
                {
                    "amount": { "value": data['amount'] },
                    "totalAmount": { "value": data['amount'] },
                    "name": data['item_name'],
                    "quantity": "1",
                    "code": "MCHCA-PRP",
                    "description": data['description']
                }
            ],
            "requestReferenceNumber": secrets.token_hex(8)
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": "Basic cGstWjBPU3pMdkljT0kyVUl2RGhkVEdWVmZSU1NlaUdTdG5jZXF3VUU3bjBBaDo="
        }


        try:
            response = requests.post(url, json=payload, headers=headers)
            return response.json()
        except Exception as e:
            return False