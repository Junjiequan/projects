//selectors
const body = document.body;
const bodyBg = document.querySelector('.bg')
const colorTrigger = document.querySelector('.app__switch');
const createTodo = document.querySelector('.check');
const deleteTodo = document.querySelector('.delete');
const todoInput = document.querySelector('[data-id = "todo-content"]')
const form = document.querySelector('.todo__form')
const list = document.querySelector('.todo__list');
let todoLeft = 0;

//functions
const createItem = ()=>{
   let text = todoInput.value.trim();
   list.insertAdjacentHTML('beforeend',`
   <li class="todo__item ">
   <div class="check-mark" data-id="check"></div>
   <input class="active" placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${text}" disabled>
   <div class="delete" data-id="delete"></div>
   </li>
   `)
   todoInput.value = '';
   todoLeft++;
   updateTodoLeft(todoLeft);
}
const deleteItem = (todo)=>{
   todo.closest('.todo__item').remove();
   todoLeft--;
   updateTodoLeft(todoLeft);
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



//eventListeners
form.addEventListener('click',(e)=>{
   const target = e.target;
   if(target === createTodo){
      if(todoInput.value.match(/\w+/g) ){
         createItem();
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
   
});
todoInput.addEventListener('keyup',(e)=>{
      if(e.keyCode === 13) createTodo.click();
})
colorTrigger.addEventListener('click',()=>{
    if(body.classList[0] == 'light'){
        body.classList.remove('light')
        body.classList.add('dark')
        bodyBg.style.backgroundImage = 'url(./images/bg-desktop-dark.jpg)';
     } else{
        body.classList.remove('dark')
        body.classList.add('light')
        bodyBg.style.backgroundImage = 'url(./images/bg-desktop-light.jpg)';
     }
})