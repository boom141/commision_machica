const requestAppointmentData = async (email) =>{
  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email: email})
  };
  

    return fetch(`${window.origin}/appointmentList`, payload)
    .then(data => data.json())
    .then(data => {
      return data;
    }).catch(err => console.log(err));

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
      let day = document.createElement('div');
      day.classList.add("day");

      if (i >= first_day.getDay()) {
            let numerical_day = i - first_day.getDay() + 1;
            day.innerHTML = numerical_day
            let request_date = `${year}-${month+1}-${numerical_day}`
            requestAppointmentData(user.email)
            .then(data =>{
              if(data.status !== 401){
                for(let value of data.value){
                  if(!value.isDone && value.date === request_date){
                      day.classList.add('appointment-day');
                    }
                }

              } 
            })

          }
          
          calendar_days.appendChild(day);

    }
    
    let days = document.querySelectorAll('.day')
    days.forEach(day =>{
      day.onclick = e =>{
        let appointment_infos = document.querySelectorAll('.appointment-info')
        let request_date = `${year}-${month+1}-${e.target.innerText}`
        requestAppointmentData(user.email)
        .then(data =>{
          if(data.status !== 401){
            for(let value of data.value){
              if(value.date === request_date){
                appointment_infos[0].innerText = `${value.item_name}-${value.description}`
                appointment_infos[1].innerText = value.message
                appointment_infos[2].innerText = `${value.date} | ${value.time}`              
                $('#exampleModal').modal('show');
              }
            
            }
          } 
        })
      }
      })
  };

const currentDate = new Date();
const currentMonth = { value: currentDate.getMonth() };
const currentYear = { value: currentDate.getFullYear() };

generateCalendar(currentMonth.value, currentYear.value);


month_picker.onchange = (e) =>{
  generateCalendar(month_names.indexOf(e.target.value), currentYear.value);
}

document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
