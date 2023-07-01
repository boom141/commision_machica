const observer = new IntersectionObserver(entries =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            document.querySelectorAll('.on-left')[0].classList.add('fade-left')
            document.querySelectorAll('.on-left')[1].classList.add('fade-left')
            document.querySelectorAll('.on-left')[2].classList.add('fade-left')
            document.querySelectorAll('.on-right')[0].classList.add('fade-right')
            document.querySelectorAll('.on-bottom')[0].classList.add('fade-bottom')
        }else{
            document.querySelectorAll('.on-left')[0].classList.remove('fade-left')
            document.querySelectorAll('.on-left')[1].classList.remove('fade-left')
            document.querySelectorAll('.on-left')[2].classList.remove('fade-left')
            document.querySelectorAll('.on-right')[0].classList.remove('fade-right')
            document.querySelectorAll('.on-bottom')[0].classList.remove('fade-bottom')
        }
    })
})

observer.observe(document.querySelector('.about-section'))
