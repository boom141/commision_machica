
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
const loading_register = document.getElementById("register-spinner");
const registration_form = document.getElementsByClassName("user-information");

loading_register.style.display = "none";

generate_otp.onclick = () =>{
    user_information.fullname = registration_form[0].value;
    user_information.email = registration_form[1].value;
    user_information.password = registration_form[2].value;
    user_information.r_password = registration_form[3].value;
    
    loading_register.style.display = "inline";
    generate_otp.innerText = 'Generating OTP';
    

    const payload = 
    {
      method: "POST",
      headers:
      {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user_information)
    }

  fetch(window.location.href, payload)
      .then(res => res.json())
      .then(json => 
          alert(JSON.stringify(json))
      )


    // $('#otpModal').modal('show');
}
