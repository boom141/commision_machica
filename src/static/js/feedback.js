

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
  


    EndpointRequest(`${window.origin}/feedbackList`,payload)
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




let feedback_container = document.getElementById('user-feedbacks')
const initAppointmentList = (data_list) =>{
  feedback_container.innerHTML = ""

  for(let data of data_list){
    if(!data.isDone){
      feedback_container.innerHTML += 
        `<tr class="text-center">
          <td>${data.email}</td>
          <td>${data.type}</td>
          <td>${data.message}</td>
          <td>${data.rating}</td>
        </tr>
        `
    }
    }
  
}

const user_search = document.getElementById('user-search-feedback');
user_search.onclick = () =>{
  let dashboard_filters = document.querySelectorAll('.dashboard-filters');
  
  let payload_data = {}
  dashboard_filters.forEach(filter =>{
    if(filter.value !== ""){
        if(filter.id === "type"){
            payload_data[filter.id] = filter.value
        }

        if(filter.id === "rating"){
            payload_data[filter.id] = Number(filter.value)
        }
    }
  });

  console.log(payload_data);

  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({value: payload_data})
  };


  EndpointRequest(`${window.origin}/feedbackList`,payload)
  .then(data => {
    if(data.value){
        initAppointmentList(data.value);
    }else{
        alert('Feedback not found')
    }
      
  })
  .catch(e => console.log(e))
}
