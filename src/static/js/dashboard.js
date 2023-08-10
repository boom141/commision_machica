setInterval(() => {
  document.getElementById('today-date').innerText = new Date().toLocaleString();
}, 100);


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

const setTodayAppointments = (data_list) =>{
    let sched_container = document.getElementById('sched-today')
    const new_list = sortArrayOfObjects(data_list, 'time')

    for(let data of new_list){
        sched_container.innerHTML += `<div class="sched th-transition px-4 th-bg-admin1 d-flex flex-row justify-content-between align-items-center p-2 rounded-3 border">
                                    <span class="fw-normal fs-3 me-2 text-white">${data.fullname} | ${data.item_name} | ${data.description} | ${data.time}</span>
                                    <img width="50" height="50" role="button" class="bg-white rounded-3" src="https://img.icons8.com/ios-filled/50/09332e/checked-checkbox.png" alt="checked-checkbox"/>
                                    </div>`
    }
};

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
            console.log('No return value')
        }
          
      })
      .catch(e => console.log(e))
}


let date = new Date();
let today_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
requestAppointmentData(today_date)
