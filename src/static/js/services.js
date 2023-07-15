
const inputs = document.getElementsByClassName('inputs');

window.onload = () =>{
  if (user != null){
      inputs[0].value = user.data.fullname;
      inputs[2].value = user.data.email;
      document.getElementById('guest-mode').style.display = 'none';
      document.getElementById('online-mode').style.display = 'block';
      document.getElementById('profile-btn').innerText = user.data.fullname.split(' ')[0];
  }
}

const EndpointRequest = async (url,payload) =>{
  let response = await fetch(url, payload)

  return response.json();
};

const create_checkout = document.getElementById('create-checkout');

create_checkout.onclick = () =>{
  
  create_checkout.innerText = 'Creating Checkout...';

  let booking_inputs = 
  {
        fullname: inputs[0].value,
        phone:inputs[1].value,
        email:inputs[2].value,
        date:inputs[3].value,
        time:inputs[4].value,
        POA:inputs[5].value,
        PRP:inputs[6].value,
        message:inputs[7].value
  } 

  let payload = 
  {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(booking_inputs)
  };


  EndpointRequest(window.location.href,payload)
  .then(json => {
      if (json.status != 401){
          create_checkout.innerText = 'Checkout';
          alert(JSON.stringify('Redirecting To Checkout'));
          window.location = json.data.redirectUrl
      }
    }
  )
  .catch(error => console.log(error));

}


const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  spaceBetween: 20,
  slidesPerView: 3,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  
});


