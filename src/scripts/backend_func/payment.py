import secrets

class requestPayment:
    @classmethod
    def createCheckout(cls,data):
        import requests

        url = "https://pg-sandbox.paymaya.com/checkout/v1/checkouts"

        payload = {
            "totalAmount": {
                "value": 1500,
                "currency": "PHP"
            },
            "items": [
                {
                    "amount": { "value": 1500 },
                    "totalAmount": { "value": 1500 },
                    "name": data['POA'],
                    "description": data['PRP']
                }
            ],
            "redirectUrl": {
                "success": "http://127.0.0.1:5000/services",
                "failure": "http://127.0.0.1:5000/services",
                "cancel": "http://127.0.0.1:5000/services"
            },
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
            return e