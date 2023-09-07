user = JSON.parse(sessionStorage.getItem('user'));
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
    break;
  case window.origin + '/admin/records':
    admin_btns[2].classList.add('admin-btn-active');
}

const user_list_container = document.getElementById('accordionFlushExample');
const displayUserList = (data_list) =>{
  user_list_container.innerHTML = " ";
  for(let data of data_list.value){
    if(data.fullname !== 'admin'){
    user_list_container.innerHTML += `
          <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button th-bg-admin1 text-white collapsed fw-bold fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#${data.email}" aria-expanded="false" aria-controls="flush-collapseOne">
              ${data.fullname}
            </button>
          </h2>
          <div id="${data.email}" class="accordion-collapse collapse p-2" data-bs-parent="#accordionFlushExample">
            <div class="tab-pane fade show active py-2" id="${data.email}-details" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <p class="fs-6"><b>Fullname:</b> ${data.fullname}</p>
                <p class="fs-6"><b>Birthday:</b> ${data.birthday}</p>
                <p class="fs-6"><b>Age:</b> ${data.age} yrs Old</p>
                <p class="fs-6"><b>Address:</b> ${data.address}</p>
                <p class="fs-6"><b>Gender:</b> ${data.gender}</p>
                <p class="fs-6"><b>Phone:</b> ${data.phone}</p>
                <p class="fs-6"><b>Email:</b> ${data.email}</p>
            </div>
            
          </div>    
      </div>
  </div>`
  

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

