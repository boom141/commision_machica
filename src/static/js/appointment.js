

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
console.log(e);
}





let appointment_container = document.getElementById('appointment-list')
const initAppointmentList = (data_list) =>{
  appointment_container.innerHTML = ""

  for(let data of data_list){
    if(!data.isDone){
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

const user_search = document.getElementById('user-search-dashboard');
user_search.onclick = () =>{
  let dashboard_filters = document.querySelectorAll('.dashboard-filters');
  
  let payload_data = {}
  dashboard_filters.forEach(filter =>{
    if(filter.value !== ""){
        if(filter.id === "date"){
            let date_split = filter.value.split("-")
            let new_date = `${date_split[0]}-${date_split[1].split("0")[1]}-${date_split[2].split("0")[1]}`
            payload_data[filter.id] = new_date;
        }

        if(filter.id === "email"){
            payload_data[filter.id] = filter.value
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
        alert('Appoinment not found')
    }
      
  })
  .catch(e => console.log(e))
}
