const body = document.body;
const bodyBg = document.querySelector('.bg')
const colorTrigger = document.querySelector('.app__switch');
const createTodo = document.querySelector('.check');
const deleteTodo = document.querySelector('.delete')
const list = document.querySelector('.todo__list');
const item = list.querySelector('.todo__item');
const todoText = document.querySelector('[data-id = "todo-content"]')

const createItem = (todo)=>{
   list.insertAdjacentHTML('beforeend',`
   <li class="todo__item ">
   <div class="check-mark" data-id="check"></div>
   <input class="active" placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${todo}">
   <div class="delete" data-id="delete"></div>
   </li>
   `)
}
const deleteItem = (todo)=>{
   todo.closest('.todo__item').remove();
}






const dragEnter = (e) =>{
   console.log(this);
}
  



createTodo.addEventListener('click',()=>{
   if(todoText.value.match(/\w+/g) ){
      let text = todoText.value.trim();
      createItem(text);
      todoText.value = '';
   }
});
list.addEventListener('click', (e)=>{
      const target = e.target;
      if(target.dataset.id === 'delete'){
         deleteItem(target);
      }
      if(target.dataset.id === 'check'){

      }
      
})

colorTrigger.addEventListener('click',()=>{
   const bgDesktop1 = 'url(./images/bg-desktop-dark.jpg)';
   const bgDesktop2 = 'url(./images/bg-desktop-light.jpg)';
    if(body.classList[0] == 'light'){
        body.classList.remove('light')
        body.classList.add('dark')
        bodyBg.style.backgroundImage = bgDesktop1;
     } else{
        body.classList.remove('dark')
        body.classList.add('light')
        bodyBg.style.backgroundImage = bgDesktop2;
     }
})