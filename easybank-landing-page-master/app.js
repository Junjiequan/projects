const navIcon = document.getElementById('nav-icon');
const navBox = document.querySelector('.header-wrapper-mobile');
const navBlock = document.querySelector('.overlay')


const openNav = (target)=>{
    target.classList.toggle('toggle');
    setTimeout(()=>{
        navIcon.src = "./images/icon-close.svg"
        navBlock.style.height = "100vh";
    },100);
    navBlock.style.display = "block";
    navBox.style.transform = "scaleY(1)"
    document.body.style.overflowY = "hidden"
}

const closeNav = (target)=>{
    target.classList.toggle('toggle');
    setTimeout(()=>{
        navIcon.src = "./images/icon-hamburger.svg"
        navBlock.style.display = "none";
    },400);
    navBlock.style.height = "0";
    navBox.style.transform = "scaleY(0)"
    document.body.style.overflowY = "visible"
}

document.addEventListener('click', (e)=>{
    const target = e.target
    if(target === navIcon){
        if(!target.classList.contains('toggle')){
            openNav(target)
        } else{
            closeNav(target);
        }
    };
    if(target !== navIcon){
        if(navIcon.classList.contains('toggle')){
            closeNav(navIcon);
        }
    }
})

