if(window.location.href === window.origin + "/admin/dashboard"){
  setInterval(() => {
    document.getElementById('today-date').innerText = new Date().toLocaleString();
  }, 100);
}


const sortArrayOfObjects = (arr, propertyName, order = 'ascending') => {
    const sortedArr = arr.sort((a, b) => {
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      return 0;
    });
  
    if (order === 'descending') {
      return sortedArr.reverse();
    }
  
    return sortedArr;
  };

  const followAppointmentData = async (date) =>{
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
    followAppointmentData(date)
    .then(data_list =>{
      let reserved_time_slot = []
  
      if(data_list !== null){
        for(data of data_list){
          reserved_time_slot.push(data.time)
        }
      }
      
      let timesets = document.querySelectorAll('.time-booking');

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


const setTodayAppointments = (data_list) =>{
    let sched_container = document.getElementById('sched-today');
    let update_info = document.querySelectorAll('.update-info');
    const new_list = sortArrayOfObjects(data_list, 'time');

    sched_container.innerHTML = "";
      new_list.forEach((data,index) =>{
        if(!data.isDone){
          sched_container.innerHTML += 
          `<tr class="text-center">
              <td>${data.fullname}</td>
              <td>${data.date} | ${data.time}</td>
              <td id="${index}-update-data">${data.description}</td>
              <td class="d-flex flex-row justify-content-around">
                  <span id="${data.email}~${data.time}" role="button" class="followUp-btn p-2 text-white rounded-3"> 
                      <i class="bi bi-pencil-square pe-none"></i> Follow Up
                  </span>
                  <span id="${data.email}~${data.time}" role="button" class="done-btn p-2 text-white rounded-3">
                      <i class="bi bi-check-square pe-none"></i> Done
                  </span>
              </td>
          </tr>`
        }
      })
    
    let update_time_id = null
    let followUp_btns = document.querySelectorAll('.followUp-btn');
    followUp_btns.forEach((btn,index) =>{      
      btn.onclick = (e) =>{
        update_info[0].value = e.target.id.split("~")[0]
        update_time_id = e.target.id.split("~")[1]
        $('#exampleModal').modal('show');

      };
    
    })

    update_info[2].onchange = e =>{
      let date_split = e.target.value.split("-")
      let new_date = `${date_split[0]}-${date_split[1].split("0")[1]}-${date_split[2]}`
      update_info[3].value = ''

      setAvailableTimeSlots(new_date)

    }


      let appointment_update_btn = document.getElementById('appointment-update-btn')
      appointment_update_btn.onclick = (e) => {
          console.log(e.target.id)
          let date = new Date()

          let date_split = update_info[2].value.split("-")
          let new_date = `${date_split[0]}-${date_split[1].split("0")[1]}-${date_split[2]}`

          data = 
          {
            email: update_info[0].value,
            service: update_info[1].value,
            date: new_date,
            time: update_info[3].value,
            message: update_info[4].value,
            current_date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            current_time:  update_time_id
          }


          let payload = 
          {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          };
          
          fetch(`${window.origin}/updateAppointment`,payload)
          .then(data => data.json())
          .then(data => {
              if(data.value){
                alert("Appointment Updated Successfully!");
                window.location.reload();
              }else{
                alert("Action Failed!");
              }
          })
          .catch(err => console.error(err))
        }

        let done_btn = document.querySelectorAll('.done-btn');
        done_btn.forEach(btn =>{
          btn.onclick = (e) =>{
            console.log('hello')
            let date = new Date()

            data = 
            {
              email: e.target.id.split("~")[0],
              current_date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
              current_time: e.target.id.split("~")[1]
            }
  
            
            let payload = 
            {
              method: "POST",
              headers:
              {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            };
            
            fetch(`${window.origin}/doneAppointment`,payload)
            .then(data => data.json())
            .then(data => {
                if(data.value){
                  alert("Appointment Done!");
                  window.location.reload();
                }else{
                  alert("Action Failed!");
                }
            })
            .catch(err => console.error(err))
          }
        })
}



const requestAppointmentData = (date) =>{
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
        if(data.value !== null){
            setTodayAppointments(data.value)
        }else{
          if(window.location.href === window.origin + "/admin/dashboard")
          alert('No Appointments Today')
        } 
          
      })
      .catch(e => console.log(e))
}


let date = new Date();
let today_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
requestAppointmentData(today_date)


try{
  EndpointRequest(`${window.origin}/processAnalytics`)
      .then(data => {
        if(data.status !== 401){
          initAppointmentsData(data)
        }else{
            alert('fetching data failed')
        }
          
      })
      .catch(e => console.log(e))

}catch(e){
console.log(e);
}



const initAppointmentsData = (data) =>{
  const chart_1 = document.getElementById('Monthly-Bar');

  new Chart(chart_1, {
    type: 'bar',
    data: {
      labels: ['Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5', 'Service 6'],
      datasets: [{
        label: 'Sales Per Service Reservation',
        data: data.units_sold,
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
          'rgba(75, 192, 192)',
          'rgba(54, 162, 235)',
          'rgba(153, 102, 255)',
          'rgba(201, 203, 207)'
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  const chart_3 = document.getElementById('monthly_revenue');

  new Chart(chart_3, {
    type: 'line',
    data: {
      labels: [
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
      ]
      ,
      datasets: [{
        label: 'Monthly Revenue of Service Reservation',
        data: data.month,
        fill: true,
        borderColor: 'rgb(51, 124, 115)',
        tension: 0.01
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  }



  

try{

  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({value: null})
  };



  EndpointRequest(`${window.origin}/appointmentList`,payload)
  .then(data => {
    if(data.value){
        initAppointmentList(data.value);
    }else{
        alert('Fetching user data failed')
    }
      
  })
  .catch(e => console.log(e))

}catch(e){

}





let appointment_container = document.getElementById('user-records')
const initAppointmentList = (data_list) =>{
appointment_container.innerHTML = ""

for(let data of data_list){
  if(data.isDone){
    appointment_container.innerHTML += 
      `<tr class="text-center">
        <td>${data.fullname}</td>
        <td>${data.email}</td>
        <td>${data.date} | ${data.time}</td>
        <td>${data.description}</td>
        <td>${(data.isDone) ? 'Done' : 'On Going'}</td>
      </tr>
      `
  }
  }

}

const user_search = document.getElementById('user-search-records');
try{

  user_search.onclick = () =>{
  let dashboard_filters = document.querySelectorAll('.dashboard-filters');
  
  let payload_data = {}
  dashboard_filters.forEach(filter =>{
    if(filter.value !== ""){
        
        if(filter.id === "email"){
            payload_data[filter.id] = filter.value
        }
      
        if(filter.id === "description"){
            payload_data[filter.id] = "" +filter.value
        }
  
    }
  });
  
  
  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({value: payload_data})
  };
  
  
  EndpointRequest(`${window.origin}/appointmentList`,payload)
  .then(data => {
    if(data.value){
        initAppointmentList(data.value);
    }else{
        alert('Records not found')
    }
      
  })
  .catch(e => console.log(e))
  }
}catch(e){
  
}
