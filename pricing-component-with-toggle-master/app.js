//selector
let toggleBtn = document.querySelector('.toggle-btn');

//function
const changePrice = () =>{
    const btn = getComputedStyle(toggleBtn)
    if(btn.justifyContent == 'flex-start'){
        toggleBtn.style.justifyContent = 'flex-end'
        toggleBtn.style.opacity = '0.6'
    } else {
        toggleBtn.style.justifyContent = 'flex-start'
        toggleBtn.style.opacity = '1'
    }  
}
//eventlistener
toggleBtn.addEventListener('click',changePrice);