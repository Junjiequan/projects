//selectors // container
const time = document.querySelectorAll('.hero__timer__number')
//selectors // value
    let secondsPrev = +time[3].dataset.numberBefore
    let secondsNext = +time[3].dataset.numberAfter
    let minutesPrev = +time[2].dataset.numberBefore
    let minutesNext = +time[2].dataset.numberAfter
    let hoursPrev = +time[1].dataset.numberBefore
    let hoursNext = +time[1].dataset.numberAfter
    let daysPrev = +time[0].dataset.numberBefore
    let daysNext = +time[0].dataset.numberAfter
    secondsPrev = 10;
    secondsNext = 10;

const secondsFront = time[3].querySelectorAll('.number')[0];
const secondsBehind = time[3].querySelectorAll('.number')[1];
//functions
(function runTime(){
    secondsFront.parentElement.addEventListener('transitionend', ()=>{
        secondsFront.parentElement.classList.add('no-animation')
        secondsFront.parentElement.classList.remove('flipped')
    })

    if(!secondsFront.parentElement.classList.contains('flipped')){
        secondsFront.parentElement.classList.remove('no-animation')
        secondsFront.parentElement.classList.add('flipped')
    }
    secondsPrev--;
    secondsNext--;
    if( secondsPrev < 10 ){
        secondsPrev = '0' + secondsPrev;
    }
    if(secondsNext < 10){
        secondsNext = '0' + secondsNext;
    }
    if( secondsPrev == 0 || secondsNext ==0 ){
        if(secondsPrev) secondsPrev = 59;
        if(secondsNext) secondsNext = 59;
    }

    secondsFront.textContent = secondsNext;
    secondsBehind.textContent = secondsPrev;
    time[3].dataset.numberBefore = secondsPrev
    time[3].dataset.numberAfter = secondsNext

    
    setTimeout(runTime,1000)
    
    
})();

