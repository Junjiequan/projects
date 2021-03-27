const count = document.querySelector('.t-h1');
const progress = document.querySelector('.progress')

count.innerText = Math.floor(Math.random() *1000); 
progress.style.width= count.innerText / 10 + '%';
