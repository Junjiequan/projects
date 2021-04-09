const bookMark = document.querySelector('.bookmark');
const mobileMenu = document.querySelector('.side-links');
const menuIcon = document.querySelector('.menu-icon');
const iconIMG = menuIcon.childNodes[0];
const selectBox = document.querySelector('.popup');
const isProject = document.querySelector('#project');
const textWarning = document.querySelector('.check');
const block = document.querySelector('.block')
const success = document.querySelector('.success-container')
//bookmark
const getMark = () =>{
    if(bookMark.innerText == 'Bookmark'){
        bookMark.classList.toggle('bookmarked');
        bookMark.innerText = 'Bookmarked';
        localStorage.setItem('Mark','bookmarked')
    }  else {
        bookMark.classList.remove('bookmarked');
        bookMark.innerText = 'Bookmark';
        localStorage.clear('Mark','');
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
    }
}
const closeMenu = () => {
    mobileMenu.style.display= "none"
    iconIMG.src = './images/icon-hamburger.svg';
}
const getNumberbox = (e) =>{
    const target = e.target;
    const parent = target.closest('.popup-project');
    const radio = parent.querySelectorAll('input[type=radio]');
    const radioText = target.classList
    if(target.type == 'radio' || target.id == 'radiotxt'){   ///////////
        const popupBox = target.closest('.popup-box');
        console.log(target.classList.contains('radio-text1'))
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
    };

    if(target.type == 'submit'){
        const amount=target.parentElement.querySelector('input[type=number]')
        if(amount.value <= 201 && amount.value != ''){
            success.style.display = "flex";
            block.style.zIndex = "50"
            block.style.display = "flex";
            amount.value = '';
            e.preventDefault();
        } else if(amount.value ==''){
            target.parentElement.setAttribute('data-before', 'give me money')
        }
    }

    if(target.id == 'close'){
        const popup = target.closest('.popup');
        block.style.display = "none";
        popup.style.display = "none";
    }
  
}
const openProject = () =>{
    const popup = document.querySelector('.popup');
    const block = document.querySelector('.block');
    popup.style.display= "block";
    block.style.zIndex = "20"
    block.style.display = "flex"
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
    }
    }
)