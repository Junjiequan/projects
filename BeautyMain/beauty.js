//selector
const emailInput = document.getElementById('email');
const emailSubmit = document.querySelector('.submit-btn')
const errorIcon = document.querySelector('.error-icon');
const errorFont = document.querySelector('.error');

//function
const submit = ()=>{
let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailRegex.test(emailInput.value) ){
        errorIcon.classList.remove('showOn');
        errorFont.classList.remove('showOn');
    } else{
        errorIcon.classList.add('showOn');
        errorFont.classList.add('showOn');
    }
}
//eventListener
emailSubmit.addEventListener('click',submit)
//eventListener check input
emailInput.addEventListener('input', ()=>{
    if(emailInput.value == ''){
        errorIcon.classList.remove('showOn');
        errorFont.classList.remove('showOn');
    }
} )