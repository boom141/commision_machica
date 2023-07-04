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



