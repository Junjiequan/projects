const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
const linkError = document.querySelector('.warning-zone')
const urlInput = document.querySelector('.link-input');
const ulContainer = document.querySelector('.shorten-list')


document.querySelector('.url-btn').addEventListener('click', ()=>{    
    if(urlInput.value.match(urlRegex)){
        //remove error border
        linkError.innerText = '';
        linkError.style.opacity= 0;
        urlInput.classList.remove('error-border')

        const li = document.createElement('li');
        //links
        const url = document.createElement('div');
        url.classList.add('links');

        const urlBefore = document.createElement('div');
        urlBefore.classList.add('before');
        urlBefore.innerText = urlInput.value
        
        const urlAfter = document.createElement('div');
        urlAfter.classList.add('after');
        urlAfter.innerText = ('put API here');

        //buttons
        const btn = document.createElement('div');
        btn.classList.add('buttons')

        const btnCopy = document.createElement('button');
        btnCopy.classList.add('li-copy');
        btnCopy.innerText = 'Copy'

        const btnRemove = document.createElement('button');
        btnRemove.innerHTML = `<i class="far fa-trash-alt"></i>`
        btnRemove.classList.add('li-remove');


        url.appendChild(urlBefore);
        url.appendChild(urlAfter);
        btn.appendChild(btnCopy);
        btn.appendChild(btnRemove);
        li.appendChild(url);
        li.appendChild(btn);
        li.classList.add('shorten-link');
        ulContainer.appendChild(li);
        
        setTimeout(()=>{
            li.style.opacity = 1;
            li.style.transform = "scaleX(1)"
        },100)
        //remove text
        urlInput.value = '';
    } else {
        linkError.innerText = 'Please add a link';
        linkError.style.opacity= 1;
        urlInput.classList.add("error-border")
    }
})

ulContainer.addEventListener('click',(e)=>{
    const target = e.target
    const targetLi = target.closest('.shorten-link')
    if(target.classList[0] == 'li-remove'){
        targetLi.style.transform = "scaleY(0)"
        targetLi.style.opacity = 0;
        setTimeout(()=>{
            targetLi.style.transform = "scaleX(0)"
            targetLi.remove();
        }, 500)
    }
    if(target.classList[0] == 'li-copy'){
        if(target.innerText == 'Copy'){
            target.classList.add('li-copied')
            target.innerText = 'Copied';
            //Creating copy environment.
            const textCopy = targetLi.querySelector('.after').innerText;
            const copyCondition = document.createElement('input');
            copyCondition.type ="text"
            copyCondition.value = textCopy;
            document.body.appendChild(copyCondition);
            copyCondition.select();
            document.execCommand("copy")
            document.body.removeChild(copyCondition);
            setTimeout(()=>{
                target.classList.remove('li-copied');
                target.innerText = 'Copy';
            },1000)
        } 
    }
})
// history.replaceState(null, null, ' ');
history.pushState(null, null, ' ')