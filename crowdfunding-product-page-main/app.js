const bookMark = document.querySelector('.no-hover');
const mobileMenu = document.querySelector('.side-links')
const menuIcon = document.querySelector('.menu-icon')
const iconIMG = menuIcon.childNodes[0]
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
document.addEventListener('DOMContentLoaded',checkMark);
bookMark.addEventListener('click', getMark);
mobileMenu.addEventListener('click', closeMenu);
menuIcon.addEventListener('click', getMenu)