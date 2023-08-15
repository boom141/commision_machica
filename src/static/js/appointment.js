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


let appointment_container = document.getElementById('appointment-list')
const initAppointmentList = (data_list) =>{
  appointment_container.innerHTML = ""

  for(let data of data_list){
    appointment_container.innerHTML += 
      `<tr>
        <td>${data.fullname}</td>
        <td>${data.email}</td>
        <td>${data.date}</td>
        <td>${data.time}</td>
        <td>${data.item_name}-${data.description}</td>
        <td>${data.reservation_fee}</td>

      </tr>
      `
    }
  
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

  initAppointmentList(data.value);

  
  }



const user_search = document.getElementById('user-search-dashboard');
user_search.onclick = () =>{
  let dashboard_input = document.getElementById('search-dashboard-input');

  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email: dashboard_input.value})
  };


  EndpointRequest(`${window.origin}/appointmentList`,payload)
  .then(data => {
    if(data.status !== 401){
        initAppointmentList(data.value);
    }else{
        alert('Fetching user data failed')
    }
      
  })
  .catch(e => console.log(e))
}
