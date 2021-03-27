const count = document.querySelector('.t-h1');
const progress = document.querySelector('.progress')
const count2 = document.getElementById('number')

const changeSpace = ()=>{
    count.innerText = Math.floor(Math.random() *1000); 
    count2.innerText = '1000' - count.innerText + ' GB';
    progress.style.width= count.innerText / 10 + '%';
        setTimeout(changeSpace,5000);
}
window.onload = changeSpace;