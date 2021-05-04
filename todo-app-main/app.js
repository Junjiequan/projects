//selectors
const body = document.body;
const bodyBg = document.querySelector('.bg')
const colorTrigger = document.querySelector('.app__switch');
const createTodo = document.querySelector('.check');
const deleteTodo = document.querySelector('.delete');
const todoInput = document.querySelector('[data-id = "todo-content"]')
const form = document.querySelector('.todo__form')
const list = document.querySelector('.todo__list');
const meme = document.querySelector('.meme');
const bgm = new Audio('songs/omaewa.mp3')
let todoLeft = 0;
const playBGM = ()=>{
   bgm.volume = 0.5;
   bgm.loop = true;
   bgm.autoplay = true;
   bgm.load();
}
//functions
const createItem = ()=>{
   let text = todoInput.value.trim();
   list.insertAdjacentHTML('beforeend',`
   <li class="todo__item" style="transform: scaleY(0); min-height:0; height:0;">
   <div class="check-mark " data-id="check" ></div>
   <input class="active " placholder="created" type="text" aria-label="todo-item" name="todo-item" value="${text}" disabled>
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
   todo.closest('.todo__item').style.transform = "scaleY(0)";
   todo.closest('.todo__item').style.height = "0";
   setTimeout(()=>{
      todo.closest('.todo__item').remove();
   },460)
   todoLeft--;
   updateTodoLeft(todoLeft);
   createMeme(todoLeft);
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
   createMeme();
});
todoInput.addEventListener('keyup',(e)=>{
      if(e.keyCode === 13) createTodo.click();
});
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
});



//some personal stuff
function createMeme(){
   if(todoLeft < 1){
      document.querySelector('.meme__removal').style.height = "13.5rem";
      document.querySelector('.meme__removal').style.margin = "1rem auto 1.5rem";
   } else if(list.querySelectorAll('li').length > 1){
      document.querySelector('.meme__removal').style.height = "0";
      document.querySelector('.meme__removal').style.margin = "0 auto";
   }
}
document.addEventListener('DOMContentLoaded', ()=>{
   playBGM()
})
