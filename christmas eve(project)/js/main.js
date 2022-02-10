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

const btnLinkSet = document.createElement("button");
btnLinkSet.classList.add("btnLink", "setting");
blockLinks.insertAdjacentElement("beforeend", btnLinkSet);
btnLinkSet.textContent = "Setting";

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
btnLinkRec.addEventListener("click", (e) => {
  modalRecord.classList.add("modal_visible");
  modalOver.classList.add("modal_overlay_visible");
});

modalOver.addEventListener("click", (e) => {
  //console.log(e.target);
  if (e.target === modalOver) {
    modalRecord.classList.remove("modal_visible");
    modalOver.classList.remove("modal_overlay_visible");
  }
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
  ctxSnow.fillStyle = "#FFFFE5";
  ctxSnow.font = "110px sunshiney";
  ctxSnow.fillText(
    "Christma’s Eve",
    canvasSnow.width / 2 + 50,
    canvasSnow.height / 2 + 230
  );
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
export { btnLinkPlay, containerMenu, canvasSnow };

// let canvas = document.querySelector('#myCanvas');
// let ctx = canvas.getContext('2d');
// let score = 0;
// let ghostScore = 0;
// let ghost = false;
// let ghost2 = false;
// let countblink = 10;
// let keyclick = {};
// let gamePaused = false;

// let mainImage;
// let audio;
// let win;
// let lose;

// btnLinkPlay.addEventListener('click', startGame);
// // retry.addEventListener('click', playAgain);
// // quit.addEventListener('click', quitGame);

// document.addEventListener('keydown', function(event){
//   keyclick[event.keyCode] = true;
//   move(keyclick);
// }, false);

// document.addEventListener('keyup', function(event){
//   delete keyclick[event.keyCode];
// }, false);

// let player = {
//   x: 50,
//   y: 100,
//   pacMouth: 320,
//   pacDir: 0,
//   pSize: 32,
//   speed: 11
// }

// let enemy = {
//   x: 150,
//   y: 200,
//   dirx: 0,
//   diry: 0,
//   speed: 5,
//   moving: 0,
//   flash: 0,
//   ghosteat: false
// }

// let enemy2 = {
//   x: 150,
//   y: 200,
//   dirx: 0,
//   diry: 0,
//   speed: 5,
//   moving: 0,
//   flash: 0,
//   ghosteat: false
// }

// let pill = {
//   x: 10,
//   y: 10,
//   powerup: false,
//   pcountdown: 0,
//   ghostNum: 0,
//   ghostNum2: 0
// }

// function move(keyclick) {
//   if (37 in keyclick) {
//     player.x -= player.speed;
//     player.pacDir = 64;
//   }
//   if (38 in keyclick) {
//     player.y -= player.speed;
//     player.pacDir = 96;
//   }
//   if (39 in keyclick) {
//     player.x += player.speed;
//     player.pacDir = 0;
//   }
//   if (40 in keyclick) {
//     player.y += player.speed;
//     player.pacDir = 32;
//   }

//    if (13 in keyclick) {
//     pauseGame();
//   }

//   if (player.x >= (canvas.width - 48)) {
//     player.x = canvas.width - 48;
//   }
//   if (player.y >= (canvas.height - 48)) {
//     player.y = canvas.height - 48;
//   }
//   if (player.x < 0) {
//     player.x = 0;
//   }
//   if (player.y < 0) {
//     player.y = 0;
//   }
//   if (player.pacMouth == 320) {
//     player.pacMouth = 352;
//   }else{player.pacMouth = 320;}

//   render();
// };

// function startGame() {
//   containerMenu.style.display = 'none';
//   canvasSnow.style.display = 'none';
//   canvas.style.display = 'block';
//   mainImage = new Image();
//   mainImage.ready = false;
//   mainImage.onload = checkReady;
//   mainImage.src = '../img/pac.png';

//   // audio = new Audio();
//   // audio.src = "../img/oforia.mp3";
//   // audio.volume = 0.1;
//   // audio.loop = 1;
//   // audio.play();
//   // win = new Audio();
//   // win.src = "../img/wohoo.wav";
//   // win.volume = 0.3;
//   // lose = new Audio();
//   // lose.src = "../img/doh.wav";
//   // lose.volume = 0.3;
// };

// //функция для повторной игры...
// function playAgain() {
//   retry.style.display = "none";
//   quit.style.display = "none";
//   footer.style.display = "none";
//   player.speed = 11;
//   score = 0;
//   ghostScore = 0;
// }

// //функция для паузы в игре...
// function pauseGame () {
//   if (!gamePaused) {
//       player.speed = 0;
//       enemy.speed = 0;
//       enemy2.speed = 0;
//       canvas.style.opacity = "0.8";
//       paused.style.display = "block";
//       gamePaused = true;
//     } else if (gamePaused) {
//       player.speed = 10;
//       enemy.speed = myNum(5)-1;
//       enemy2.speed = myNum(5)-1;
//       canvas.style.opacity = "1";
//       paused.style.display = "none";
//       gamePaused = false;
//     }
// }

// //функция для прекращения игры...
// function quitGame () {
//   audio.pause();
//   // mainImage.src = "";
//   intro.style.display = "block";
//   footer.style.display = "block";
//   canvas.style.display = "none";
//   retry.style.display = "none";
//   quit.style.display = "none";
//   score = 0;
//   ghostScore = 0;
// }

// //проверяем готовность...
// function checkReady() {
//   this.ready = true;
//   playGame();
// }

// //запускаем функции для игры отрисовки игры...
// function playGame() {
//   render();
//   requestAnimationFrame(playGame);
// }

// function myNum(n) {
//   return Math.floor(Math.random() * n);
// }

// //рендерим всю игру (поле и игроков)...
// function render() {
//   ctx.fillStyle = "black";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   if (!pill.powerup && pill.pcountdown < 5) {
//     pill.x = myNum(600)+30;
//     pill.y = myNum(550);
//     pill.powerup = true;
//   }

//   if (!ghost) {
//       enemy.ghostNum =  myNum(5) * 64;
//       enemy.x = myNum(750);
//       enemy.y = myNum(250) +30;
//       ghost = true;
//   }

//   if (!ghost2) {
//       enemy2.ghostNum =  myNum(5) * 64;
//       enemy2.x = myNum(750);
//       enemy2.y = myNum(250) +30;
//       ghost2 = true;
//   }

//   if (enemy.moving < 0) {
//   enemy.moving = (myNum(20) * 3)+10 + myNum(2);
//   // enemy.speed = myNum(5);
//   enemy.dirx = 0;
//   enemy.diry = 0;
//   if (pill.ghosteat) {
//     enemy.speed = enemy.speed *-1;
//   }
//   if (enemy.moving % 2) {
//     if (player.x < enemy.x) {
//       enemy.dirx = -enemy.speed;
//     }else{
//       enemy.dirx = enemy.speed;
//     }
//   }else{
//     if (player.y < enemy.y) {
//       enemy.diry = -enemy.speed;
//     }else{
//       enemy.diry = enemy.speed;
//   }
// }
// }

//   enemy.moving--;
//   enemy.x = enemy.x + enemy.dirx;
//   enemy.y = enemy.y + enemy.diry;

//   if (enemy.x >= (canvas.width - 32)) {
//     enemy.x = 0;
//   }
//   if (enemy.y >= (canvas.height - 32)) {
//     enemy.y = 0;
//   }
//   if (enemy.x < 0) {
//     enemy.x = canvas.width - 32;
//   }
//   if (enemy.y < 0) {
//     enemy.y = canvas.height - 32;
//   }

//   if (enemy2.moving < 0) {
//   enemy2.moving = (myNum(20) * 3)+10 + myNum(2);
//   // enemy2.speed = myNum(5);
//   enemy2.dirx = 0;
//   enemy2.diry = 0;
//   if (pill.ghosteat) {
//     enemy2.speed = enemy2.speed *-1;
//   }
//   if (enemy2.moving % 2) {
//     if (player.x < enemy2.x) {
//       enemy2.dirx = -enemy2.speed;
//     }else{
//       enemy2.dirx = enemy2.speed;
//     }
//   }else{
//     if (player.y < enemy2.y) {
//       enemy2.diry = -enemy2.speed;
//     }else{
//       enemy2.diry = enemy2.speed;
//   }
// }
// }

//   enemy2.moving--;
//   enemy2.x = enemy2.x + enemy2.dirx;
//   enemy2.y = enemy2.y + enemy2.diry;

//   if (enemy2.x >= (canvas.width - 32)) {
//     enemy2.x = 0;
//   }
//   if (enemy2.y >= (canvas.height - 32)) {
//     enemy2.y = 0;
//   }
//   if (enemy2.x < 0) {
//     enemy2.x = canvas.width - 32;
//   }
//   if (enemy2.y < 0) {
//     enemy2.y = canvas.height - 32;
//   }
//   //Collision detection ghost

//   if (player.x <= (enemy.x+26) && enemy.x <=(player.x+26) && player.y <= (enemy.y+26) && enemy.y <=(player.y+32) ) {
//     if (enemy.ghosteat) {
//       score++;
//       win.play();
//     }else {
//       ghostScore++;
//       // lose.play();
//     }
//     player.x = 10;
//     player.y = 100;
//     enemy.x = 600;
//     enemy.y = 400;
//     pill.pcountdown = 0;
//   }

//   if (player.x <= (enemy2.x+26) && enemy2.x <=(player.x+26) && player.y <= (enemy2.y+26) && enemy2.y <=(player.y+32) ) {
//     if (enemy2.ghosteat) {
//       score++;
//       win.play();
//     }else {
//       ghostScore++;
//       // lose.play();
//     }
//     player.x = 10;
//     player.y = 100;
//     enemy2.x = 600;
//     enemy2.y = 400;
//     pill.pcountdown = 0;
//   }
//   //Collision detection pill

//   if (player.x <= pill.x && pill.x <=(player.x+32) && player.y <= pill.y && pill.y <=(player.y+32) ) {
//       pill.powerup = false;
//       pill.pcountdown = 500;
//       pill.ghostNum = enemy.ghostNum;
//       pill.ghostNum2 = enemy2.ghostNum;
//       enemy.ghostNum = 384;
//       enemy2.ghostNum = 384;
//       pill.x = 0;
//       pill.y = 0;
//       enemy.ghosteat = true;
//       enemy2.ghosteat = true;
//   }

//   if (enemy.ghosteat) {
//     pill.pcountdown--;
//     if (pill.pcountdown <= 0) {
//       enemy.ghosteat = false;
//       enemy.ghostNum = pill.ghostNum;
//     }
//   }

//   if (enemy2.ghosteat) {
//     pill.pcountdown--;
//     if (pill.pcountdown <= 0) {
//       enemy2.ghosteat = false;
//       enemy2.ghostNum = pill.ghostNum;
//     }
//   }

//   if (pill.powerup) {
//     ctx.fillStyle = "tomato";
//     ctx.beginPath();
//     ctx.arc(pill.x,pill.y, 12, 0, Math.PI * 2, true);
//     ctx.closePath();
//     ctx.fill();
//   }

//   if (enemy.flash == 0) {
//     enemy.flash = 32;
//     enemy2.flash = 32;
//   }else {
//     enemy.flash = 0;
//     enemy2.flash = 0;
//   }

//   if (countblink>10) {
//     countblink--;
//   }else{
//     countblink = 10;
//   }

//   if (score == 5) {
//     ctx.font = "100px Verdana";
//     ctx.fillStyle = "green";
//     ctx.fillText(`YOU WIN`, 150, 350);
//     enemy.x = 750;
//     enemy.y = 100;
//     enemy2.x = 750;
//     enemy2.y = 500;
//     player.speed = 0;
//     retry.style.display = "block";
//     quit.style.display = "block";
//     footer.style.display = "none";
//   }
//   if (ghostScore == 5) {
//     ctx.font = "100px Verdana";
//     ctx.fillStyle = "red";
//     ctx.fillText(`YOU LOSE`, 150, 350);
//     enemy.x = 750;
//     enemy.y = 100;
//     enemy2.x = 750;
//     enemy2.y = 500;
//     player.speed = 0;
//     retry.style.display = "block";
//     quit.style.display = "block";
//     footer.style.display = "none";
//   }

//   ctx.font = "20px Verdana";
//   ctx.fillStyle = "green";
//   ctx.fillText(`Pacman ${score} : ${ghostScore} Ghost`, 2, 18);

//   ctx.font = "20px Verdana";
//   let gradient = ctx.createLinearGradient(435, 18, 800, 18);
//   gradient.addColorStop(0, "rgb(255, 0, 0)");
//   gradient.addColorStop(1, "rgb(255, 255, 0)");
//   ctx.fillStyle = gradient;
//   ctx.fillText(`My Name`,435, 18);

//   ctx.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 50, 50);
//   ctx.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 50, 50);
//   ctx.drawImage(mainImage, player.pacMouth, player.pacDir, 32, 32, player.x, player.y, 50, 50);
// };
