//глобальные переменные для музыки на странице меню...
let soundMenu = document.querySelector(".sound_menu");
let btnAudioPlay = document.querySelector(".btn_audio_play");
let imgOnOff = document.querySelectorAll(".img_none");
let imgOn = document.querySelector('.img1');
let imgOff = document.querySelector('.img2');

//глобальные переменные для модалки с рекордами...
let modalOver = document.querySelector(".modal-over");
let modalRec = document.querySelector(".modal-record");
let linkRecord = document.querySelector(".records");
let modals = document.querySelectorAll("modal");

//условие при котором включается или выключаетсся звук мелодии...
btnAudioPlay.addEventListener("click", () => {
    if (soundMenu.paused) {
      soundMenu.play();
      imgOff.classList.remove('img_on');
      imgOn.classList.add("img_on");
    };
    if (soundMenu.play) {
      soundMenu.pause();
      imgOn.classList.remove("img_on");
      imgOff.classList.add("img_on");
    };
});

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
