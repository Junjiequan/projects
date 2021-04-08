const bookMark = document.querySelector('.bookmark');
const mobileMenu = document.querySelector('.side-links');
const menuIcon = document.querySelector('.menu-icon');
const iconIMG = menuIcon.childNodes[0];
const selectBox = document.querySelector('.popup');
const isProject = document.querySelector('#project');
console.log(selectBox)
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
    const inputRadio = document.querySelector('.input-box');
    const popup = document.querySelector('.popup');
    const block = document.querySelector('.block')
    if(target.checked == true){
        inputRadio.style.opacity = "1";
        inputRadio.classList.add('show');
    } 
    if(target.id == 'close'){
        popup.style.display = "none"
        block.style.display = "none"
    }
}
const openProject = () =>{
    const popup = document.querySelector('.popup');
    const block = document.querySelector('.block');
    popup.style.display= "flex";
    block.style.display = "flex"
}

document.addEventListener('DOMContentLoaded',checkMark);
bookMark.addEventListener('click', getMark);
mobileMenu.addEventListener('click', closeMenu);
menuIcon.addEventListener('click', getMenu);
selectBox.addEventListener('click',getNumberbox);
isProject.addEventListener('click', openProject)