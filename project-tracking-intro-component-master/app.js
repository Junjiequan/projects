const sideNav = document.querySelector('.navlink')
const sideNavIcon = document.getElementById('navIcon')
const toggleMenu = () =>{
    const disPlay = getComputedStyle(sideNav)
    if(disPlay.display == "none"){
        sideNav.style.display = "flex";
        sideNavIcon.src= "./images/icon-close.svg";
    } else{
        sideNav.style.display = "none";
        sideNavIcon.src= "./images/icon-hamburger.svg";
    }
}
const closeMenu = () =>{
    sideNav.style.display = "none";
    sideNavIcon.src= "./images/icon-hamburger.svg";
}
sideNavIcon.addEventListener('click',toggleMenu)
sideNav.addEventListener('click', closeMenu)

