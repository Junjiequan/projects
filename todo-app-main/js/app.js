
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
const filterAll = document.querySelector('[data-id=all]');
const filterActive = document.querySelector('[data-id=active]');
const filterCompleted = document.querySelector('[data-id=completed]');
const dancingMeme = document.querySelector('.meme__removal');

let todoLeft = 0;

//functions
const createItem = (todoText)=>{
   list.insertAdjacentHTML('beforeend',`
   <li class="todo__item" draggable="true" style="transform:scaleY(0); height:0; aria-label="todo-item-${todoLeft}" ">
   <button class="check-mark" aria-label="todo-check" data-id="check" ></button>
   <input class="active" placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${todoText}" disabled>
   <button class="delete" aria-label="todo-delete" data-id="delete"></button>
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
   todo.classList.toggle('checked');
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
               updateTodoLeft(todoLeft);
            }
            break;
         default:
            document.querySelector('[data-id=all]').focus()
            item.style.display = "flex";
      }
   })
}
//localStorage 
const setLocalTodo = (data,style) =>{
   let storage;
   if (localStorage.getItem('storage') === null) storage = [];
   else storage = JSON.parse(localStorage.getItem('storage'));
   storage.push([data, style]);
   localStorage.setItem('storage', JSON.stringify(storage));
}
const getLocalTodo = () =>{
   let storage;
   if (localStorage.getItem('storage') === null) storage = [];
   else storage = JSON.parse(localStorage.getItem('storage'));
   storage.forEach((data)=>{
      list.insertAdjacentHTML('beforeend',`
      <li class="todo__item ${data[1]}" draggable="true" style="transform: scaleY(1); height:6.5rem; aria-label="todo-item-${todoLeft}" ">
      <button class="check-mark" aria-label="todo-check" data-id="check" ></button>
      <input class="active" placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${data[0]}" disabled>
      <button class="delete" aria-label="todo-delete" data-id="delete"></button>
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
   storage.forEach((elem,index,object)=>{
      if(elem.includes(item)){
        object.splice(index,1)
      }
   })
   localStorage.setItem('storage',JSON.stringify(storage))
}
//dragevents
let dragged;

list.addEventListener('drag', (e)=>{}, false);
list.addEventListener('dragstart', (e)=>{
   dragged = e.target;
}, false);
list.addEventListener('dragend', (e)=>{
}, false);
list.addEventListener('dragover', (e)=>{
   e.preventDefault();
}, false);
list.addEventListener('dragenter', (e)=>{
   if(e.target.classList.contains('todo__item')){
      e.target.style.filter = "drop-shadow(0px 5px 10px lightblue) invert(20%)";
   }
}, false);
list.addEventListener('dragleave', (e)=>{
   if(e.target.classList.contains('todo__item')){
      e.target.style.filter = "";
   }
}, false);
list.addEventListener('drop', (e)=>{
   e.preventDefault();
   const parent = e.target.parentNode;
   const targetPosition = Array.from(parent.children).indexOf(e.target);
   const draggedPosition = Array.from(parent.children).indexOf(dragged)
   if(e.target.classList.contains('todo__item')){
      e.target.style.filter = "";
      if(draggedPosition < targetPosition  ){
         dragged.parentNode.insertBefore(dragged,e.target.nextSibling)
      } else {
         dragged.parentNode.insertBefore(dragged,e.target)
      }
   }
}, false);
list.addEventListener('drop', ()=>{
   const todos = document.querySelectorAll('.todo__item')
   localStorage.clear();
   todos.forEach(item => {
      const text = item.children[1].value;
      setLocalTodo(text, item.classList[1])
   })
})
//eventListeners
document.addEventListener('DOMContentLoaded', getLocalTodo)
filterBox.addEventListener('click', (e) => todoFilter(e.target));

form.addEventListener('click',(e)=>{
   const target = e.target;
   const todos = document.querySelectorAll('.todo__item')
  
   if(target === createTodo){
      if(todoInput.value.match(/\w+/g) ){
        let todoText = todoInput.value.trim();
         createItem(todoText);
         setLocalTodo(todoText)
      }
   };
   if(list){
      if(target.classList.contains('todo__item')){
         toggleCheck(target);
      }
      if(target.dataset.id === 'check'){
         toggleCheck(target.parentElement);
      }
      if(target.dataset.id === 'delete'){
         deleteItem(target);
         deleteLocalTodo(target.previousElementSibling.value)
      }
   };
   localStorage.clear();
   todos.forEach(item => {
      const text = item.children[1].value;
      setLocalTodo(text, item.classList[1])
   })
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
     } else if(body.classList[0] == 'dark'){
        body.classList.remove('dark')
        body.classList.add('light')
        bodyBg.style.backgroundImage = 'url(./images/bg-desktop-light.jpg)';
        img.src="./images/icon-moon.svg"
     }
});

// meme igonore it
function createMeme(){
   if(dancingMeme.style !== null ){
      if(todoLeft === 0){
         dancingMeme.style.height = "13.5rem";
         dancingMeme.style.margin = "1rem auto 1.5rem";
         dancingMeme.classList.remove('meme__hide')
      } else{
         dancingMeme.style.height = "0";
         dancingMeme.style.margin = "0 auto"
         dancingMeme.classList.add('meme__hide')
      }
   }
}