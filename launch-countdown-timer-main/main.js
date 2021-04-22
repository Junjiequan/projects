const number = document.querySelector('.hero__timer__number');
const numberPrev = document.querySelector('.number__front');
const numberNext = document.querySelector('.number__behind')
const numberFlip = document.querySelector('.hero__timer__number__bg')

function countSecond(){
        number.dataset.numberBefore--;
        number.dataset.numberAfter--;
        if(number.dataset.numberAfter == 0){
            number.dataset.numberAfter = 59;
        };
        if(number.dataset.numberBefore == 0){
            number.dataset.numberBefore = 59
        };
        if(number.dataset.numberAfter < 10 && number.dataset.numberBefore < 10){
            number.dataset.numberAfter = '0' + number.dataset.numberAfter
            number.dataset.numberBefore = '0' + number.dataset.numberBefore
        };
        numberFlip.classList.toggle('flipped')
        numberPrev.textContent = number.dataset.numberBefore;
        numberNext.textContent = number.dataset.numberAfter;
        

}


setInterval(countSecond,1000);
