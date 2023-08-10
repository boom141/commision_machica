
window.onload = () =>{
  EndpointRequest(`${window.origin}/processAnalytics`)
      .then(data => {
        if(data.status !== 401){
          initAppointmentsData(data)
        }else{
            alert('fetching data failed')
        }
          
      })
      .catch(e => console.log(e))
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


  let appointment_container = document.getElementById('appointment-list')
  for(let booking of data.value){
    appointment_container.innerHTML += `<div class="appointment th-transition px-4 th-bg-admin1 d-flex flex-row justify-content-between align-items-center p-2 rounded-3 border">
                                    <span class="fw-normal fs-4 me-2 text-white">${booking.fullname} | ${booking.item_name} | ${booking.description} | ${booking.time} | ${booking.date}</span>
                                    <img id="${booking.reference_code}" width="50" height="50" role="button" class="delete-booking bg-white rounded-3" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/09332e/external-trash-can-homeware-tanah-basah-glyph-tanah-basah.png" alt="checked-checkbox"/>
                                    </div>`
    }


    const delete_bookings = document.querySelectorAll('.delete-booking')
    delete_bookings.forEach(button => {
      button.onclick = (e) =>{
        e.preventDefault()

        let payload = 
        {
          method: "POST",
          headers:
          {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ref_code: e.target.id})
        };

      EndpointRequest(`${window.origin}/deleteBooking`,payload)
      .then(data => {
        if(data.status !== 401){
            alert('Delete Successfully')
        }else{
            alert('Fetching data failed')
        }
          
      })
      .catch(e => console.log(e))
      }
    })
  
  }



