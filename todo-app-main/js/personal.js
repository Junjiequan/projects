
//some personal stuff
const bgm = new Audio('songs/omaewa.mp3')

const playBGM = ()=>{
   bgm.volume = 0.5;
   bgm.loop = true;
   bgm.autoplay = true;
   bgm.load();
   bgm.pause();
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

document.addEventListener('DOMContentLoaded', () => {
   playBGM();
})
document.querySelector('.volume').addEventListener('click', (e) => isVolume(e.target))


