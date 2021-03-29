const email = document.querySelector('.form');
const emailInput = email.querySelector('.email')
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//function
const checkForm = (event)=>{
    event.preventDefault();
    if(!emailRegex.test(emailInput.value))console.log('fail')
    else window.open('https://youtu.be/7lsdJDiJ0QE','_blank');
}
const resetForm = ()=>{
    emailInput.value = "";
}
//eventListener
email.addEventListener('submit',checkForm);
emailInput.addEventListener('click',resetForm);