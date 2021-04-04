//selector
const toggleBtn = document.querySelector('.toggle-btn');
const priceNumber = document.querySelectorAll('.price');

//function
const changePrice = () =>{
    const btn = getComputedStyle(toggleBtn)
    if(btn.justifyContent == 'flex-start'){
        toggleBtn.style.justifyContent = 'flex-end';
        toggleBtn.style.filter = 'brightness(85%)';
        priceNumber[0].innerHTML = `<span>$</span>19.99`;
        priceNumber[1].innerHTML = `<span>$</span>24.99`;
        priceNumber[2].innerHTML = `<span>$</span>39.99`;
    } else {
        toggleBtn.style.justifyContent = 'flex-start';
        toggleBtn.style.filter = 'brightness(100%)';
        priceNumber[0].innerHTML = `<span>$</span>199.99`;
        priceNumber[1].innerHTML = `<span>$</span>249.99`;
        priceNumber[2].innerHTML = `<span>$</span>399.99`;
    }  
}
//eventlistener
toggleBtn.addEventListener('click',changePrice);
