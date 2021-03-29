//data
const users = [
    {
        feedback : "“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”",
        title : "UX Engineer",
        name: "Tanya Sinclair",
        image: "./images/image-tanya.jpg"
    },
    {
        feedback : " “ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”",
        title : "Junior Front-end Developer",
        name: "John Tarkpor",
        image: "./images/image-john.jpg"
    }
]
//settings
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.after');
const text = document.getElementById('text');
const personName = document.getElementById('name');
const title = document.getElementById('title');
const titleAnimation = document.querySelector('.title')
const picture = document.getElementById('picture');
const container = document.querySelector('.container')
const textAnimation = document.querySelector('.info-font')
let slider = 0;

//function
const changeInfo = () =>{
    if(slider > users.length -1){
        slider = 0;
    }
    container.classList.remove('show');
    textAnimation.classList.add('textShow');
    titleAnimation.classList.add('titleShow');
    setTimeout(()=>{
        container.classList.add('show');
        textAnimation.classList.remove('textShow');
        titleAnimation.classList.remove('titleShow')
        text.innerText = users[slider].feedback;
        personName.innerText = users[slider].name;
        title.innerText = users[slider].title;
        picture.src = users[slider].image;
        slider++;
    },500)

}

//eventlistener
prevBtn.addEventListener('click', changeInfo);
nextBtn.addEventListener('click', changeInfo);