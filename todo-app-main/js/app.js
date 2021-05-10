//selectors
const body = document.body;
const bodyBg = document.querySelector('.bg')
const colorTrigger = document.querySelector('.app__switch');
const createTodo = document.querySelector('.check');
const todoInput = document.querySelector('[data-id = "todo-content"]');
const form = document.querySelector('.todo__form');
const list = document.querySelector('.todo__list');
const filterBox = document.querySelector('.todo__bottom');
const dancingMeme = document.querySelector('.meme__removal');
let todoLeft = 0;

//functions
const createItem = (todoText)=>{
   const uniqueId = Math.floor(Math.random() * 100000)
   list.insertAdjacentHTML('beforeend',`
   <li class="todo__item todo__item-hover"  style="transform:scaleY(0); height:0;" id="${uniqueId}" >
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
   setLocalTodo(todoText,'')
}
const deleteItem = (todo)=>{
   const targetTodo = todo.closest('.todo__item')
   const targetTodoText = targetTodo.children[1].value
   targetTodo.classList.remove('todo__item-hover')
   targetTodo.style.transform = "scaleY(0)";
   targetTodo.style.height = "0";
   setTimeout(()=>{
      targetTodo.remove();
   },460)
   if(!targetTodo.classList.contains('checked')){
      todoLeft--;
      updateTodoLeft(todoLeft);
      createMeme(todoLeft);
   }
   deleteLocalTodo(targetTodoText);
} 
function updateTodoLeft(count){
   document.getElementById('amount').innerText = `${count}`;
}

const toggleCheck = (todo)=>{
   if(todo.classList.contains('checked')){
      todoLeft++;
   }
   if(!todo.classList.contains('checked')){
      todoLeft--;
   }
   todo.classList.toggle('checked');
   updateTodoLeft(todoLeft);
   const text = todo.children[1].value;
   const style = todo.classList[2] ? todo.classList[2] : '';
   updateLocalTodo(text,style,null)
}
function filterButtonColor(filterCheck){
   const filter = document.querySelector('.todo__bottom-actions').children
   const filters = [filter[0],filter[1],filter[2]]
   filters.forEach((elem)=>{
      elem.style.color = '';
      if(elem.dataset.id === filterCheck){
         if(elem.dataset.id  === 'all') elem.style.color = "hsl(220, 98%, 61%)";

         if(elem.dataset.id  === 'active'){
            if(body.classList.contains('dark')) elem.style.color = "hsl(236, 33%, 92%)";
            else elem.style.color = "hsl(237, 14%, 26%)";
         }
         if(elem.dataset.id  === 'completed'){
            if(body.classList.contains('dark')) elem.style.color = "hsl(236, 33%, 92%)";
            else elem.style.color = "hsl(237, 14%, 26%)"
         } 
      }
   })
}

const todoFilter = (target) =>{
   const todos = document.querySelectorAll('.todo__item');
   const filterId = target.dataset.id;
   todos.forEach(item =>{
      switch (filterId){
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
               updateTodoLeft(todoLeft);
               createMeme(todoLeft);
               deleteLocalTodo(item.children[1].value)
            }
            break;
      }
   })
}
//localStorage 
function setLocalTodo(data, style){
   let todos ;
   if(localStorage.getItem('todos') === null) todos = [];
   else todos = JSON.parse(localStorage.getItem('todos'))
   
   todos.push([data,style])
   localStorage.setItem('todos',JSON.stringify(todos));
}
const updateLocalTodo = (data,style,target) =>{
   Array.prototype.move = function(from,to){
      this.splice(to, 0, this.splice(from, 1)[0])
   }
   let todos = JSON.parse(localStorage.getItem('todos'))
   todos.forEach((item,index,arrays)=>{
      if(item[0] === data && target !== null){
         arrays.move(index,target)
      };
      if(item[0] === data && target === null){
         item[1] = style;
      }
   })
   localStorage.setItem('todos', JSON.stringify(todos));
}
function getLocalTodo(){
   let todos ;
   if(localStorage.getItem('todos') === null) todos = [];
   else todos = JSON.parse(localStorage.getItem('todos'))
   todos.forEach(data=>{
      const text = data[0];
      const style = data[1];
      const uniqueId = Math.floor(Math.random() * 100000)
      list.insertAdjacentHTML('beforeend',`
      <li class="todo__item todo__item-hover ${style}"  style="transform:scaleY(1); height:6.5rem;" id="${uniqueId}" >
      <button class="check-mark" aria-label="todo-check" data-id="check" ></button>
      <input class="active" placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${text}" disabled>
      <button class="delete" aria-label="todo-delete" data-id="delete"></button>
      </li>
      `)
      todoLeft++;
      updateTodoLeft(todoLeft);
   })
}
function deleteLocalTodo(text){
   let todos ;
   if(localStorage.getItem('todos') === null) todos = [];
   else todos = JSON.parse(localStorage.getItem('todos'))
   todos.forEach((item,index,object)=>{
      if(item[0] === text){
         object.splice(index,1)
         localStorage.setItem('todos', JSON.stringify(todos));
      }
   })
}
/***********************************************************************************************/
/********************dragevents practice.  the code below is fully functioning******************/
/***********************************************************************************************/

// let draggedItem;
// list.addEventListener('dragstart', function dragstart(event){
//    event.preventDefault;
//    event.dataTransfer.effectAllowed = "move";
//    event.target.className += ' dragged';
//    event.dataTransfer.setData('text/html', event.target.id);
//    draggedItem = event.target;
// },false)
// list.addEventListener('dragenter', function dragenter(event){
//    event.preventDefault;
//    let sourceId = event.dataTransfer.getData('text/html') || draggedItem.id;
//    let targetId = event.target.id;
//    if(targetId === sourceId){
//       return true;
//    }
//    let sourceNode = document.getElementById(sourceId);
//    let targetNode = document.getElementById(targetId);
//    let sourceIndex = Array.prototype.indexOf.call(sourceNode.parentNode.childNodes, sourceNode);
//    let targetIndex = Array.prototype.indexOf.call(targetNode.parentNode.childNodes, targetNode);
//    if(targetIndex > sourceIndex){
//       targetNode.parentNode.insertBefore(targetNode, sourceNode);
//    } else {
//       targetNode.parentNode.insertBefore(sourceNode, targetNode);
//    }
// },false)
// list.addEventListener('dragend',  function dragend(event){
//    event.preventDefault;
//    event.dataTransfer.dropEffect = "move"
//    event.target.className = event.target.className.replace(' dragged', '');
//    const target = event.target
//    const todoArrays = Array.from(list.querySelectorAll('.todo__item'))
//    const changedIndex = todoArrays.indexOf(target)
//    const changedTargetText = target.children[1].value
//    const changedTargetStyle = target.classList[1] ? target.classList[1] : '';
//    updateLocalTodo(changedTargetText,changedTargetStyle,changedIndex)
// },false)
// list.addEventListener('dragover', (e)=>{ e.preventDefault();}, false);
// list.addEventListener('dragleave', (e)=>{ e.preventDefault();}, false);
//preventing drag buttons!
// list.addEventListener('mousedown', (e)=>{
//    if(e.target.type === 'submit'){
//      e.target.parentNode.setAttribute('draggable', false)
//      setTimeout(()=>{
//       e.target.parentNode.setAttribute('draggable', true)
//      },300)
//    }
// });

//Tried SortableJS and this is stupidly easy to use-_-!
let sortable = new Sortable(list,{
   onStart:function(e){
      e.item.className += ' dragged';
   },
   onChange:function(e){
      const targetIndex = e.newIndex - 1;
      const itemElText = e.item.children[1].value;
      updateLocalTodo(itemElText,null, targetIndex)
   },
   onEnd:function(e){
      e.item.className.replace(' dragged','');
      e.item.classList.remove('dragged');
   }
});



// meme ignore this
function createMeme(todoLeft){
   if(todoLeft < 1 ){
      dancingMeme.style.height = "13.5rem";
      dancingMeme.style.margin = "1rem auto 1.5rem";
      dancingMeme.classList.remove('meme__hide')
   } else if (todoLeft >= 1) {
      dancingMeme.style.height = "0";
      dancingMeme.style.margin = "0 auto"
      dancingMeme.classList.add('meme__hide')
   }
}

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
   if(target.parentNode.className === 'todo__bottom-actions'){
      if(target.dataset.id === 'all'){
         filterButtonColor(target.dataset.id)
      }
      if(target.dataset.id === 'active'){
         filterButtonColor(target.dataset.id)
      }
      if(target.dataset.id === 'completed'){
         filterButtonColor(target.dataset.id)
      }
   }
});
todoInput.addEventListener('keyup',(e)=>{
      if(e.keyCode === 13) createTodo.click();
});
colorTrigger.addEventListener('click',()=>{
   const img = colorTrigger.children[0];
   const filter = document.querySelector('.todo__bottom-actions').children
   const filters = [filter[0],filter[1],filter[2]]
    if(body.className === 'light'){
      filters.forEach((elem)=>{
         if(elem.style.color == 'rgb(57, 58, 76)') elem.style.color = "hsl(236, 33%, 92%)"
      })
      bodyBg.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";
      body.classList.remove('light');
      body.classList.add('dark');
      img.src="./images/icon-sun.svg";
      localStorage.setItem('theme', 'dark');
     } else if(body.className === 'dark'){
      filters.forEach((elem)=>{
         if(elem.style.color == 'rgb(228, 229, 241)') elem.style.color = "hsl(237, 14%, 26%)"
      })
      bodyBg.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";
      body.classList.remove('dark');
      body.classList.add('light');
      img.src="./images/icon-moon.svg";
      localStorage.setItem('theme', 'light');
     }
});
document.addEventListener('DOMContentLoaded', ()=>{
   getLocalTodo();
   document.querySelector('.todo__bottom-actions--all').style.color = "hsl(220, 98%, 61%)"
   const img = colorTrigger.children[0];
   const checkStyle = localStorage.getItem('theme')? localStorage.getItem('theme') : 'dark';
   body.className = `${checkStyle}`
   if(checkStyle === 'dark'){
      bodyBg.style.backgroundImage = 'url(./images/bg-desktop-dark.jpg)';
      img.src="./images/icon-sun.svg"
   }else{
      bodyBg.style.backgroundImage = 'url(./images/bg-desktop-light.jpg)';
      img.src="./images/icon-moon.svg"
   }
   
   todoLeft = Array.from(list.children).length - 1;
   list.querySelectorAll('.todo__item').forEach(index=>{
      if(index.classList.contains('checked')){
         todoLeft --;
      }
   }) 
   updateTodoLeft(todoLeft);
   createMeme(todoLeft);
})

