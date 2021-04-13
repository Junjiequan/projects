const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
const linkError = document.querySelector('.warning-zone')
const urlInput = document.querySelector('.link-input');
const ulContainer = document.querySelector('.shorten-list')


document.querySelector('.url-btn').addEventListener('click', ()=>{    
    if(urlInput.value.match(urlRegex)){
        const li = document.createElement('li');
        li.classList.add('shorten-link');

        const url = document.createElement('div');
        url.classList.add('links');

        const urlBefore = document.createElement('div');
        urlBefore.classList.add('before');
        urlBefore.innerText = urlInput.value;

        const urlAfter = document.createElement('div');
        urlAfter.classList.add('after');
        urlAfter.innerText = ('put API here')
        url.appendChild(urlBefore);
        url.appendChild(urlAfter);
        li.appendChild(url);
        ulContainer.appendChild(li);
        

        //remove text
        urlInput.value = '';
    } else {
        linkError.innerText = 'Please add a link';
        linkError.style.opacity= 1;
    }
})