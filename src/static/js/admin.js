user = JSON.parse(sessionStorage.getItem('user'));
console.log(user);
  if(user !== null){
    if (user.fullname !== 'admin'){
      window.location = window.origin 
    }
  }else{
    window.location = window.origin 
  }


const EndpointRequest = async (url,payload) =>{
    let response = await fetch(url, payload)
  
    return response.json();
};

const admin_btns = document.querySelectorAll('.navigation-container');

switch(window.location.href){
  case window.origin + '/admin/dashboard':
    admin_btns[0].classList.add('admin-btn-active');
    break;
  case window.origin + '/admin/appointments':
    admin_btns[1].classList.add('admin-btn-active');
}

const user_list_container = document.getElementById('accordionFlushExample');
const displayUserList = (data_list) =>{
  user_list_container.innerHTML = " ";
  for(let data of data_list.value){
    if(data.fullname !== 'admin'){
    console.log(data.history_data)
    user_list_container.innerHTML += `
          <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button th-bg-admin1 text-white collapsed fw-bold fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#${data.email}" aria-expanded="false" aria-controls="flush-collapseOne">
              ${data.fullname}
            </button>
          </h2>
          <div id="${data.email}" class="accordion-collapse collapse p-2" data-bs-parent="#accordionFlushExample">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#${data.email}-details" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Personal Details</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link user-history" id="profile-tab" data-bs-toggle="tab" data-bs-target="#${data.email}-history" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">History</button>
                </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active py-2" id="${data.email}-details" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <p class="fs-6"><b>Fullname:</b> ${data.fullname}</p>
                <p class="fs-6"><b>Birthday:</b> ${data.birthday}</p>
                <p class="fs-6"><b>Age:</b> ${data.age} yrs Old</p>
                <p class="fs-6"><b>Address:</b> ${data.address}</p>
                <p class="fs-6"><b>Gender:</b> ${data.gender}</p>
                <p class="fs-6"><b>Phone:</b> ${data.phone}</p>
                <p class="fs-6"><b>Email:</b> ${data.email}</p>
            </div>

            <div class="tab-pane fade py-2 history-tab" id="${data.email}-history" role="tabpanel" aria-labelledby="profile-tab" tabindex="1">
                
            </div>
            
          </div>    
      </div>
  </div>`
  
  if(data.history_data){
    for(let value of data.history_data) {
      document.getElementById(`${data.email}-history`).innerHTML +=
       `<p class="fs-6 p-2 th-bg-admin1 text-white rounded-3">
        Service: ${value.service} <br>
        Time: ${value.time} <br>
        Date: ${value.date}
        </p>`
    }     
  }

}
}
}




const initUserList = (user_email=null) => {
  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email: user_email})
  };


  EndpointRequest(`${window.origin}/userList`,payload)
  .then(data => {
    if(data.status !== 401){
        displayUserList(data);
    }else{
        alert('Fetching user data failed')
    }
      
  })
  .catch(e => console.log(e))
}


initUserList();



const search_input = document.getElementById('user-search-input')
document.getElementById('user-search').onclick = (e) =>{
  e.preventDefault();
  initUserList(search_input.value);
}


search_input.onchange = (e) =>{
  e.preventDefault();
  if (e.target.value === ""){
    initUserList()
  }
};


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


  document.getElementById('logout-admin').onclick = () =>{
    sessionStorage.clear();
    window.location = window.origin
};

