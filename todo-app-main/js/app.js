import {preData} from './data.js';
//selectors
const body = document.body;
const bodyBg = document.querySelector('.bg')
const colorTrigger = document.querySelector('.app__switch');
const createTodo = document.querySelector('.check');
const deleteTodo = document.querySelector('.delete');
const todoInput = document.querySelector('[data-id = "todo-content"]')
const form = document.querySelector('.todo__form')
const list = document.querySelector('.todo__list');
const items = document.querySelectorAll('.todo__item');
const filterBox = document.querySelector('.todo__bottom');
const filterAll = document.querySelector('[data-id=all]');
const filterActive = document.querySelector('[data-id=active]');
const filterCompleted = document.querySelector('[data-id=completed]');
const dancingMeme = document.querySelector('.meme__removal');
const hasTodo = Array.from(list.children).slice(1,list.children.length).length
let todoLeft = 0;


//functions
const createItem = (todoText,scale,height)=>{
   const uniqueId = Math.floor(Math.random() * 100000)
   list.insertAdjacentHTML('beforeend',`
   <li class="todo__item" draggable="true" ondragstart="dragstart(event)" ondragenter="dragenter(event)" ondragend="dragend(event)" style="transform:scaleY(${scale}); height:${height};" id="${uniqueId}" >
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
if(hasTodo === 0){
   preData.forEach(data=>{
      createItem(data,'1',' 6.5rem')
   })
}
// preData.map(data =>{
//    list.insertAdjacentHTML('beforeend',`
//    <li class="todo__item" draggable="true" ondragstart="dragstart(event)" ondragenter="dragenter(event)" ondragend="dragend(event)" style="transform:scaleY(1); height:6.5rem;" id="${todoLeft}" >
//    <button class="check-mark" aria-label="todo-check" data-id="check" ></button>
//    <input class="active" placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${data}" disabled>
//    <button class="delete" aria-label="todo-delete" data-id="delete"></button>
//    </li>
//    `)
//    todoInput.value = '';
//    todoLeft++;
//    updateTodoLeft(todoLeft);
//    createMeme(todoLeft);
// })

console.log()
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
}

function updateTodoLeft(amount){
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
const setLocalTodo = (data, style) =>{
   let storage;

}

const updateLocalTodo = () =>{

}
const getLocalTodo = () =>{
}
const deleteLocalTodo = (target) =>{

}
//dragevents
// const isDrag = () =>{
//    const todos = document.querySelectorAll('.todo__item')
//    todos.forEach(index=>{
//       index.setAttribute('draggable',true);
//       index.setAttribute('ondragstart',"dragstart(event)");
//       index.setAttribute('ondragenter','dragenter(event)');
//       index.setAttribute('ondragend','dragend(event)');
//    })
// }

// isDrag();
let draggedItem;
window.dragstart = function dragstart(event){
   event.dataTransfer.effectAllowed = "copy";
   event.target.className += ' dragged';
   event.dataTransfer.setData('text/html', event.target.id);
   draggedItem = event.target;
}

window.dragenter = function dragenter(event){
   let sourceId = event.dataTransfer.getData('text/html') || draggedItem.id;
   let targetId = event.target.id;
   if(targetId === sourceId){
      return true;
   }
   let sourceNode = document.getElementById(sourceId);
   let targetNode = document.getElementById(targetId);
   let sourceIndex = Array.prototype.indexOf.call(sourceNode.parentNode.childNodes, sourceNode);
   let targetIndex = Array.prototype.indexOf.call(targetNode.parentNode.childNodes, targetNode);
   if(targetIndex > sourceIndex){
      targetNode.parentNode.insertBefore(targetNode, sourceNode);
   } else {
      targetNode.parentNode.insertBefore(sourceNode, targetNode);
   }
}
 window.dragend = function dragend(event){
   event.dataTransfer.dropEffect = "copy"
   event.target.className = event.target.className.replace(' dragged', '');
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//This part is highlighted as I have no idea why 
//list.addEventListener(dragevents) cause errors with HTML, although it works..
//////////////////////////////////////////////////////////////////////////////////////////////////

// list.addEventListener('dragstart', dragstart)
// list.addEventListener('dragenter', dragenter)
// list.addEventListener('dragend',dragend)
list.addEventListener('dragover', (e)=>{ e.preventDefault();}, false);
list.addEventListener('dragleave', (e)=>{ e.preventDefault();}, false);


//eventListeners
// document.addEventListener('DOMContentLoaded', getLocalTodo)
filterBox.addEventListener('click', (e) => todoFilter(e.target));

form.addEventListener('click',(e)=>{
   const target = e.target;
   if(target === createTodo){
      if(todoInput.value.match(/\w+/g) ){
        let todoText = todoInput.value.trim();
         createItem(todoText);
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