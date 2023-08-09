const inputs = document.getElementsByClassName('inputs');
const timesets = document.querySelectorAll('.time-booking');

window.onload = () =>{
  if (user != null){
      inputs[0].value = user.data.fullname;
      inputs[1].value = user.data.phone;
      inputs[2].value  = user.data.email;
      document.getElementById('guest-mode').style.display = 'none';
      document.getElementById('online-mode').style.display = 'block';
      document.getElementById('profile-btn').innerText = user.data.fullname.split(' ')[0];
  }
}


const appointment_btns = document.querySelectorAll('.appointment-btn');
const service_calendar = document.querySelector('.service-calendar');
const service_box = document.querySelector('.service-box'); 
const cancel_form = document.getElementById('cancel-form');
const services = document.querySelectorAll('.services');

appointment_btns.forEach(btn =>{
    btn.onclick = (e) =>{
      inputs[5].value = services[Number(e.target.id)].innerText
      service_box.classList.add('hide-container');
      service_calendar.classList.add('fade-bottom');
      service_calendar.classList.remove('hide-container');
    }
});


cancel_form.onclick = () =>{
  service_calendar.classList.add('hide-container');
  service_box.classList.add('fade-bottom');
  service_box.classList.remove('hide-container');
}



const EndpointRequest = async (url,payload) =>{
  let response = await fetch(url, payload)

  return response.json();
};

const setAvailableTimeSlots = (data_list) =>{
  let reserved_time_slot = []

  if(data_list !== null){
    for(data of data_list){
      reserved_time_slot.push(data.time)
    }
  }

  timesets.forEach(element =>{
    element.disabled = false;
    if (reserved_time_slot.length !== 0){
        if(reserved_time_slot.indexOf(element.value) !== -1){
          element.disabled = true;
      }
    }
  })
};

const checkFullSlot = (data_list,element) =>{
  if (data_list !== null){
      if(data_list.length === 5){
      element.classList.add('full-slot');
    }
  }

}

const requestAppointmentData = (date, element=null) =>{
    let payload = 
    {
      method: "POST",
      headers:
      {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({value: date})
    };

    
    EndpointRequest(`${window.origin}/dayInformation`, payload)
      .then(data => {
          if (element == null){
            setAvailableTimeSlots(data.value)
          }else{
            checkFullSlot(data.value,element);
          }
          
      })
      .catch(e => console.log(e))
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

const generateCalendar = (month, year, day=null) => {
  inputs[3].value = `${year}-${month+1}-${day}`
  let month_picker = document.querySelector('#month-picker');
  let calendar_year = document.querySelector('#year');
  let calendar_days = document.querySelector('.calendar-days');
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
  
  
let currentDate = new Date();

month_picker.innerHTML = month_names[month]; //cuurent month
calendar_year.innerHTML = year; //current year

let first_day = new Date(year, month);

requestAppointmentData(inputs[3].value);

for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let week_day = document.createElement('div');
    week_day.classList.add('day');
    if (i >= first_day.getDay()) {
      week_day.innerHTML = i - first_day.getDay() + 1;
      if (i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        week_day.classList.add('current-day');
      }
      requestAppointmentData(`${year}-${month+1}-${week_day.innerText}`,week_day);
    }
    calendar_days.appendChild(week_day);
  }

  const appointment_days =  document.querySelectorAll('.day');

  const selectedDay = (index_day) =>{
    appointment_days.forEach((elem,index) =>{
      if(index_day === index){
        elem.classList.add('selected-day');
      }else{
        elem.classList.remove('selected-day');
      }
    });
  
  }
  
  appointment_days.forEach((elem,index) =>{
    elem.onclick = (e) =>{
      selectedDay(index);
        inputs[3].value = `${year}-${month+1}-${e.target.innerText}`
        requestAppointmentData(inputs[3].value);
    };
  });

};


document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value, currentDate.getDate());
};
document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value, currentDate.getDate());
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value, currentDate.getDate());


const create_checkout = document.getElementById('create-checkout')

create_checkout.onclick = () =>{
  create_checkout.innerText = 'Creating Checkout....';

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




  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(booking_inputs)
  };


  EndpointRequest(`${window.origin}/processBooking`,payload)
  .then(json => {
      if (json.status != 401){
          create_checkout.innerText = 'Checkout';
          alert(JSON.stringify('Redirecting To Checkout'));
          window.location = json.value.redirectUrl
      }else{
        create_checkout.innerText = 'Checkout';
        alert('Something went wrong');
        window.location.reload();
      }
    }
  )
  .catch(error => console.log(error));
}

