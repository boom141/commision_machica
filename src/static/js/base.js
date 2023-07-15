


window.onload = () =>{
  user_data = JSON.parse(sessionStorage.getItem('user_data'))
  
  if (user_data != null){
    document.getElementById('guest-mode').style.display = 'none'
    document.getElementById('online-mode').style.display = 'block'
    document.getElementById('logout-btn').innerText = user_data.fullname.split(' ')[0]
  }

}



const navbar = document.querySelector('nav')

window.onscroll = function() {
    if (window.pageYOffset > 0) {
      navbar.classList.add("moving")
    } else {
      navbar.classList.remove("moving");
    }
}


let chatbot_switch = false
$("#chatbot-panel").hide()
$("#close-icon").hide()
$("#chatbot-btn").click(()=>{
    if (!chatbot_switch){
        $("#message-icon").hide("fast")
        $("#close-icon").show("fast")
        $("#chatbot-panel").show("fast")
        chatbot_switch = !chatbot_switch
    } else{
        $("#chatbot-panel").hide("fast")
        $("#close-icon").hide("fast")
        $("#message-icon").show("fast")
        chatbot_switch = !chatbot_switch
    }
})


const user_information = {};
const generate_otp = document.getElementById("generate-otp");
const resend_otp = document.getElementById("resend-otp");
const verify_otp = document.getElementById("verify-otp");
const otp = document.getElementById("otp");
const loading_register = document.getElementById("register-spinner");
const registration_form = document.getElementsByClassName("user-information");

const EndpointRequest = async (url,payload) =>{
    let response = await fetch(url, payload)

    return response.json();
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
}


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
      }
    }
  )
}


verify_otp.onclick = () =>{
  verify_otp.innerText = 'Verifying OTP...';

  user_information.otp = otp.value
  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user_information)
  }

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
}

document.getElementById('logout').onclick = () =>{
  console.log('bingbong')
  sessionStorage.clear();
  window.location = window.location.href;
  
}