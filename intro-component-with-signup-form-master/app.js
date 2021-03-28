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
     // email Check
    if(!emailRegex.test(intputEmail.value)){
        intputIcon[2].classList.add('error-icon');
        warningFont[2].classList.add('error-font');
        inputBorder[2].classList.remove('default');
        inputBorder[2].classList.add('error-border');
    }
    // password check
    if(!passwordRegex.test(inputPassword.value)){
        intputIcon[3].classList.add('error-icon');
        warningFont[3].classList.add('error-font');
        inputBorder[3].classList.remove('default');
        inputBorder[3].classList.add('error-border');
    }
    if(emailRegex.test(intputEmail.value) && nameRegex.test(inputFirstName.value) 
        && nameRegex.test(inputLastName.value) && passwordRegex.test(inputPassword.value)){
        loginSection.querySelector('button').innerText = 'Success'
        setTimeout(()=>{
            window.open('https://www.youtube.com/watch?v=7lsdJDiJ0QE')
        }, 1000)
    }
}
const removeError = (event) =>{
    const target = event.target;
    const font = target.closest('.input-box').nextElementSibling;
    loginSection.querySelector('button').innerText = 'Claim your free trial'
    if(target.closest('.input').value == ''){
        const input = target.closest('.input');
        const icon = input.nextElementSibling;
        //remove warning styles onclick
        input.classList.remove('error-border');
        input.classList.add('default');
        icon.classList.remove('error-icon');
        font.classList.remove('error-font');
    }
}

//eventListener
loginSection.addEventListener('submit',checkFormat);
loginSection.addEventListener('beforeinput',removeError);
