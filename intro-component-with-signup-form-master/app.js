//selectors
const loginSection = document.querySelector('.login-bg');   // container
const warningFont = loginSection.querySelectorAll('.warning');  // all warning font
const intputIcon = loginSection.querySelectorAll('.icon');      // all error Icon
const inputBorder = loginSection.querySelectorAll('.input');   // all border
const intputEmail = loginSection.querySelector('.Email');     //Email
const inputFirstName = loginSection.querySelector('.NameF')        //FirstName
const inputLastName = loginSection.querySelector('.NameL')        //LastName
const inputPassword = loginSection.querySelector('.Password')//Password

const nameRegex = /^[a-z ,.'-]+$/i;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^[A-Za-z0-9]{8,}$/;

//function
const checkFormat= (event) =>{
    event.preventDefault();
    //remove errors style
    warningFont.forEach(index=> index.classList.remove('error-font'));
    intputIcon.forEach(index=> index.classList.remove('error-icon'));
    inputBorder.forEach(index=> {
        index.classList.remove('error-border');
        index.classList.add('default');
    });
    // email Check
    if(!emailRegex.test(intputEmail.value)){
        intputIcon[2].classList.add('error-icon');
        warningFont[2].classList.add('error-font');
        inputBorder[2].classList.remove('default');
        inputBorder[2].classList.add('error-border');
    }
    // name Check
    if(!nameRegex.test(inputFirstName.value)){
        intputIcon[0].classList.add('error-icon');
        warningFont[0].classList.add('error-font');
        inputBorder[0].classList.remove('default');
        inputBorder[0].classList.add('error-border');
    } 
    if(!nameRegex.test(inputLastName.value)){
        intputIcon[1].classList.add('error-icon');
        warningFont[1].classList.add('error-font');
        inputBorder[1].classList.remove('default');
        inputBorder[1].classList.add('error-border');
    } 
    // password check
    if(!passwordRegex.test(inputPassword.value)){
        intputIcon[3].classList.add('error-icon');
        warningFont[3].classList.add('error-font');
        inputBorder[3].classList.remove('default');
        inputBorder[3].classList.add('error-border');
    }
}
const removeError = (event) =>{
    const target = event.target.parentElement;
    const font = target.nextElementSibling;
    if(target.querySelector('input').value == ''){
        const input = target.querySelector('.input');
        const icon = target.querySelector('.icon');
        //remove warning styles onclick
        input.classList.remove('error-border');
        input.classList.add('default');
        icon.classList.remove('error-icon');
        font.classList.remove('error-font');
    }
}

//eventListener
loginSection.addEventListener('submit',checkFormat);
loginSection.addEventListener('click', removeError)