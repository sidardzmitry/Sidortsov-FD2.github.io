'use strict';
//определяем глобальные переменные...
const body = document.querySelector("body");
const wrap = document.querySelector(".wrap");
const soundMenu = document.querySelector(".sound_menu");

let inGame = false; // default not in game false
let inMenu = true; // default in the menu

//работаем с DOM деревом, добавляем блоки, классы, атрибуты, ссылки...
//container меню...
const containerMenu = document.createElement("div");
containerMenu.classList.add("containerMenu");
wrap.insertAdjacentElement("beforeend", containerMenu);

//блок с кнопками и ссылками(new game, setting, records)...
const blockLinks = document.createElement("div");
blockLinks.classList.add("blockLinks");
containerMenu.insertAdjacentElement("afterbegin", blockLinks);

//кнопка и ссылка New Game...
const btnLinkPlay = document.createElement("button");
btnLinkPlay.classList.add("btnLink", "play");
blockLinks.insertAdjacentElement("afterbegin", btnLinkPlay);
btnLinkPlay.textContent = "New Game";

const btnLinkRec = document.createElement("button");
btnLinkRec.classList.add("btnLink", "records");
blockLinks.insertAdjacentElement("beforeend", btnLinkRec);
btnLinkRec.textContent = "Records";

const btnLinkRul = document.createElement("button");
btnLinkRul.classList.add("btnLink", "rules");
blockLinks.insertAdjacentElement("beforeend", btnLinkRul);
btnLinkRul.textContent = "Rules";

//условие при котором включается или выключаетсся музыка...
function createBtnAudioPlay() {
  const btnAudioPlay = document.createElement("button");
  btnAudioPlay.classList.add("btnAudioPlay");
  blockLinks.insertAdjacentElement("beforeend", btnAudioPlay);
  btnAudioPlay.addEventListener("click", () => {
    if (soundMenu.paused) {
      soundMenu.play();
      soundMenu.volume = 0.1;
      btnAudioPlay.classList.remove("soundOff");
      btnAudioPlay.classList.add("soundOn");
    } else {
      soundMenu.pause();
      btnAudioPlay.classList.remove("soundOn");
      btnAudioPlay.classList.add("soundOff");
    }
  });
}
//вызываем функции...
createBtnAudioPlay();

//глобальные переменные для модалки с рекордами...
let modalOver = document.querySelector(".modal_over");
let modalRecord = document.querySelector(".modal_record");
let modals = document.querySelectorAll(".modal");

//делаем небольшую модалку где будет показываться рекорды игроков...
// let tableRecords = document.querySelector('.table_records');
let blockRules = document.querySelector('.blockRules');

btnLinkRec.addEventListener("click", (e) => {
  modalRecord.classList.add("modal_visible");
  modalOver.classList.add("modal_overlay_visible");
  // tableRecords.style.display = 'block';
  blockRules.style.display = 'none';
});

modalOver.addEventListener("click", (e) => {
  //console.log(e.target);
  if (e.target === modalOver) {
    modalRecord.classList.remove("modal_visible");
    modalOver.classList.remove("modal_overlay_visible");
  }
});

btnLinkRul.addEventListener('click', (e) => {
  modalRecord.classList.add("modal_visible");
  modalOver.classList.add("modal_overlay_visible");
  // tableRecords.style.display = 'none';
  blockRules.style.display = 'block';
});

// window.onload = function () {
let canvasSnow = document.querySelector(".canvas");
let ctxSnow = canvasSnow.getContext("2d");
//размеры canvas...
canvasSnow.width = window.innerWidth;
canvasSnow.height = window.innerHeight;

//снежинки...
const maxNumSnowflakes = 150; //max кол-во снежинок...
const arrParticles = [];
for (let i = 0; i < maxNumSnowflakes; i++) {
  arrParticles.push({
    x: Math.random() * canvasSnow.width, //x-координаты...
    y: Math.random() * canvasSnow.height, //y-координаты...
    r: Math.random() * 6 + 1, //радиус...
    d: Math.random() * maxNumSnowflakes, //плотность...
  });
}

//рисуем хлопья...
function draw() {
  ctxSnow.clearRect(0, 0, canvasSnow.width, canvasSnow.height);

  ctxSnow.fillStyle = "rgb(255, 255, 255)";
  ctxSnow.beginPath();
  for (let i = 0; i < maxNumSnowflakes; i++) {
    let smallParticles = arrParticles[i];
    ctxSnow.moveTo(smallParticles.x, smallParticles.y);
    ctxSnow.arc(
      smallParticles.x,
      smallParticles.y,
      smallParticles.r,
      0,
      Math.PI * 2,
      true
    );
  }
  ctxSnow.fill();
  update();
  drawName();
}

//функция отрисовываем название игры...
function drawName() {
  ctxSnow.fillStyle = "rgb(252,246,214)";
  ctxSnow.font = "80px sunshiney";
  ctxSnow.fillText(
    "Christmas Pacman",
    canvasSnow.width / 2 + 100,
    canvasSnow.height / 2 + 235
  );
};

//функция перемещения снежинок...
//угол будет постоянным инкрементным флагом. К нему будут применены функции Sin и Cos для создания вертикального и горизонтального движения хлопьев...
let angle = 0;
function update() {
  angle += 0.01;
  for (let i = 0; i < maxNumSnowflakes; i++) {
    let smallParticles = arrParticles[i];
    //Обновляем координаты X и Y...
    //Мы добавим 1 к функции cos, чтобы предотвратить отрицательные значения, которые заставят хлопья двигаться вверх...
    //Каждая частица имеет свою собственную плотность, которую можно использовать, чтобы сделать движение вниз различным для каждого хлопья...
    //Давайте сделаем его более случайным, добавив радиус...
    smallParticles.y +=
      Math.cos(angle + smallParticles.d) + 1 + smallParticles.r / 2;
    smallParticles.x += Math.sin(angle) * 2;

    //Отправляем хлопья обратно сверху, когда он выходит...
    //Давайте сделаем это немного более органичным и позволим хлопьям входить слева и справа также...
    if (
      smallParticles.x > canvasSnow.width + 5 ||
      smallParticles.x < -5 ||
      smallParticles.y > canvasSnow.height
    ) {
      if (i % 3 > 0) {
        //66,67% хлопьев...
        arrParticles[i] = {
          x: Math.random() * canvasSnow.width,
          y: -10,
          r: smallParticles.r,
          d: smallParticles.d,
        };
      } else {
        //Если отщеп выходит справа...
        if (Math.sin(angle) > 0) {
          //Вход слева...
          arrParticles[i] = {
            x: -5,
            y: Math.random() * canvasSnow.height,
            r: smallParticles.r,
            d: smallParticles.d,
          };
        } else {
          //Вход справа...
          arrParticles[i] = {
            x: canvasSnow.width + 5,
            y: Math.random() * canvasSnow.height,
            r: smallParticles.r,
            d: smallParticles.d,
          };
        }
      }
    }
  }
}

//цикл анимации...
setInterval(draw, 25);
// };

//событие на закрытие окна брайзера...
window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = 'Возможно внесенные изменения не сохранятся!';
});

//экспортируем в другой файл...
export { btnLinkPlay, containerMenu, canvasSnow, soundMenu, wrap, btnLinkRec, btnLinkRul };

