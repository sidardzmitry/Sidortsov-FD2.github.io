//определяем глобальные переменные...
const body = document.querySelector('body');
const wrap = document.querySelector('.wrap');
const soundMenu = document.querySelector('.sound_menu');

let inGame = false;// default not in game false
let inMenu = true;// default in the menu

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
  const btnLinkPlay = document.createElement('button');
  btnLinkPlay.classList.add('btnLink', 'play');
  blockLinks.insertAdjacentElement('afterbegin', btnLinkPlay);
  btnLinkPlay.textContent = 'New Game';

  const btnLinkRec = document.createElement('button');
  btnLinkRec.classList.add('btnLink', 'records');
  blockLinks.insertAdjacentElement('beforeend', btnLinkRec);
  btnLinkRec.textContent = 'Records';

  const btnLinkSet = document.createElement('button');
  btnLinkSet.classList.add('btnLink', 'setting');
  blockLinks.insertAdjacentElement('beforeend', btnLinkSet);
  btnLinkSet.textContent = 'Setting';

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
createBtnAudioPlay();

//глобальные переменные для модалки с рекордами...
let modalOver = document.querySelector('.modal_over');
let modalRecord = document.querySelector('.modal_record');
let modals = document.querySelectorAll('.modal');

//делаем небольшую модалку где будет показываться рекорды игроков...
btnLinkRec.addEventListener('click', (e) => {
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

// window.onload = function () {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  //размеры canvas...
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  //снежинки...
  const maxNumSnowflakes = 150; //max кол-во снежинок...
  const arrParticles = [];
  for (let i = 0; i < maxNumSnowflakes; i++) {
    arrParticles.push({
      x: Math.random() * width, //x-координаты...
      y: Math.random() * height, //y-координаты...
      r: Math.random() * 6 + 1, //радиус...
      d: Math.random() * maxNumSnowflakes, //плотность...
    });
  };

  //рисуем хлопья...
  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.beginPath();
    for (let i = 0; i < maxNumSnowflakes; i++) {
      let smallParticles = arrParticles[i];
      ctx.moveTo(smallParticles.x, smallParticles.y);
      ctx.arc(smallParticles.x,smallParticles.y,smallParticles.r,0,Math.PI * 2,true);
    };
    ctx.fill();
    update();
    drawName();
  };

  //функция отрисовываем название игры...
  function drawName() {
    ctx.fillStyle = "#FFFFE5";
    ctx.font = "110px sunshiney";
    ctx.fillText("Christma’s Eve",canvas.width / 2 + 50,canvas.height / 2 + 230);
  };
  drawName();
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
      smallParticles.y += Math.cos(angle + smallParticles.d) + 1 + smallParticles.r / 2;
      smallParticles.x += Math.sin(angle) * 2;

      //Отправляем хлопья обратно сверху, когда он выходит...
      //Давайте сделаем это немного более органичным и позволим хлопьям входить слева и справа также...
      if (
        smallParticles.x > width + 5 ||
        smallParticles.x < -5 ||
        smallParticles.y > height
      ) {
        if (i % 3 > 0) {
          //66,67% хлопьев...
          arrParticles[i] = {
            x: Math.random() * width,
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
              y: Math.random() * height,
              r: smallParticles.r,
              d: smallParticles.d,
            };
          } else {
            //Вход справа...
            arrParticles[i] = {
              x: width + 5,
              y: Math.random() * height,
              r: smallParticles.r,
              d: smallParticles.d,
            };
          };
        };
      };
    };
  };

  //цикл анимации...
  setInterval(draw, 25);
// };

  let score = 0;
  let ghostScore = 0;
  let ghost = false;
  let ghost2 = false;
  let countblink = 10;
  let keyclick = {};
  let gamePaused = false;

  let mainImage;
  let audio;
  let win;
  let lose;

  btnLinkPlay.addEventListener('click', startGame);
  // retry.addEventListener('click', playAgain);
  // quit.addEventListener('click', quitGame);

  document.addEventListener('keydown', function(event){
    keyclick[event.keyCode] = true;
    move(keyclick);
  }, false);
  
  document.addEventListener('keyup', function(event){
    delete keyclick[event.keyCode];
  }, false);
  
  let player = {
    x: 50,
    y: 100,
    pacMouth: 320,
    pacDir: 0,
    pSize: 32,
    speed: 11
  }
  
  let enemy = {
    x: 150,
    y: 200,
    dirx: 0,
    diry: 0,
    speed: 5,
    moving: 0,
    flash: 0,
    ghosteat: false
  }
  
  let enemy2 = {
    x: 150,
    y: 200,
    dirx: 0,
    diry: 0,
    speed: 5,
    moving: 0,
    flash: 0,
    ghosteat: false
  }
  
  let pill = {
    x: 10,
    y: 10,
    powerup: false,
    pcountdown: 0,
    ghostNum: 0,
    ghostNum2: 0
  }
  
  function move(keyclick) {
    if (37 in keyclick) {
      player.x -= player.speed;
      player.pacDir = 64;
    }
    if (38 in keyclick) {
      player.y -= player.speed;
      player.pacDir = 96;
    }
    if (39 in keyclick) {
      player.x += player.speed;
      player.pacDir = 0;
    }
    if (40 in keyclick) {
      player.y += player.speed;
      player.pacDir = 32;
    }
  
     if (13 in keyclick) {
      pauseGame();
    }
  
    if (player.x >= (canvas.width - 48)) {
      player.x = canvas.width - 48;
    }
    if (player.y >= (canvas.height - 48)) {
      player.y = canvas.height - 48;
    }
    if (player.x < 0) {
      player.x = 0;
    }
    if (player.y < 0) {
      player.y = 0;
    }
    if (player.pacMouth == 320) {
      player.pacMouth = 352;
    }else{player.pacMouth = 320;}
  
    render();
  }

  function startGame() {
    containerMenu.style.display = 'none';
  }






