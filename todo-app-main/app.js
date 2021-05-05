//selectors
const body = document.body;
const bodyBg = document.querySelector('.bg')
const colorTrigger = document.querySelector('.app__switch');
const createTodo = document.querySelector('.check');
const deleteTodo = document.querySelector('.delete');
const todoInput = document.querySelector('[data-id = "todo-content"]')
const form = document.querySelector('.todo__form')
const list = document.querySelector('.todo__list');
const filterBox = document.querySelector('.todo__bottom');

let todoLeft = 0;

//functions
const createItem = (todoText)=>{
   list.insertAdjacentHTML('beforeend',`
   <li class="todo__item" draggable="true" style="transform:scaleY(0); height:0; id="${todoLeft}" ">
   <div class="check-mark " data-id="check" ></div>
   <input class="active " placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${todoText}" disabled>
   <div class="delete " data-id="delete"></div>
   </li>
   `)
   todoInput.value = '';
   setTimeout(()=>{
      list.lastElementChild.style.transform = "scaleY(1)";
      list.lastElementChild.style.height = "6.5rem";
      todoLeft++;
      updateTodoLeft(todoLeft);
      createMeme(todoLeft);
   },10)
}

const deleteItem = (todo)=>{
   const targetTodo = todo.closest('.todo__item')
   targetTodo.style.transform = "scaleY(0)";
   targetTodo.style.height = "0";
   setTimeout(()=>{
      targetTodo.remove();
   },460)
   todoLeft--;
   updateTodoLeft(todoLeft);
   createMeme(todoLeft);
   deleteLocalTodo(targetTodo);
}

const updateTodoLeft = (amount)=>{
   document.getElementById('amount').innerText = `${amount}`;
}

const toggleCheck = (todo)=>{
   todo.closest('.todo__item').classList.toggle('checked');
   if(todo.classList.contains('no-animation')) 
      setTimeout(()=> todo.classList.remove('no-animation'),300)
   else todo.classList.add('no-animation');
}

const todoFilter = (target) =>{
   const todos = document.querySelectorAll('.todo__item');
   const filter = target.dataset.id;
   todos.forEach(item =>{
      switch (filter){
         case 'all':
            item.style.display = "flex";
            break;
         case 'active':
            if(!item.classList.contains('checked'))
               item.style.display = "flex";
            else item.style.display = "none";
            break;
         case 'completed':
            if(item.classList.contains('checked'))
               item.style.display = "flex";
            else item.style.display = "none";
            break;
         case 'clear-complete':
            if(item.classList.contains('checked')){
               item.remove();
               todoLeft--;
               deleteLocalTodo(item);
               updateTodoLeft(todoLeft);
            }
            break;
      }
   })
}

//localStorage 
const setLocalTodo = (data) =>{
   let storage;
   if (localStorage.getItem('storage') === null) storage = [];
   else storage = JSON.parse(localStorage.getItem('storage'));
   
   storage.push(data);
   localStorage.setItem('storage', JSON.stringify(storage));
}

const getLocalTodo = () =>{
   let storage;
   if (localStorage.getItem('storage') === null) storage = [];
   else storage = JSON.parse(localStorage.getItem('storage'));
   storage.forEach(data=>{
      list.insertAdjacentHTML('beforeend',`
      <li class="todo__item" draggable="true" style="transform: scaleY(1); height:6.5rem; id="${todoLeft}" ">
      <div class="check-mark " data-id="check" ></div>
      <input class="active " placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${data}" disabled>
      <div class="delete " data-id="delete"></div>
      </li>
      `)
      todoLeft++;
      updateTodoLeft(todoLeft);
      createMeme(todoLeft);
   })
}
const deleteLocalTodo = (target) =>{
   let storage;
   if (localStorage.getItem('storage') === null) storage = [];
   else storage = JSON.parse(localStorage.getItem('storage'));
   const item = target.children[1].value
   storage.splice(storage.indexOf(item), 1)
   localStorage.setItem('storage',JSON.stringify(storage))
}

//dragevents
let dragged;

list.addEventListener('drag', (e)=>{}, false);
list.addEventListener('dragstart', (e)=>{
   e.target.style.transition = "";
   dragged = e.target;
}, false);
list.addEventListener('dragend', (e)=>{
}, false);
list.addEventListener('dragover', (e)=>{
   e.preventDefault();
}, false);
list.addEventListener('dragenter', (e)=>{
   if(e.target.className == 'todo__item'){
      e.target.style.filter = "drop-shadow(1px 10px 10px gray) invert(10%)";
   }
}, false);
list.addEventListener('dragleave', (e)=>{
   if(e.target.className == 'todo__item'){
      e.target.style.filter = "";
   }
}, false);
list.addEventListener('drop', (e)=>{
   e.preventDefault();
   e.target.style.transition = "none";
   const parent = e.target.parentNode;
   const targetPosition = Array.from(parent.children).indexOf(e.target);
   const draggedPosition = Array.from(parent.children).indexOf(dragged)
   if(e.target.className == 'todo__item'){
      e.target.style.filter = "";
      if(draggedPosition < targetPosition  ){
         dragged.parentNode.insertBefore(dragged,e.target.nextSibling)
      } else {
         dragged.parentNode.insertBefore(dragged,e.target)
      }
   }
}, false);

//eventListeners
filterBox.addEventListener('click', (e) => todoFilter(e.target));

form.addEventListener('click',(e)=>{
   const target = e.target;
   if(target === createTodo){
      if(todoInput.value.match(/\w+/g) ){
        let todoText = todoInput.value.trim();
         createItem(todoText);
         setLocalTodo(todoText)
      }
   };
   if(list){
      if(target.dataset.id === 'delete'){
         deleteItem(target);
      }
      if(target.dataset.id === 'check'){
         toggleCheck(target);
      }
   };
   createMeme();
});
todoInput.addEventListener('keyup',(e)=>{
      if(e.keyCode === 13) createTodo.click();
});
colorTrigger.addEventListener('click',()=>{
   const img = colorTrigger.children[0];
    if(body.classList[0] == 'light'){
        body.classList.remove('light')
        body.classList.add('dark')
        bodyBg.style.backgroundImage = 'url(./images/bg-desktop-dark.jpg)';
        img.src="./images/icon-sun.svg"
     } else{
        body.classList.remove('dark')
        body.classList.add('light')
        bodyBg.style.backgroundImage = 'url(./images/bg-desktop-light.jpg)';
        img.src="./images/icon-moon.svg"
     }
});

//some personal stuff
const dancingMeme = document.querySelector('.meme__removal');
const bgm = new Audio('songs/omaewa.mp3')

const playBGM = ()=>{
   bgm.volume = 0.5;
   bgm.loop = true;
   bgm.autoplay = true;
   bgm.load();
   bgm.pause();
}
function createMeme(){
   if(dancingMeme.style !== null ){
      if(todoLeft < 1){
         dancingMeme.style.height = "13.5rem";
         dancingMeme.style.margin = "1rem auto 1.5rem";
      } else if(list.querySelectorAll('li').length > 1){
         dancingMeme.style.height = "0";
         dancingMeme.style.margin = "0 auto";
      }
   }
}
function isVolume(target){
   if(target.dataset.id === 'mute'){
      target.style.display = "none"
      target.nextElementSibling.style.display = "block"
      bgm.volume = 0;
      bgm.pause();
   } else {
      target.style.display = "none"
      target.previousElementSibling.style.display = "block"
      bgm.volume = 0.5;
      bgm.play();
   }
}
function removeMeme(target){
   target.parentElement.remove();
}
document.addEventListener('DOMContentLoaded', () => {
   playBGM();
   getLocalTodo();
})
document.querySelector('.volume').addEventListener('click', (e) => isVolume(e.target))
dancingMeme.addEventListener('click', (e) => removeMeme(e.target))

