const colorTheme = document.querySelector('body');
const toggleBtn = document.querySelector('.btn');

function isToggle(){
    if(colorTheme.classList.contains('dark')){
        colorTheme.classList.remove('dark');
        colorTheme.classList.add('light');
        toggleBtn.style.justifyContent = 'flex-end';
    } else {
        colorTheme.classList.remove('light');
        colorTheme.classList.add('dark');
        toggleBtn.style.justifyContent = 'flex-start';
    }
}

toggleBtn.addEventListener('click',isToggle);