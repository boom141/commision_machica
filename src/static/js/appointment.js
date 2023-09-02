

// try{
//   EndpointRequest(`${window.origin}/processAnalytics`)
//       .then(data => {
//         if(data.status !== 401){
//           initAppointmentsData(data)
//         }else{
//             alert('fetching data failed')
//         }
          
//       })
//       .catch(e => console.log(e))

// }catch(e){
// console.log(e);
// }





// let appointment_container = document.getElementById('appointment-list')
// const initAppointmentList = (data_list) =>{
//   appointment_container.innerHTML = ""

//   for(let data of data_list){
//     appointment_container.innerHTML += 
//       `<tr>
//         <td>${data.fullname}</td>
//         <td>${data.email}</td>
//         <td>${data.date}</td>
//         <td>${data.time}</td>
//         <td>${data.item_name}-${data.description}</td>
//         <td>${data.reservation_fee}</td>

//       </tr>
//       `
//     }
  
// }



// const user_search = document.getElementById('user-search-dashboard');
// user_search.onclick = () =>{
//   let dashboard_input = document.getElementById('search-dashboard-input');

//   let payload = 
//   {
//     method: "POST",
//     headers:
//     {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({email: dashboard_input.value})
//   };


//   EndpointRequest(`${window.origin}/appointmentList`,payload)
//   .then(data => {
//     if(data.status !== 401){
//         initAppointmentList(data.value);
//     }else{
//         alert('Fetching user data failed')
//     }
      
//   })
//   .catch(e => console.log(e))
// }
