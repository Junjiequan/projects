const bookMark = document.querySelector('.bookmark');
const mobileMenu = document.querySelector('.side-links');
const menuIcon = document.querySelector('.menu-icon');
const iconIMG = menuIcon.childNodes[0];
const selectBox = document.querySelector('.popup');
const isProject = document.querySelector('#project');
const textWarning = document.querySelector('.check')
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
    const radio = parent.querySelectorAll('input[type=radio]')
//     if(target.checked == false){
//         target.value = true
//     } else target.checked = false
   
//    console.log(target.value)
//    console.log(target.checked)
    if(target.id == 'radio'){
        const popupBox = target.closest('.popup-box');
        parent.querySelectorAll('.input-box').forEach((index)=> index.classList.remove('show'));
        parent.querySelectorAll('.input-box').forEach((index)=> index.style.opacity = 0);
        popupBox.parentElement.querySelectorAll('.popup-box').forEach(index=>{
            index.classList.remove('selected');
            index.classList.add('border');
        })
        if(target.value == '1'){
            radio[0].checked = true;
            radio[1].checked = false;
            radio[2].checked = false;
            popupBox.querySelector('.input-box').style.opacity = 1;
            popupBox.querySelector('.input-box').classList.add('show');
            popupBox.classList.remove('border');
            popupBox.classList.add('selected');
            
        };
        if(target.value == '2'){
            radio[0].checked = false;
            radio[1].checked = true;
            radio[2].checked = false;
            popupBox.querySelector('.input-box').style.opacity = 1;
            popupBox.querySelector('.input-box').classList.add('show');
            popupBox.classList.remove('border');
            popupBox.classList.add('selected');
        };
        if(target.value == '3'){
            radio[0].checked = false;
            radio[1].checked = false;
            radio[2].checked = true;
            popupBox.querySelector('.input-box').style.opacity = 1;
            popupBox.querySelector('.input-box').classList.add('show');
            popupBox.classList.remove('border');
            popupBox.classList.add('selected');
        };
    }


    if(target.id == 'close'){
        const popup = target.closest('.popup');
        const block = document.querySelector('.block')
        block.style.display = "none";
        popup.style.display = "none";
    }
  
}
const openProject = () =>{
    const popup = document.querySelector('.popup');
    const block = document.querySelector('.block');
    popup.style.display= "flex";
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
textWarning.querySelector('#price').addEventListener('click', removeWarning);