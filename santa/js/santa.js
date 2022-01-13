//глобальные переменные для музыки на странице меню...
let soundMenu = document.querySelector('.sound_menu');
let btnAudioPlay = document.querySelector('.btn_audio_play');

//условие при котором включается или выключаетсся звук мелодии...
btnAudioPlay.addEventListener("click", () => {
    if (soundMenu.paused) {
      soundMenu.play();
      btnAudioPlay.classList.remove('imageOff');
      btnAudioPlay.classList.add('imageOn');
    } else {
      soundMenu.pause();
      btnAudioPlay.classList.remove('imageOn');
      btnAudioPlay.classList.add('imageOff');
    };
});

//глобальные переменные для модалки с рекордами...
let modalOver = document.querySelector(".modal-over");
let modalRec = document.querySelector(".modal-record");
let linkRecord = document.querySelector(".records");
let modals = document.querySelectorAll("modal");

//делаем небольшую модалку где будет показываться рекорды игроков...
linkRecord.addEventListener("click", (e) => {
    modalRec.classList.add("modal-visible");
    modalOver.classList.add("modal-overlay-visible");
  });
  
  modalOver.addEventListener("click", (e) => {
    //console.log(e.target);
    if (e.target === modalOver) {
      modalRec.classList.remove("modal-visible");
      modalOver.classList.remove("modal-overlay-visible");
    }
  });