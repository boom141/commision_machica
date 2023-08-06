const user_information = {};
const otp = document.getElementById("otp");
const resend_otp = document.getElementById("resend-otp");
const verify_otp = document.getElementById("verify-otp");
const generate_otp = document.getElementById("generate-otp");
const login_btn = document.getElementById("login-btn");
const login_form = document.getElementsByClassName("user-input");
const registration_form = document.getElementsByClassName("user-information");


const EndpointRequest = async (url,payload) =>{
    let response = await fetch(url, payload)

    return response.json();
};


try{
    login_btn.onclick = () =>{
      login_btn.innerText = 'Logging In...'

      let user_inputs =
      {
          email: login_form[0].value,
          password: login_form[1].value
      }

      let payload = 
      {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user_inputs)
      };

      EndpointRequest(window.location.href, payload)
      .then(data => {
          if (data.status != 401){
            if (data.url){
              window.location = data.url;
            }else{
              sessionStorage.setItem('user',JSON.stringify(data))
              login_btn.innerText = 'Login Complete!'
              window.location = window.origin
            }
          }else{
            window.location.reload()
          };
        }
      )
  }
}catch(e){
  console.log(e)
}





generate_otp.onclick = () =>{
    user_information.fullname = registration_form[0].value;
    user_information.email = registration_form[1].value;
    user_information.password = registration_form[2].value;
    user_information.r_password = registration_form[3].value;
    

    generate_otp.innerText = 'Generating OTP...';
    
  
    let payload = 
    {
      method: "POST",
      headers:
      {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user_information)
    };

    EndpointRequest(`${window.origin}/form_validation`,payload)
      .then(data => {
          if (data.status != 401){
            document.getElementById('target-email').innerText = user_information.email;
            generate_otp.innerText = 'Register';
            $('#otpModal').modal('show');
          }else{
            window.location.reload()
          };
        }
    )
};


resend_otp.onclick = () =>{
  resend_otp.innerText = 'Sending new OTP...'

  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user_information)
  };

  EndpointRequest(`${window.origin}/form_validation`,payload)
  .then(data => {
      if (data.status != 401){
        document.getElementById('target-email').innerText = user_information.email;
        resend_otp.innerText = 'Resend';
      };
    }
  )
};


verify_otp.onclick = () =>{
  verify_otp.innerText = 'Verifying OTP...';

  user_information.otp = otp.value;
  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user_information)
  };


EndpointRequest(window.location.href,payload)
  .then(data => {
      if (data.status != 401){
          alert('Account Registered Successfully');
          window.location = window.origin
      }else{
        window.location.reload()
      };
    }
  )
};

