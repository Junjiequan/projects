const bookMark = document.querySelector('.no-hover');
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
const checkMark = ()=>{
    if(localStorage.getItem('Mark') == 'bookmarked'){
        bookMark.classList.toggle('bookmarked');
        bookMark.innerText = 'Bookmarked';
    }
}
document.addEventListener('DOMContentLoaded',checkMark);
bookMark.addEventListener('click', getMark);