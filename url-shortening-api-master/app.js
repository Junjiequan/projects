//preserve previous position
history.pushState(null, null, ' ')
// history.replaceState(null, null, ' ');

//selectors
const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
const linkError = document.querySelector('.warning-zone');
const urlInput = document.querySelector('.link-input');
const ulContainer = document.querySelector('.shorten-list');
const navIcon = document.querySelector('.real-burger');
const navBox = document.querySelector('.top-nav-wrapper');


//fetchData
const getUrl = (url) =>{
    return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
            .then (resp => resp.json())
            .then (data => data.result)
}
//Create li and output result
document.querySelector('.url-btn').addEventListener('click', async (e)=>{    
    e.preventDefault();
    if(urlInput.value.match(urlRegex)){
        //remove error border
        linkError.innerText = '';
        linkError.style.opacity= 0;
        urlInput.classList.remove('error-border')
        document.querySelector('.form-shorten').style.pointerEvents = 'none';
        //start fetching data
        document.querySelector('.url-btn').innerText = 'Loading...';
        document.querySelector('.url-btn').classList.add('loading');
        const getLink =  await getUrl(urlInput.value)

        //create container for generated links
        const li = document.createElement('li');

        //div for links
        const urlLink = document.createElement('div');
        urlLink.classList.add('links');

        const urlBefore = document.createElement('div');
        urlBefore.classList.add('before');
        urlBefore.innerText = getLink.original_link //fetch data
        
        const urlAfter = document.createElement('div');
        urlAfter.classList.add('after');
        urlAfter.innerText = getLink.short_link2;   //fetch data

        //div for buttons
        const btn = document.createElement('div');
        btn.classList.add('buttons')

        const btnCopy = document.createElement('button');
        btnCopy.classList.add('li-copy');
        btnCopy.innerText = 'Copy'

        const btnRemove = document.createElement('button');
        btnRemove.innerHTML = `<i class="far fa-trash-alt"></i>`
        btnRemove.classList.add('li-remove');

        //append childs
        urlLink.appendChild(urlBefore);
        urlLink.appendChild(urlAfter);
        btn.appendChild(btnCopy);
        btn.appendChild(btnRemove);
        li.appendChild(urlLink);
        li.appendChild(btn);
        li.classList.add('shorten-link');
        ulContainer.appendChild(li);
        
        //popup animation
        setTimeout(()=>{
            li.style.opacity = 1;
            li.style.transform = "scaleX(1)"
        },100)

        //remove text
        urlInput.value = '';
        document.querySelector('.url-btn').innerText = 'Shorten it!';
        document.querySelector('.url-btn').classList.remove('loading');
        document.querySelector('.form-shorten').style.pointerEvents = 'auto';
    } else {
        linkError.innerText = 'Please add a link';
        linkError.style.opacity= 1;
        urlInput.classList.add("error-border")
    }
})

//onClick for <li> buttons
ulContainer.addEventListener('click',(e)=>{
    const target = e.target
    const targetLi = target.closest('.shorten-link')
    if(target.classList[0] == 'li-remove'){
        targetLi.style.transform = "scaleY(0)"
        targetLi.style.opacity = 0;
        setTimeout(()=>{
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

//onClick for mobile nav menu icon
let isClick = true;
document.addEventListener('click',(e)=>{
    const target = e.target;
    //set Click frequency to prevent fast click
    if(isClick){
        isClick = false;
        setTimeout(()=>{
            isClick=true;
        },500)
        if( target.classList[0] == 'real-burger'){
            if(navBox.style.opacity != "1"){
                navBox.style.opacity = "1"
            };
            navBox.style.transform = 'translateX(0)';
            navIcon.classList.add('rotate');
            navBox.classList.toggle('triggered');
            setTimeout(()=> navIcon.classList.remove('rotate') ,500);
            if(!navBox.classList.contains('triggered')){
                navBox.style.transform = 'translateX(-140%)';
            }

        } else {
            //click anywhere close nav menu
            if(window.innerWidth < 841){
                navBox.style.transform = 'translateX(-140%)';
                navBox.classList.toggle('triggered');
            }
        }
    }
})
window.addEventListener('resize', ()=>{
    if(window.innerWidth >= 841){
        navBox.style.opacity = "1";
        navBox.style.transform = 'translateX(0)'
    } else {
        navBox.style.opacity = "0";
        navBox.style.transform = 'translateX(-140%)'
    }
});

document.querySelector('.jay').addEventListener('click', ()=>{
    document.querySelector('.jay').style.opacity = '0';
    setTimeout(()=>{
        document.querySelector('.jay').style.display = 'none';
    },700)
})