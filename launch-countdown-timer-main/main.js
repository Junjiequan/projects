const number = document.querySelectorAll('.number')
const seconds = number[3].querySelector('.card');
const minutes = number[2].querySelector('.card');
const hours = number[1].querySelector('.card');
const days = number[0].querySelector('.card');
const faceFrontSec = number[3].querySelectorAll('.card__face')[0];
const faceBackSec = number[3].querySelectorAll('.card__face')[1];
const faceFrontMin = number[2].querySelectorAll('.card__face')[0];
const faceBackMin = number[2].querySelectorAll('.card__face')[1];



let SecBefore = +number[3].dataset.numberBefore;
let SecAfter = +number[3].dataset.numberAfter;
let MinBefore = +number[2].dataset.numberBefore;
let MinAfter = +number[2].dataset.numberAfter;
let HourBefore = +number[1].dataset.numberBefore;
let HourAfter = +number[1].dataset.numberAfter;
let DayBefore = +number[0].dataset.numberBefore;
let DayAfter = +number[0].dataset.numberAfter;

//initial value
SecBefore = 2;
(function runTime(){
    SecBefore--;
    if(SecBefore == -1 ){
        SecBefore = 59;
        number[3].dataset.numberAfter = 59;
        faceBackSec.textContent = 59;
        runMinute();
    }
    SecAfter = SecBefore - 1;
    if(SecAfter < 10) SecAfter = '0' + SecAfter;
    if(SecBefore < 10) SecBefore = '0'+ SecBefore;
    
    if(!number[3].dataset.numberBefore){
        number[3].dataset.numberBefore = SecBefore;
        faceFrontSec.textContent =  SecBefore;
        number[3].dataset.numberAfter = SecAfter;
        faceBackSec.textContent = SecAfter;
    } else if (number[3].dataset.numberBefore != SecBefore){
        seconds.addEventListener('transitionend', function(){
            number[3].dataset.numberBefore = SecBefore;
            faceFrontSec.textContent =  SecBefore;
            seconds.classList.remove('flipped');
            seconds.classList.add('unflip');
            number[3].dataset.numberAfter = SecAfter;
            faceBackSec.textContent = SecAfter;
        }, { once:true });
        if(!seconds.classList.contains('flipped')){
            seconds.classList.add('flipped');
            seconds.classList.remove('unflip');
        }
    }
    setTimeout(runTime,1000)
})();

function runMinute(){
    MinBefore--;
    if(MinBefore == -1 ){
        MinBefore = 59;
        number[2].dataset.numberAfter = 59;
        faceBackMin.textContent = 59;
    }
    MinAfter = MinBefore - 1;
    if(!number[2].dataset.numberBefore){
        number[2].dataset.numberBefore = MinBefore;
        faceFrontMin.textContent =  MinBefore;
        number[2].dataset.numberAfter = MinAfter;
        faceBackMin.textContent = MinAfter;
    } else if (number[2].dataset.numberBefore != MinBefore){
        minutes.addEventListener('transitionend', function(){
            if(MinAfter < 10) MinAfter = '0' + MinAfter;
            if(MinBefore < 10) MinBefore = '0'+ MinBefore;
            number[2].dataset.numberBefore = MinBefore;
            faceFrontMin.textContent =  MinBefore;
            minutes.classList.remove('flipped');
            minutes.classList.add('unflip');
            number[2].dataset.numberAfter = MinAfter;
            faceBackMin.textContent = MinAfter;
        }, { once:true });
        if(!minutes.classList.contains('flipped')){
            minutes.classList.add('flipped');
            minutes.classList.remove('unflip');
        }
    }
}