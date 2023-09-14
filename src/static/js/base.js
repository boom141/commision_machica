user = JSON.parse(sessionStorage.getItem('user'));
chatbot_data = []

sessionStorage.setItem('chatbot_Data',JSON.stringify(chatbot_data));

try{
  if (user != null){
    document.getElementById('guest-mode').style.display = 'none';
    document.getElementById('online-mode').style.display = 'block';
    document.getElementById('profile-btn').innerText = user.fullname.split(' ')[0].toUpperCase();
  }
}catch(e){
  console.log(e)
}


document.getElementById('logout-btn').onclick = () =>{
    sessionStorage.clear();
    window.location = window.origin
};
document.getElementById('profile-options').onclick = () =>{
    window.location = window.origin + '/profile/appointment_list';
};



const navbar = document.querySelector('nav')
const navlinks = document.querySelectorAll('.nav-item')


switch(window.location.href){
  case window.origin + '/':
    navlinks[0].children[0].classList.add('link-active');
    break;
  case window.origin + '/about':
    navlinks[1].children[0].classList.add('link-active');
    break;
  case window.origin + '/services':
    navlinks[2].children[0].classList.add('link-active');
    break;
  case window.origin + '/contact':
    navlinks[3].children[0].classList.add('link-active');
    break;
}


window.onscroll = function() {
    if (window.pageYOffset > 0) {
      navbar.classList.add("moving")
    } else {
      navbar.classList.remove("moving");
    }
}



const observer = new IntersectionObserver((entries, observer) =>{
  entries.forEach(entry =>{
      if(entry.isIntersecting){
          if(entry.target.classList.contains('left'))
          {
              entry.target.classList.add('fade-left')
          }
          if(entry.target.classList.contains('right'))
          {
              entry.target.classList.add('fade-right')
          }
          if(entry.target.classList.contains('bottom'))
          {
              entry.target.classList.add('fade-bottom')
          }

      }
  })
})

const on_scroll_animation = document.querySelectorAll('.animated')
on_scroll_animation.forEach(element => observer.observe(element))



let chatbot_switch = false
$("#chatbot-panel").hide()
$("#close-icon").hide()
$("#chatbot-btn").click(()=>{
    if (!chatbot_switch){
        $("#message-icon").hide("fast")
        $("#close-icon").show("fast")
        $("#chatbot-panel").show("fast")
        chatbot_switch = !chatbot_switch
    } else{
        $("#chatbot-panel").hide("fast")
        $("#close-icon").hide("fast")
        $("#message-icon").show("fast")
        chatbot_switch = !chatbot_switch
    }
})





const send_btn = document.getElementById('send-btn');
const message_body = document.getElementById('message-body');
const input_query = document.getElementById('input-query');
const input_email = document.getElementById('input-email');

const week = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const createMessageItem = (data) =>{
  return `<div class="user-message d-flex flex-row">
            <img width="50" height="50" class="rounded-5" src="https://img.icons8.com/bubbles/50/user.png" alt="user"/>
            <p class="th-bg-dark rounded-3">
              <span class="fw-lighter text-white">${data.day}, ${data.time}</span><br>
              <span class="fw-normal text-white">
                ${data.message}
              </span>
            </p>
          </div>`
}


send_btn.onclick = () =>{

    if(input_query.value && input_email.value){
      let date = new Date()
      let time = date.toLocaleString('en-US',{
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })

      let inquiry_data = 
      {
        time: time,
        day: week[date.getDay()],
        message: input_query.value
      }

      message_body.innerHTML += createMessageItem(inquiry_data)

      let payload = 
      {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({value: {email: input_email.value, message: input_query.value}})
      };
      
      fetch(`${window.origin}/sendInquiry`,payload)
      .then(data => data.json())
      .then(data =>{
        if(data.value){
          alert('Message Sent!');
        }else{
          alert('Message Sent Failed.');
        }
      })

    }else{
      alert("Inputs Fields Mus Be Filled")
    }

}