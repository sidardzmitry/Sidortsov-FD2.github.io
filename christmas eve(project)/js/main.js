//определяем глобальные переменные...
const body = document.querySelector('body');
const wrap = document.querySelector('.wrap');
const soundMenu = document.querySelector('.sound_menu');

//работаем с DOM деревом, добавляем блоки, классы, атрибуты, ссылки...
//container меню...
const containerMenu = document.createElement('div');
containerMenu.classList.add('containerMenu');
wrap.insertAdjacentElement('beforeend', containerMenu);

//блок с кнопками и ссылками(new game, setting, records)...
const blockLinks = document.createElement('div');
blockLinks.classList.add('blockLinks');
containerMenu.insertAdjacentElement('afterbegin', blockLinks);

//кнопка и ссылка New Game...
function createBtnLinkPlay() {
    const btnLinkPlay = document.createElement('div');
    btnLinkPlay.classList.add('btnLink');
    blockLinks.insertAdjacentElement('afterbegin', btnLinkPlay);
    const linkPlay = document.createElement('a');
    linkPlay.classList.add('link', 'play');
    linkPlay.setAttribute('href', '#');
    linkPlay.setAttribute('target', '_blank');
    linkPlay.textContent = 'New Game';
    btnLinkPlay.appendChild(linkPlay);
};

function createBtnLinkRec() {
    const btnLinkRec = document.createElement('div');
    btnLinkRec.classList.add('btnLink');
    blockLinks.insertAdjacentElement('beforeend', btnLinkRec);
    const linkRec = document.createElement('a');
    linkRec.classList.add('link', 'records');
    linkRec.setAttribute('href', '#');
    linkRec.setAttribute('data-target', 'linkRec');
    linkRec.textContent = 'Records';
    btnLinkRec.appendChild(linkRec);
};

function createBtnLinkSet() {
    const btnLinkSet = document.createElement('div');
    btnLinkSet.classList.add('btnLink');
    blockLinks.insertAdjacentElement('beforeend', btnLinkSet);
    const linkSet = document.createElement('a');
    linkSet.classList.add('link', 'setting');
    linkSet.setAttribute('href', '#');
    linkSet.textContent = 'Setting';
    btnLinkSet.appendChild(linkSet);
};

//условие при котором включается или выключаетсся музыка...
function createBtnAudioPlay() {
    const btnAudioPlay = document.createElement('button');
    btnAudioPlay.classList.add('btnAudioPlay');
    blockLinks.insertAdjacentElement('beforeend', btnAudioPlay);
    btnAudioPlay.addEventListener("click", () => {
    if (soundMenu.paused) {
      soundMenu.play();
      soundMenu.volume = 0.1;
      btnAudioPlay.classList.remove('soundOff');
      btnAudioPlay.classList.add('soundOn');
    } else {
      soundMenu.pause();
      btnAudioPlay.classList.remove('soundOn');
      btnAudioPlay.classList.add('soundOff');
    };
});
};
//вызываем функции...
createBtnLinkPlay();
createBtnLinkRec();
createBtnLinkSet();
createBtnAudioPlay();



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








