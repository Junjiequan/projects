const bookMark = document.querySelector('.bookmark');
const mobileMenu = document.querySelector('.side-links');
const menuIcon = document.querySelector('.menu-icon');
const iconIMG = menuIcon.childNodes[0];
const selectBox = document.querySelector('.popup');
const isProject = document.querySelector('#project');
const textWarning = document.querySelector('.check');
const block = document.querySelector('.block');
const success = document.querySelector('.success-container');
let isClick = true;

const getMark = () =>{
    if(bookMark.innerText == 'Bookmark'){
        bookMark.classList.toggle('bookmarked');
        bookMark.innerText = 'Bookmarked';
        localStorage.setItem('Mark','bookmarked')
    }  else {
        bookMark.classList.remove('bookmarked');
        bookMark.innerText = 'Bookmark';
        localStorage.setItem('Mark','');
    }
}
const checkMark = () => {
    if(localStorage.getItem('Mark') == 'bookmarked'){
        bookMark.classList.toggle('bookmarked');
        bookMark.innerText = 'Bookmarked';
    }
}
const getMenu = () =>{
    if(mobileMenu.style.display= "none"){
        iconIMG.src = './images/icon-close-menu.svg';
        mobileMenu.style.display= "flex"
        document.body.style.overflowY = "hidden"
    }
}
const closeMenu = () => {
    mobileMenu.style.display= "none"
    iconIMG.src = './images/icon-hamburger.svg';
    document.body.style.overflowY = "auto"
}
const getNumberbox = (e) =>{
    const target = e.target;
    const parent = target.closest('.popup-project');
    const radio = parent.querySelectorAll('input[type=radio]');
    if(target.type == 'radio' || target.classList.contains('radiotxt')){   
        const popupBox = target.closest('.popup-box');
        parent.querySelectorAll('.input-box').forEach((index)=> index.classList.remove('show'));
        parent.querySelectorAll('.input-box').forEach((index)=> index.style.opacity = 0);
        popupBox.parentElement.querySelectorAll('.popup-box').forEach(index=>{
            index.classList.remove('selected');
            index.classList.add('border');
        })
        if(target.id == 'radio1' || target.classList.contains('radio-text1')){
            radio[0].checked = true;
            radio[1].checked = false;
            radio[2].checked = false;
            popupBox.querySelector('.input-box').style.opacity = 1;
            popupBox.querySelector('.input-box').classList.add('show');
            popupBox.classList.remove('border');
            popupBox.classList.add('selected');
        };
        if(target.id == 'radio2' || target.classList.contains('radio-text2')){
            radio[0].checked = false;
            radio[1].checked = true;
            radio[2].checked = false;
            popupBox.querySelector('.input-box').style.opacity = 1;
            popupBox.querySelector('.input-box').classList.add('show');
            popupBox.classList.remove('border');
            popupBox.classList.add('selected');
        };
        if(target.id == 'radio3' || target.classList.contains('radio-text3')){
            radio[0].checked = false;
            radio[1].checked = false;
            radio[2].checked = true;
            popupBox.querySelector('.input-box').style.opacity = 1;
            popupBox.querySelector('.input-box').classList.add('show');
            popupBox.classList.remove('border');
            popupBox.classList.add('selected');
        };
    }else if(target.id === 'close'){
            parent.querySelectorAll('.input-box').forEach((index)=> index.classList.remove('show'));
            parent.querySelectorAll('.input-box').forEach((index)=> index.style.opacity = 0);
            document.querySelectorAll('.popup-box').forEach(index=>{
                index.classList.remove('selected');
            })
            radio[0].checked = false;
            radio[1].checked = false;
            radio[2].checked = false;
    }
    if(target.type == 'submit'){
        const containerParent = target.closest('.popup-box');
        const amount=containerParent.querySelector('input[type=number]');
        const minimumSign = containerParent.querySelector('.anima')
        const getLeft = Number(containerParent.querySelector('.left').innerText)
        const minimum = Number(containerParent.querySelector('h5').id)
        if(amount.value >= minimum && amount.value != ''){
            success.style.display = "flex";
            setTimeout(()=>{
                success.style.transform = "scale(1)";
            },100)
            block.style.zIndex = "50"
            block.style.display = "flex";
            amount.value = '';
            if(containerParent.querySelector('.left').innerText != ''){
                containerParent.querySelector('.left').innerText = getLeft - 1;
            } 
        } else if(amount.value < minimum){
            
            if( minimumSign != null && isClick === true){
                minimumSign.classList.add('animated')
                isClick = false;
                setTimeout(()=>{
                    minimumSign.classList.remove('animated')
                    isClick = true;
                },900);
            }
        } else return;
    }
    closeProject(target);
}
const openProject = () =>{
    const popup = document.querySelector('.popup');
    const block = document.querySelector('.block');
    popup.style.display= "block";
    document.body.style.overflowY = "hidden";
    block.style.zIndex = "20"
    block.style.display = "flex"
    
    setTimeout(()=>{
        block.style.opacity = "1";
        popup.style.opacity= "1";
        popup.classList.add('animation')
    },100 )
}
const closeProject = (target) =>{
    if(target.id == 'close'){
        const popup = target.closest('.popup');
        popup.style.opacity= "0";
        block.style.opacity = "0";
        document.body.style.overflowY = "visible";
        setTimeout(()=>{
            block.style.display = "none";
            popup.style.display = "none";
        },400)
        popup.classList.remove('animation')
    }    
}
const removeWarning = () =>{
    textWarning.setAttribute('data-before', '')
}

document.addEventListener('DOMContentLoaded',checkMark);
bookMark.addEventListener('click', getMark);
mobileMenu.addEventListener('click', closeMenu);
menuIcon.addEventListener('click', getMenu);
selectBox.addEventListener('click',getNumberbox);
isProject.addEventListener('click', openProject)
textWarning.querySelector('input[type=number]').addEventListener('click', removeWarning);
success.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn')){
        block.style.zIndex = "20"
        success.style.display = "none";
        success.style.transform = "scale(0)";
        }
    }
)

