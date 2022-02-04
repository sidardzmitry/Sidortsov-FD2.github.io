//определяем глобальные переменные...
const body = document.querySelector('body');
const wrap = document.querySelector('.wrap');


//работаем с DOM деревом, добавляем блоки, классы, атрибуты, ссылки...
//создаем аудио файл для проигрывания мелодии в меню...
const soundMenu = document.createElement('audio');
soundMenu.classList.add('soundMenu');
soundMenu.src = '../assets/sound_menu.mp3';
wrap.insertAdjacentElement('beforeend', soundMenu);

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

function createBtnAudioPlay() {
    const btnAudioPlay = document.createElement('button');
    btnAudioPlay.classList.add('btnAudioPlay');
    blockLinks.insertAdjacentElement('beforeend', btnAudioPlay);
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
}
//вызываем функции...
createBtnLinkPlay();
createBtnLinkRec();
createBtnLinkSet();
createBtnAudioPlay();



//условие при котором включается или выключаетсся музыка...




