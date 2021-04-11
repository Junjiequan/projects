const leftBtn = document.querySelector('.icon-left');
const rightBtn = document.querySelector('.icon-right');
//Image
const slideImage = document.querySelectorAll('.img'); //collect image Arrays
const slideImgContainer = document.querySelector('.hero-image-slider');

//Text
const slideText = document.querySelectorAll('.text'); //collect text Arrays
const slideTxtContainer = document.querySelector('.hero-text-slider');

//Get currentIndex and length
const imageNumber = slideImage.length;
let currentImage = 0;
let isClick = true;

const init = () =>{
    slideImage.forEach((element,index)=>{
        element.style.right = index * 100 + "%"
    })
    slideText[0].style.opacity = 1;
    slideText[0].style.transform = "scaleX(1)"
}
init();

// slider button
rightBtn.addEventListener('click', ()=>{
    if(isClick){
        isClick = false;
        setTimeout(()=>{
            isClick = true;
        },500)
        if(currentImage <= 0){
            runSlider(imageNumber -1);
            currentImage = imageNumber -1;
            isStopPointerEvent(0);
            return;
        }
        currentImage--;
        runSlider(currentImage);
        isStopPointerEvent(currentImage + 1);
    }
});
leftBtn.addEventListener('click', ()=>{
    if(isClick){
        isClick = false;
        setTimeout(()=>{
            isClick = true;
        },490)
        if(currentImage >= imageNumber-1){
            runSlider(0);
            isStopPointerEvent(imageNumber - 1);
            currentImage = 0;
            return;
        }
        currentImage++;
        runSlider(currentImage);
        isStopPointerEvent(currentImage - 1);
    }
});

const runSlider = (currentImage) =>{
    slideImgContainer.style.transform = "translateX(" + currentImage * 100 +"%)"
    slideText[currentImage].style.display ="block" 
    setTimeout(()=>{
        slideText[currentImage].style.opacity ="1" 
        slideText[currentImage].style.transform = "scaleX(1)"
    },50)
}
const isStopPointerEvent = (currentImage) =>{
    slideText[currentImage].style.opacity = "0";
    slideText[currentImage].style.transform = "scaleX(0)"
    setTimeout(()=>{
        slideText[currentImage].style.display = "none";
    },500)
}

// mobile navigator button;
const navOpenicon = document.querySelector('.header-wrapper');
const navCloseicon = document.querySelector('.nav-icon-close');
const navBar = document.querySelector('.navigator-mobile-container');

navOpenicon.addEventListener('click', (e)=>{
    navBar.style.transform = "translateY(0)";
});
navCloseicon.addEventListener('click', ()=>{
    navBar.style.transform = "translateY(-20rem)";
})