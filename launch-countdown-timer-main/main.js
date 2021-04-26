const number = document.querySelectorAll('.number')
const seconds = number[3].querySelector('.card');
const minutes = number[2].querySelector('.card');
const hours = number[1].querySelector('.card');
const days = number[0].querySelector('.card');
const faceFrontSec = number[3].querySelectorAll('.card__face')[0];
const faceBackSec = number[3].querySelectorAll('.card__face')[1];




let SecBefore = +number[3].dataset.numberBefore;
let SecAfter = +number[3].dataset.numberAfter;
let MinBefore = +number[2].dataset.numberBefore;
let MinAfter = +number[2].dataset.numberAfter;
let HourBefore = +number[1].dataset.numberBefore;
let HourAfter = +number[1].dataset.numberAfter;
let DayBefore = +number[0].dataset.numberBefore;
let DayAfter = +number[0].dataset.numberAfter;



//initial value
SecBefore = 3;


(function runTime(){
    SecBefore--;
    if(SecBefore == -1 || SecBefore > 59){
        SecBefore = 59;
        number[3].dataset.numberAfter = 59;
        faceBackSec.textContent = 59;
    }
    SecAfter = SecBefore - 1;
    if(SecAfter < 10) SecAfter = '0' + SecAfter;
    if(SecBefore < 10) SecBefore = '0'+ SecBefore;
    
    number.forEach((num)=>{
        if(!num.dataset.numberBefore){
            num.dataset.numberBefore = SecBefore;
            num.querySelectorAll('.card__face')[0].textContent =  SecBefore;
            num.dataset.numberAfter = SecAfter;
            num.querySelectorAll('.card__face')[1].textContent = SecAfter;
        } else if (num.dataset.numberBefore != SecBefore){
            num.querySelector('.card').addEventListener('transitionend', function(){
                num.dataset.numberBefore = SecBefore;
                num.querySelectorAll('.card__face')[0].textContent =  SecBefore;
                num.querySelector('.card').classList.remove('flipped');
                num.querySelector('.card').classList.add('unflip');
                num.dataset.numberAfter = SecAfter;
                num.querySelectorAll('.card__face')[1].textContent = SecAfter;
            }, { once:true });
            if(!num.querySelector('.card').classList.contains('flipped')){
                num.querySelector('.card').classList.add('flipped');
                num.querySelector('.card').classList.remove('unflip');
            }
        }
    })
    setTimeout(runTime,1000)
})();


