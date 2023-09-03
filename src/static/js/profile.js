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
      }else{
          alert('Fetching user data failed')
      }
        
    })
    .catch(e => console.log(e))

}catch(e){
  console.log(e);
}

const registration_form = document.querySelectorAll(".user-information");

const populateUserInformation = (data_list) =>{
    for(data of data_list){
        registration_form[0].value = data.fullname;
        registration_form[1].value = data.birthday;
        registration_form[2].value = data.age;
        registration_form[3].value = data.address;
        registration_form[4].value = data.gender;
        registration_form[5].value = data.phone;
        registration_form[6].value = data.email;
        registration_form[7].value = data.password;
        registration_form[8].value = data.password;
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
      }else{
          alert('Fetching user data failed')
      }
        
    }).catch(e => console.log(e))

  }catch(e){
    console.log(e);
  }

  try{
    document.getElementById('birthday').onchange = (e) =>{
      let date = new Date()
      let birth_year = e.target.value.split('-')[0]
    
      registration_form[2].value = `${date.getFullYear() - Number(birth_year)} yrs old`
    }
  }catch(e){
    console.log(e);
  }
  

  const edit_profile = document.querySelector('.edit-profile');
  const update_profile = document.querySelector('.update-profile');

  try{
      edit_profile.onclick = (e) =>{
          edit_profile.classList.add('hide-btn');
          update_profile.classList.remove('hide-btn');
          registration_form.forEach(elem =>{
              elem.disabled = false;
              
              
          })
    }

  }catch(e){
    console.log(e);
  }
  



