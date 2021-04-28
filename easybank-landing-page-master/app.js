const navIcon = document.getElementById('nav-icon');
const navBox = document.querySelector('.header-wrapper-mobile');
const navBlock = document.querySelector('.popup-bg')


const openNav = (target)=>{
    target.classList.toggle('toggle');
    navIcon.style.transform = "rotate(360deg)"
    setTimeout(()=>{
        navIcon.src = "./images/icon-close.svg"
    },100);
    navBlock.style.display = "flex";
    setTimeout(()=>{
        navBlock.style.height = "100%";
        navBlock.style.opacity = "1";
    },50);
    navBox.style.height = "25rem";
    navBox.style.opacity = "1";
}

const closeNav = (target)=>{
    target.classList.toggle('toggle');
    navIcon.style.transform = "rotate(0deg)"
    setTimeout(()=>{
        navIcon.src = "./images/icon-hamburger.svg"
    },400);
    navBlock.style.opacity = "0";
    navBlock.style.height = "0";
    setTimeout(()=>{
        navBlock.style.display = "none";
    },450);
    navBox.style.height = "0";
    navBox.style.opacity = "0";
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