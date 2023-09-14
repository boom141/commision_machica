const inputs = document.getElementsByClassName('inputs');
const timesets = document.querySelectorAll('.time-booking');

window.onload = () =>{
  if (user != null){
    inputs[0].value = user.fullname;
    inputs[1].value = user.phone;
    inputs[2].value  = user.email;
    document.getElementById('guest-mode').style.display = 'none';
    document.getElementById('online-mode').style.display = 'block';
    document.getElementById('profile-btn').innerText = user.fullname.split(' ')[0];

    let occurence = Math.random();
    let occurence_rate = 0.5

    if(occurence < occurence_rate){
      $('#feedModal').modal('show');
    }
  }
}


document.onkeydown = e =>{
  if(e.keyCode === 119){
    $('#feedModal').modal('show');
  }
};

let feed_point = 0
const feed_stars = document.querySelectorAll('.feed-star');
feed_stars.forEach((star,index) =>{
  star.onclick = () =>{
    feed_stars.forEach(star => star.classList.remove('star-point'));
    for(let i = 0; i < index + 1; i++){
      feed_point = index + 1
      feed_stars[i].classList.add('star-point')
    }
  }
});

document.getElementById('send-feed').onclick = e => {
  let feedback_type = document.getElementById('feedback-type')
  let feedback_message = document.getElementById('feedback-message')


  e.target.innerText = 'Sending...';

  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({value:{email: user.email, type: feedback_type.value, message: feedback_message.value, rating: feed_point}})
  };
  

    fetch(`${window.origin}/feedback`, payload)
    .then(data => data.json())
    .then(data => {
      if(data.value){
        alert('Feedback sent successfully!')
        window.location.reload()
      }else{
        alert('Something went wrong')
      }
    }).catch(err => console.log(err));


}


const appointment_btns = document.querySelectorAll('.appointment-btn');
const service_calendar = document.querySelector('.service-calendar');
const service_box = document.querySelector('.service-box'); 
const cancel_form = document.getElementById('cancel-form');
const services = document.querySelectorAll('.services');
const booking_warning = document.getElementById('booking-warning');
const terms_btn = document.getElementById('terms-btn');
const condition_btn = document.getElementById('condition-btn');

condition_btn.disabled = true;

terms_btn.onclick = e =>{
  if(e.target.checked){
    condition_btn.disabled = false;
  }else{
    condition_btn.disabled = true;
  }
}




const EndpointRequest = async (url,payload) =>{
  let response = await fetch(url, payload)
  return response.json();
};

const requestAppointmentData = async (date) =>{
    let payload = 
    {
      method: "POST",
      headers:
      {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({value: date})
    };
    

      return fetch(`${window.origin}/dayInformation`, payload)
      .then(data => data.json())
      .then(data => {
        return data.value;
      }).catch(err => console.log(err));

}

const setAvailableTimeSlots = (date) =>{
  requestAppointmentData(date)
  .then(data_list =>{
    let reserved_time_slot = []

    if(data_list !== null){
      for(data of data_list){
        reserved_time_slot.push(data.time)
      }
    }

    timesets.forEach((element,index) =>{
      element.disabled = false;
      let time = index + 1
      element.innerText = `${time}:00pm-${time+1}:00pm`
      element.classList.remove('text-muted');
      if (reserved_time_slot.length !== 0){
          if(reserved_time_slot.indexOf(element.value) !== -1){
            element.innerText = element.innerText + '- Unavailable';
            element.classList.add('text-muted');
            element.disabled = true;
        }
      }
    })
  })


};

const checkFullSlot = async (date) =>{

   return requestAppointmentData(date)
   .then(data_list =>{
      if (data_list !== null){
        if(data_list.length === 5){
          return true;
      }else{
        return false;
      }
    }
  });
}

const isPastDay = (date) =>{
  let selected_date = new Date(date);
  let current_date = new Date();

  if( selected_date.getFullYear() === current_date.getFullYear() &&
      selected_date.getMonth() === current_date.getMonth() &&
      selected_date.getDate() < current_date.getDate()) {
        return true;
    }else{
      return false;
    }

}


const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const month_picker = document.querySelector('#month-picker');
const calendar_year = document.querySelector('#year');
const calendar_days = document.querySelector('.calendar-days');

const generateCalendar = (month, year) => {
  calendar_days.innerHTML = '';
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  
  
month_picker.value = month_names[month]; //cuurent month
calendar_year.innerHTML = year; //current year

let first_day = new Date(year, month);


calendar_days.innerHTML = "";
for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    if (i >= first_day.getDay()) {
      let numerical_day = i - first_day.getDay() + 1;
      let date = new Date(`${year}-${month+1}-${numerical_day}`)
      
      if (date.getDay() === 0) {
        if(!isPastDay(`${year}-${month+1}-${numerical_day}`)){
          checkFullSlot(`${year}-${month+1}-${numerical_day}`)
          .then(data =>{
              calendar_days.innerHTML += 
                `<div role="button" class="${data ?
                  "pe-none" : "pe-auto"} day d-flex flex-row rounded-3 border">
                    <div class="pe-none rounded-start py-0 ${data ?
                    "full-slot" : "selected-day"} day-date text-center d-flex flex-column w-25 ">
                        <span class="fw-bold">${numerical_day}</span>
                        <span class="fs-3 fw-bold">SUNDAY</span>
                    </div>
                    <div class="pe-none day-info d-flex flex-column px-3">
                        <span class="fw-bold th-color-6">${inputs[5].value.split('-')[1]}</span>
                        <span class="fs-4 fw-normal th-color-6">${inputs[5].value.split('-')[0]}</span>
                    </div>
                </div>`
                
                  const appointment_days =  document.querySelectorAll('.day');
                  const selectedDay = (index_day) =>{
                    appointment_days.forEach((elem,index) =>{
                      if(index_day === index){
                        elem.classList.add('b-shadow');
                      }else{
                        elem.classList.remove('b-shadow');
                      }
                    });
                  
                  }
                  
                  appointment_days.forEach((elem,index) =>{
                    elem.onclick = (e) =>{
                      element_day = e.target.children[0].children[0].innerText
                      selectedDay(index);
                        inputs[3].value = `${year}-${month+1}-${element_day}`;
                        inputs[4].value = ''
                        setAvailableTimeSlots(inputs[3].value)
                    };
                  });
  
              })  
            }
          }
        }
        
      }

};


const currentDate = new Date();
const currentMonth = { value: currentDate.getMonth() };
const currentYear = { value: currentDate.getFullYear() };

month_picker.onchange = (e) =>{
  generateCalendar(month_names.indexOf(e.target.value), currentYear.value, currentDate.getDate());
}

document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};


appointment_btns.forEach(btn =>{
  btn.onclick = (e) =>{
    inputs[5].value = services[Number(e.target.id)].innerText
    service_box.classList.add('hide-container');
    service_calendar.classList.add('fade-bottom');
    service_calendar.classList.remove('hide-container');
    booking_warning.classList.add('fade-bottom');
    booking_warning.classList.remove('hide-container');

    generateCalendar(currentMonth.value, currentYear.value);
    $('#exampleModal').modal('show');
  }
});


cancel_form.onclick = () =>{
service_calendar.classList.add('hide-container');
booking_warning.classList.add('hide-container');
service_box.classList.add('fade-bottom');
service_box.classList.remove('hide-container');
}




const create_checkout = document.getElementById('create-checkout')

create_checkout.onclick = () =>{
  create_checkout.innerText = 'Creating Checkout....';

  if(user === null){
    window.location = window.origin + "/login"
  }

  let booking_inputs = {
    fullname: inputs[0].value,
    phone: inputs[1].value,
    email: inputs[2].value,
    date: inputs[3].value,
    time: inputs[4].value,
    item_name: inputs[5].value.split('-')[0],
    description: inputs[5].value.split('-')[1],
    amount: inputs[6].value.split(':')[1],
    message: inputs[7].value,
    success_url: `${window.origin}/confirm`,
    failure_url: `${window.origin}/services`,
    cancel_url:`${window.origin}/services`,
  }


  if(booking_inputs.time !== "" && booking_inputs.date !== ""){
      let payload = 
      {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booking_inputs)
      };
    
    
      fetch(`${window.origin}/processBooking`,payload)
      .then(data => data.json())
      .then(data => {
          console.log(data);
          if (data.status != 401){
              create_checkout.innerText = 'Checkout';
              alert('Redirecting To Checkout');
              window.location = data.value.redirectUrl
          }else{
            create_checkout.innerText = 'Checkout';
            alert('Something went wrong');
            // window.location.reload();
          }
        }
      )
      .catch(error => console.log(error));
  }else{
    alert('Desired Date and Time Should Be filled.');
    create_checkout.innerText = 'Checkout';
  }


}
