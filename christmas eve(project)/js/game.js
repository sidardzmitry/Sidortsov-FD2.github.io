import { btnLinkPlay, containerMenu, canvasSnow, soundMenu, wrap, } from "./main.js";


let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let ghostScore = 0;
let ghost = false;
let ghost2 = false;
let countblink = 10;
let keyclick = {};
let gamePaused = false;

let mainImage = undefined;
let audio = document.querySelector('.oforia');
let win = document.querySelector('.wohoo');
let lose = document.querySelector('.doh');

let imgBackground = document.querySelector('.imgBackground');
let imgNew = document.querySelector('.imgNew');


//создаем две кнопки для обновления игры и выхода...
let blockBtn = document.createElement('div');
blockBtn.classList.add('blockBtn');
wrap.insertAdjacentElement('beforeend',blockBtn);

let retry = document.createElement('button');
retry.classList.add("btnLink", 'retry');
retry.textContent = 'Try Again?';
retry.setAttribute('type', 'button');
blockBtn.insertAdjacentElement('afterbegin', retry);

let quit = document.createElement('button');
quit.classList.add("btnLink", 'quit');
quit.textContent = 'Quit?';
quit.setAttribute('type', 'button');
blockBtn.insertAdjacentElement('beforeend', quit);





btnLinkPlay.addEventListener("click", startGame);
retry.addEventListener('click', playAgain);
quit.addEventListener('click', quitGame);

document.addEventListener(
  "keydown",
  function (event) {
    keyclick[event.keyCode] = true;
    move(keyclick);
  },
  false
);

document.addEventListener(
  "keyup",
  function (event) {
    delete keyclick[event.keyCode];
  },
  false
);

let player = {
  x: 50,
  y: 100,
  pacMouth: 320,
  pacDir: 0,
  pSize: 32,
  speed: 15,
};

let enemy = {
  x: 150,
  y: 200,
  dirx: 0,
  diry: 0,
  speed: 3,
  moving: 0,
  flash: 0,
  ghosteat: false,
};

let enemy2 = {
  x: 150,
  y: 200,
  dirx: 0,
  diry: 0,
  speed: 3,
  moving: 0,
  flash: 0,
  ghosteat: false,
};

let pill = {
  x: 10,
  y: 10,
  powerup: false,
  pcountdown: 0,
  ghostNum: 0,
  ghostNum2: 0,
};

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

  if (player.x >= canvas.width - 48) {
    player.x = canvas.width - 48;
  }
  if (player.y >= canvas.height - 48) {
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
  } else {
    player.pacMouth = 320;
  }

  render();
}

function startGame() {
  containerMenu.style.display = "none";
  imgBackground.style.display = 'none';
  imgNew.style.display = 'block';
  canvas.style.display = "block";
  soundMenu.pause();//выключаем музыку из меню...
  mainImage = new Image();
  mainImage.ready = false;
  mainImage.onload = checkReady;
  mainImage.src = "img/pacman5.png";

  // audio = new Audio();
  // audio.src = "img/oforia.mp3";
  // audio.volume = 0.1;
  // audio.loop = 1;
  // audio.play();
  // win = new Audio();
  // win.src = "img/wohoo.wav";
  // win.volume = 0.3;
  // lose = new Audio();
  // lose.src = "img/doh.wav";
  // lose.volume = 0.3;
}

//функция для повторной игры...
function playAgain() {
  blockBtn.style.display = "none";
  player.speed = 11;
  score = 0;
  ghostScore = 0;
}

//функция для паузы в игре...
function pauseGame() {
  if (!gamePaused) {
    player.speed = 0;
    enemy.speed = 0;
    enemy2.speed = 0;
    canvas.style.opacity = "0.8";
    paused.style.display = "block";
    gamePaused = true;
  } else if (gamePaused) {
    player.speed = 10;
    enemy.speed = myNum(5) - 1;
    enemy2.speed = myNum(5) - 1;
    canvas.style.opacity = "1";
    paused.style.display = "none";
    gamePaused = false;
  }
}

//функция для прекращения игры...
function quitGame() {
  audio.pause();
  mainImage.src = "";
  canvasSnow.style.display = "block";
  containerMenu.style.display = 'block';
  canvas.style.display = "none";
  blockBtn.style.display = "none";
  imgBackground.style.display = 'block';
  imgNew.style.display = 'none';
  score = 0;
  ghostScore = 0;
}

//проверяем готовность...
function checkReady() {
  this.ready = true;
  playGame();
}

//запускаем функции для игры отрисовки игры...
function playGame() {
  render();
  requestAnimationFrame(playGame);
}

function myNum(n) {
  return Math.floor(Math.random() * n);
}

//рендерим всю игру (поле и игроков)...
function render() {
  ctx.fillStyle = "rgb(3,38,81)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  if (!pill.powerup && pill.pcountdown < 5) {
    pill.x = myNum(600) + 30;
    pill.y = myNum(550);
    pill.powerup = true;
  }

  if (!ghost) {
    enemy.ghostNum = myNum(5) * 64;
    enemy.x = myNum(750);
    enemy.y = myNum(250) + 30;
    ghost = true;
  }

  if (!ghost2) {
    enemy2.ghostNum = myNum(5) * 64;
    enemy2.x = myNum(750);
    enemy2.y = myNum(250) + 30;
    ghost2 = true;
  }

  if (enemy.moving < 0) {
    enemy.moving = myNum(20) * 3 + 10 + myNum(2);
    // enemy.speed = myNum(5);
    enemy.dirx = 0;
    enemy.diry = 0;
    if (pill.ghosteat) {
      enemy.speed = enemy.speed * -1;
    }
    if (enemy.moving % 2) {
      if (player.x < enemy.x) {
        enemy.dirx = -enemy.speed;
      } else {
        enemy.dirx = enemy.speed;
      }
    } else {
      if (player.y < enemy.y) {
        enemy.diry = -enemy.speed;
      } else {
        enemy.diry = enemy.speed;
      }
    }
  }

  enemy.moving--;
  enemy.x = enemy.x + enemy.dirx;
  enemy.y = enemy.y + enemy.diry;

  if (enemy.x >= canvas.width - 32) {
    enemy.x = 0;
  }
  if (enemy.y >= canvas.height - 32) {
    enemy.y = 0;
  }
  if (enemy.x < 0) {
    enemy.x = canvas.width - 32;
  }
  if (enemy.y < 0) {
    enemy.y = canvas.height - 32;
  }

  if (enemy2.moving < 0) {
    enemy2.moving = myNum(20) * 3 + 10 + myNum(2);
    // enemy2.speed = myNum(5);
    enemy2.dirx = 0;
    enemy2.diry = 0;
    if (pill.ghosteat) {
      enemy2.speed = enemy2.speed * -1;
    }
    if (enemy2.moving % 2) {
      if (player.x < enemy2.x) {
        enemy2.dirx = -enemy2.speed;
      } else {
        enemy2.dirx = enemy2.speed;
      }
    } else {
      if (player.y < enemy2.y) {
        enemy2.diry = -enemy2.speed;
      } else {
        enemy2.diry = enemy2.speed;
      }
    }
  }

  enemy2.moving--;
  enemy2.x = enemy2.x + enemy2.dirx;
  enemy2.y = enemy2.y + enemy2.diry;

  if (enemy2.x >= canvas.width - 32) {
    enemy2.x = 0;
  }
  if (enemy2.y >= canvas.height - 32) {
    enemy2.y = 0;
  }
  if (enemy2.x < 0) {
    enemy2.x = canvas.width - 32;
  }
  if (enemy2.y < 0) {
    enemy2.y = canvas.height - 32;
  }
  //Collision detection ghost

  if (
    player.x <= enemy.x + 26 &&
    enemy.x <= player.x + 26 &&
    player.y <= enemy.y + 26 &&
    enemy.y <= player.y + 32
  ) {
    if (enemy.ghosteat) {
      score++;
      win.play();
    } else {
      ghostScore++;
      lose.play();
    }
    player.x = 10;
    player.y = 100;
    enemy.x = 600;
    enemy.y = 400;
    pill.pcountdown = 0;
  }

  if (
    player.x <= enemy2.x + 26 &&
    enemy2.x <= player.x + 26 &&
    player.y <= enemy2.y + 26 &&
    enemy2.y <= player.y + 32
  ) {
    if (enemy2.ghosteat) {
      score++;
      win.play();
    } else {
      ghostScore++;
      lose.play();
    }
    player.x = 10;
    player.y = 100;
    enemy2.x = 600;
    enemy2.y = 400;
    pill.pcountdown = 0;
  }
  //Collision detection pill

  if (
    player.x <= pill.x &&
    pill.x <= player.x + 32 &&
    player.y <= pill.y &&
    pill.y <= player.y + 32
  ) {
    pill.powerup = false;
    pill.pcountdown = 500;
    pill.ghostNum = enemy.ghostNum;
    pill.ghostNum2 = enemy2.ghostNum;
    enemy.ghostNum = 384;
    enemy2.ghostNum = 384;
    pill.x = 0;
    pill.y = 0;
    enemy.ghosteat = true;
    enemy2.ghosteat = true;
  }

  if (enemy.ghosteat) {
    pill.pcountdown--;
    if (pill.pcountdown <= 0) {
      enemy.ghosteat = false;
      enemy.ghostNum = pill.ghostNum;
    }
  }

  if (enemy2.ghosteat) {
    pill.pcountdown--;
    if (pill.pcountdown <= 0) {
      enemy2.ghosteat = false;
      enemy2.ghostNum = pill.ghostNum;
    }
  }

  if (pill.powerup) {
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(pill.x, pill.y, 12, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.fill();
    //отрисовываем звезду...
    function drawStar(x, y, spikes, outerRadius, innerRadius) {
      var rot = (Math.PI / 2) * 3;
      var x = pill.x;
      var y = pill.y;
      var step = Math.PI / spikes;

      ctx.strokeSyle = "#000";
      ctx.beginPath();
      ctx.moveTo(x, y - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = pill.x + Math.cos(rot) * outerRadius;
        y = pill.y + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = pill.x + Math.cos(rot) * innerRadius;
        y = pill.y + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(pill.x, pill.y - outerRadius);
      ctx.closePath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgb(215,57,18)";
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fill();
    }
    drawStar(115, 100, 6, 10, 3);
  }

  if (enemy.flash == 0) {
    enemy.flash = 32;
    enemy2.flash = 32;
  } else {
    enemy.flash = 0;
    enemy2.flash = 0;
  }

  if (countblink > 10) {
    countblink--;
  } else {
    countblink = 10;
  }

  if (score == 5) {
    ctx.font = "100px Sunshiney";
    ctx.fillStyle = "green";
    ctx.fillText(`You Win`, 140, 250);
    enemy.x = 750;
    enemy.y = 100;
    enemy2.x = 750;
    enemy2.y = 500;
    player.speed = 0;
    blockBtn.style.display = "flex";
  }
  if (ghostScore == 5) {
    ctx.font = "100px Sunshiney";
    ctx.fillStyle = "red";
    ctx.fillText(`Game Over`, 160, 250);
    enemy.x = 750;
    enemy.y = 100;
    enemy2.x = 750;
    enemy2.y = 500;
    player.speed = 0;
    blockBtn.style.display = "flex";
  }

  ctx.font = "30px Sunshiney";
  ctx.fillStyle = "white";
  ctx.fillText(`Pacman ${score} : ${ghostScore} Ghost`, 10, 30);

  ctx.font = "30px Sunshiney";
//   let gradient = ctx.createLinearGradient(435, 18, 800, 18);
//   gradient.addColorStop(0, "rgb(255, 0, 0)");
//   gradient.addColorStop(1, "rgb(255, 255, 0)");
  ctx.fillStyle = 'white';
  ctx.fillText(`Product made by Sidortsou D.`, 485, 30);

      ctx.drawImage(
    mainImage,
    enemy.ghostNum,
    enemy.flash,
    32,
    32,
    enemy.x,
    enemy.y,
    50,
    50
  );
  ctx.drawImage(
    mainImage,
    enemy2.ghostNum,
    enemy2.flash,
    32,
    32,
    enemy2.x,
    enemy2.y,
    50,
    50
  );
  ctx.drawImage(
    mainImage,
    player.pacMouth,
    player.pacDir,
    32,
    32,
    player.x,
    player.y,
    50,
    50
  );
};

window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = 'Возможно внесенные изменения не сохранятся!';
});

