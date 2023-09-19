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
    break;
  case window.origin + '/admin/feedback':
    admin_btns[3].classList.add('admin-btn-active');
}

let show_information = false;
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
            <ul class="nav nav-tabs px-3" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="details-tab" data-bs-toggle="tab" data-bs-target="#${data.email}-details" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Personal Details</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="records-tab" data-bs-toggle="tab" data-bs-target="#${data.email}-records" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Records</button>
                </li>
            </ul>
          
            <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active py-2 position-relative" id="${data.email}-details" role="tabpanel"  tabindex="0">
                        <div id="${data.email}-cover" class="information-cover rounded-3"></div> 
                        <p class="fs-6"><b>Fullname:</b> ${data.fullname}</p>
                        <p class="fs-6"><b>Birthday:</b> ${data.birthday}</p>
                        <p class="fs-6"><b>Age:</b> ${data.age} yrs Old</p>
                        <p class="fs-6"><b>Address:</b> ${data.address}</p>
                        <p class="fs-6"><b>Gender:</b> ${data.gender}</p>
                        <p class="fs-6"><b>Phone:</b> ${data.phone}</p>
                        <p class="fs-6"><b>Email:</b> ${data.email}</p>
                        <p id="${data.email}" role="button" class="show-btn p-2 text-white rounded-3 mt-5"> 
                          <i class="bi bi-eye pe-none"></i> show
                        </p>
                    </div>

                    <div class="tab-pane fade mt-3 rounded-3 user-records" id="${data.email}-records" role="tabpanel"  tabindex="0">
                        <table class="table table-bordered table-striped">
                            <thead class="profile-table-head">
                                <tr class="table-success text-center">
                                    <th>Date | Time</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="${data.email}-record-list">
                                
                            </tbody>
                        </table>
                </div>
            </div>
        </div>    
    </div>`
      
    let appointment_container = document.getElementById(`${data.email}-record-list`)
    for(let record of data.history_data){
      if(record.status){
        appointment_container.innerHTML += 
          `<tr class="text-center">
            <td>${record.date} | ${record.time}</td>
            <td>${record.service}</td>
            <td>${(record.status) ? 'Done' : 'On Going'}</td>
            <td class="d-flex flex-row justify-content-around">
            <span id="${data.email}~${record.date}~${record.time}" role="button" class="view-btn p-2 text-white rounded-3"> 
            <i class="bi bi-eye pe-none"></i> View
            </span>
        </td>
          </tr>
          `
      }
      }
      
      const show_btns = document.querySelectorAll('.show-btn');
      show_btns.forEach(btn =>{
        btn.onclick = e =>{
          let cover_element = document.getElementById( `${e.target.id}-cover` );
          if(show_information == false){
            e.target.innerHTML = ''
            e.target.innerHTML = '<i class="bi bi-eye-slash pe-none"></i> hide'
            show_information = true
            cover_element.classList.add('hide-cover');
          }else{
            e.target.innerHTML = ''
            e.target.innerHTML = '<i class="bi bi-eye pe-none"></i> show'
            show_information = false
            cover_element.classList.remove('hide-cover');
          }

        }});

      const view_btns = document.querySelectorAll('.view-btn');
      view_btns.forEach(btn =>{
        btn.onclick = e =>{
          let filter_data = e.target.id.split("~");

          let payload_data = {
            email: filter_data[0],
            date: filter_data[1],
            time: filter_data[2]
          }


          let payload = 
          {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({value: payload_data})
          };

          const invoice_content = document.getElementById('invoice-content');
          invoice_content.innerHTML = ''
          fetch(`${window.origin}/appointmentList`,payload)
          .then(data => data.json())
          .then(data => {
            if(data.value[0] != null){
              invoice_content.innerHTML += `
                <div class="d-flex flex-row justify-content-between">
                    <p><b>Fullname:</b> ${data.value[0].fullname}</p>
                    <p><b>Reference:</b> ${data.value[0].reference_code}</p>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <p><b>Email:</b> ${data.value[0].email}</p>
                </div>
                <hr>
                <table class="invoice-table">
                    <thead>
                        <tr>                            
                            <th>Service</th>
                            <th>Date | Time</th>
                            <th>Status</th>
                            <th>Fee</th>
                        </tr>
                    </thead>
                    <tbody id="invoice-data">
                        <tr>
                            <td>${data.value[0].description}</td>
                            <td>${data.value[0].date} | ${data.value[0].time}</td>
                            <td>${(data.value[0].isDone) ? 'Done' : 'On Going'}</td>
                            <td>${data.value[0].reservation_fee}</td>
                        </tr>
                    </tbody>
                </table>
                <hr class="mt-5">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <img width="110" height="50" src="https://drive.google.com/uc?export=view&id=19p7oorbHwdopExU0lH2w-Jq4hBbYjEyn" alt="">
                    <div>
                        <h6>Dr.Natividad Abuda Machica</h6>
                        <h6 class="text-muted"><i>General Dentistry Orthodontics</i></h6>
                    </div>
                    <div>
                        <h6>0919-538-8143</h6>
                        <h6>natzddm@yahoo.com</h6>
                    </div>
                </div>
              `
              $('#invoiceModal').modal('show');
            }else{
              alert('Something went wrong, try again later')
            }
          })
          .catch(error => console.log(error));
        }
      });

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


const print_btn = document.getElementById('print-btn');
print_btn.onclick = () =>{
  window.print();

}