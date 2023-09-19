const profile_menu = document.querySelectorAll('.profile-btn');

switch(window.location.href){
  case window.origin + '/profile/personal_details':
    profile_menu[2].classList.add('profile-active');
    break;
  case window.origin + '/profile/appointment_list':
    profile_menu[0].classList.add('profile-active');
    break;
  case window.origin + '/profile/records':
    profile_menu[1].classList.add('profile-active');
    break;
}


let appointment_container = document.getElementById('appointment-list')
const initAppointmentList = (data_list) =>{
    appointment_container.innerHTML = ""
  
    for(let data of data_list){
      appointment_container.innerHTML += 
        `<tr>
          <td>${data.date} | ${data.time}</td>
          <td>${data.description}</td>
          <td>${(data.isDone) ? 'Done' : 'On Going'}</td>
          <td>${data.message}</td>
        </tr>
        `
      }
    
  }
  

try{
    let payload = 
    {
      method: "POST",
      headers:
      {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({value:{email: user.email}})
    };
    
    
    fetch(`${window.origin}/appointmentList`,payload)
    .then(data => data.json())
    .then(data => {
      if(data.value !== null){
          initAppointmentList(data.value);
        }
        
      })
      .catch(e => console.log(e))
      
    }catch(e){
    }
    
let validate_value = false;
let validate_length = true;
const registration_form = document.querySelectorAll(".user-information");
const edit_profile = document.querySelector('.edit-profile');
const update_profile = document.querySelector('.update-profile');
    
const sample_gender = document.getElementById('sample-gender')
sample_gender.onfocus = e => {
  e.target.classList.add('hide')
  registration_form[5].classList.remove('hide')
}



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

  
  if(validate_value){
    update_profile.disabled = false;
  }else{
    update_profile.disabled = true;
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


    if(validate_value){
      update_profile.disabled = false;
    }else{
      update_profile.disabled = true;
    }
  }
});


const populateUserInformation = (data_list) =>{
    for(data of data_list){
        registration_form[0].value = data.fullname;
        registration_form[1].value = data.birthday;
        registration_form[2].value = data.age;
        registration_form[3].value = data.address;
        registration_form[4].value = data.gender;
        registration_form[7].value = data.phone;
        registration_form[8].value = data.email;
        registration_form[9].value = data.password;
        registration_form[10].value = data.password;
    }

}


try{
    if(user === null){
        window.location = window.origin;
    } 

    let payload = 
    {
      method: "POST",
      headers:
      {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({email: user.email})
    };
  
  
    fetch(`${window.origin}/userList`,payload)
    .then(data => data.json())
    .then(data => {
      if(data.status !== 401){
          populateUserInformation(data.value)
      }
        
    }).catch(e => console.log(e))

  }catch(e){
  }


  


  try{
      edit_profile.onclick = (e) =>{
          edit_profile.classList.add('hide-btn');
          update_profile.classList.remove('hide-btn');
          registration_form.forEach(elem =>{
              elem.disabled = false;
          })
    }

  }catch(e){
  }
  


  document.getElementById('gender-selection').onchange = e =>{
    if(e.target.value == 'custom'){
      e.target.classList.add('hide');
      e.target.value = "";
      document.getElementById('custom-gender').classList.remove('hide');
    }
  
  }
  

