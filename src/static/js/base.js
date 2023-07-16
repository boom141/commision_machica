user = JSON.parse(sessionStorage.getItem('user'));

window.onload = () =>{
  if (user != null){
    document.getElementById('guest-mode').style.display = 'none';
    document.getElementById('online-mode').style.display = 'block';
    document.getElementById('profile-btn').innerText = user.data.fullname.split(' ')[0];
  }
}

document.getElementById('logout-btn').onclick = () =>{
    sessionStorage.clear();
    window.location = window.origin
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

      }else{
          entry.target.classList.remove('fade-left')
          entry.target.classList.remove('fade-right')
          entry.target.classList.remove('fade-bottom')
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


