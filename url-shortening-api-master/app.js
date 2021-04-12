const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;


document.querySelector('.url-btn').addEventListener('click', ()=>{
    document.querySelector('.warning-zone').innerText = 'Please add a link';
    document.querySelector('.warning-zone').style.opacity= 1;
})