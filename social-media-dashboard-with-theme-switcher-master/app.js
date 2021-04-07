const colorTheme = document.querySelector('body');
const toggleBtn = document.querySelector('.btn');
const toggleBall = document.querySelector('.ball');
console.log(toggleBall.style.transform)
function isToggle(){
    if(colorTheme.classList.contains('dark')){
        colorTheme.classList.remove('dark');
        colorTheme.classList.add('light');
        // toggleBtn.style.justifyContent = 'flex-end';
        toggleBall.style.transform = 'translateX(132%)'
        localStorage.setItem('theme' , 'light')
    } else {
        colorTheme.classList.remove('light');
        colorTheme.classList.add('dark');
        // toggleBtn.style.justifyContent = 'flex-start';
        toggleBall.style.transform = 'translateX(0)'
        localStorage.setItem('theme' , 'dark')
    }
}
function getTheme(){
    if(localStorage.getItem('theme') == 'dark'){
        colorTheme.classList.remove('light');
        colorTheme.classList.add('dark');
        toggleBall.style.transform = 'translateX(0)'
    } else {
        colorTheme.classList.remove('dark');
        colorTheme.classList.add('light');
        toggleBall.style.transform = 'translateX(132%)'
    }
}
window.addEventListener('DOMContentLoaded',getTheme);
toggleBtn.addEventListener('click',isToggle);