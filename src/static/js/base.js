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

window.onscroll = function() {
    if (window.pageYOffset > 0) {
      navbar.classList.add("moving")
    } else {
      navbar.classList.remove("moving");
    }
}


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


