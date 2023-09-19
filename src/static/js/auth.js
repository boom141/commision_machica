const user_information = {};
const otp = document.getElementById("otp");
const resend_otp = document.getElementById("resend-otp");
const verify_otp = document.getElementById("verify-otp");
const generate_otp = document.getElementById("generate-otp");
const login_btn = document.getElementById("login-btn");
const login_form = document.getElementsByClassName("user-input");
const registration_form = document.querySelectorAll(".user-information");

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
              sessionStorage.setItem('user',JSON.stringify(data.value))
              window.location = window.origin + data.url;
            }else{
              sessionStorage.setItem('user',JSON.stringify(data.value))
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


document.getElementById('gender-selection').onchange = e =>{
  if(e.target.value == 'custom'){
    e.target.classList.add('hide');
    e.target.value = "";
    document.getElementById('custom-gender').classList.remove('hide');
  }

}

let validate_length = true;
let validate_value = false;

document.getElementById('birthday').onchange = (e) =>{
  let date = new Date()
  let birth_year = e.target.value.split('-')[0]

  let set_icon = document.getElementById(`age-icon`);
  let set_text = document.getElementById(`age-text`);

  registration_form[2].value = `${date.getFullYear() - Number(birth_year)} yrs old`
  if (Number(registration_form[2].value.split(' ')[0]) < 5){
    registration_form[2].classList.add('input-error')
    set_icon.classList.remove('hide-error');
    set_text.classList.remove('hide');
    validate_value = false;
  }else{  
    registration_form[2].classList.remove('input-error')
    set_icon.classList.add('hide-error');
    set_text.classList.add('hide');
    validate_value = true;
  }
}

const validate_inputs = input =>{
    let set_icon = document.getElementById(`${input.id}-icon`);
    let set_text = document.getElementById(`${input.id}-text`);

    if(input.id === 'fullname'){      
        if(input.value.length !== 0 && input.value.length < 8){
          input.classList.add('input-error')
          set_icon.classList.remove('hide-error');
          set_text.classList.remove('hide');
          validate_value = false;
        }else{  
          input.classList.remove('input-error')
          set_icon.classList.add('hide-error');
          set_text.classList.add('hide');
          validate_value = true;
        }
    }else if(input.id === 'phone'){
      if(input.value.length > 11){
        input.classList.add('input-error')
        set_icon.classList.remove('hide-error');
        set_text.classList.remove('hide');
        validate_value = false;
      }else{  
        input.classList.remove('input-error')
        set_icon.classList.add('hide-error');
        set_text.classList.add('hide');
        validate_value = true;
      }
    }else if(input.id === 'password'){
      if(input.value.length < 8 && input.value.length !== 0 ){
        input.classList.add('input-error')
        set_icon.classList.remove('hide-error');
        set_text.classList.remove('hide');
        validate_value = false;
      }else{  
        input.classList.remove('input-error')
        set_icon.classList.add('hide-error');
        set_text.classList.add('hide');
        validate_value = true;
      }
    }else if(input.id === 'email'){
      if(!input.value.includes('@') && input.value.length !== 0 ){
        input.classList.add('input-error')
        set_icon.classList.remove('hide-error');
        set_text.classList.remove('hide');
        validate_value = false;
      }else{  
        input.classList.remove('input-error')
        set_icon.classList.add('hide-error');
        set_text.classList.add('hide');
        validate_value = true;
      }
    }else if(input.id === 'r-password'){
      if(registration_form[8].value !== input.value && input.value.length !== 0 ){
        input.classList.add('input-error')
        set_icon.classList.remove('hide-error');
        set_text.classList.remove('hide');
        validate_value = false;
      }else{  
        input.classList.remove('input-error')
        set_icon.classList.add('hide-error');
        set_text.classList.add('hide');
        validate_value = true;
      }
    }
}

registration_form.forEach(input => {
    input.onkeyup = e =>{
      validate_inputs(e.target)
    }
});


generate_otp.onclick = () =>{

    user_information.fullname = registration_form[0].value;
    user_information.birthday = registration_form[1].value;
    user_information.age = registration_form[2].value.split(' ')[0];
    user_information.address = registration_form[3].value;
    user_information.gender = (registration_form[4].value === "") ? registration_form[5].value : registration_form[4].value;
    user_information.phone = registration_form[6].value;
    user_information.email = registration_form[7].value;
    user_information.password = registration_form[8].value;
    user_information.r_password = registration_form[9].value;
    
    for(let key in user_information){
      if(user_information[key] === ""){
        validate_length = false
        break
      }
    }

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

    if(validate_value && validate_length){
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
    }else{
      alert("Input Fields Error, please checked your input")
      generate_otp.innerText = 'Register';
    }
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

