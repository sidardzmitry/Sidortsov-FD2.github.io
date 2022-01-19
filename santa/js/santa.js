//глобальные переменные для музыки на странице меню...
let soundMenu = document.querySelector('.sound_menu');
let btnAudioPlay = document.querySelector('.btn_audio_play');
let newGame = document.querySelector('.play');

//условие при котором включается или выключаетсся музыка...
btnAudioPlay.addEventListener("click", () => {
    if (soundMenu.paused) {
      soundMenu.play();
      btnAudioPlay.classList.remove('soundOff');
      btnAudioPlay.classList.add('soundOn');
    } else {
      soundMenu.pause();
      btnAudioPlay.classList.remove('soundOn');
      btnAudioPlay.classList.add('soundOff');
    };
});

//выключаем музыку при переходе на другую страницу...
newGame.addEventListener('click', () => {
  if(newGame) {
    soundMenu.pause();
  };
});

//глобальные переменные для модалки с рекордами...
let modalOver = document.querySelector('.modal_over');
let modalRecord = document.querySelector('.modal_record');
let linkRecord = document.querySelector('.records');
let modals = document.querySelectorAll('.modal');

//делаем небольшую модалку где будет показываться рекорды игроков...
linkRecord.addEventListener('click', (e) => {
    modalRecord.classList.add('modal_visible');
    modalOver.classList.add('modal_overlay_visible');
  });
  
  modalOver.addEventListener('click', (e) => {
    //console.log(e.target);
    if (e.target === modalOver) {
      modalRecord.classList.remove('modal_visible');
      modalOver.classList.remove('modal_overlay_visible');
    }
  });