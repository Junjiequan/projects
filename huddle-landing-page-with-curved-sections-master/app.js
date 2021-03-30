const emailInput = document.getElementById('email');
const emailBtn = document.querySelector('.button');
const errorText = document.querySelector('.error');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



function checkEmail(){
    if(!emailRegex.test(emailInput.value)){
        errorText.classList.add('show')
    }
}
function clearEmail(){
    if(emailInput.value == ''){
        errorText.classList.remove('show')
    }
}


emailBtn.addEventListener('click',checkEmail)
emailInput.addEventListener('change',clearEmail)
