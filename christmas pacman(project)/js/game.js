"use strict";

//обьявление глобальных переменных...
let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let grinchScore = 0;
let grinch = false;
let grinch2 = false;
let grinch3 = false;
let countblink = 10;
let arrKeyCode = {};
let gamePaused = false;


let audio = document.querySelector(".sound_background");
let win = document.querySelector(".sound_bonus");
let lose = document.querySelector(".sound_eat");

let mainImage = undefined;
let imgBackground = document.querySelector(".imgBackground");
let imgNew = document.querySelector(".imgNew");

//создаем две кнопки для обновления игры и выхода...
let blockBtn = document.createElement("div");
blockBtn.classList.add("blockBtn");
wrap.insertAdjacentElement("beforeend", blockBtn);

let retry = document.createElement("button");
retry.classList.add("btnLink", "retry");
retry.textContent = "Try Again";
retry.setAttribute("type", "button");
blockBtn.insertAdjacentElement("afterbegin", retry);

let quit = document.createElement("button");
quit.classList.add("btnLink", "quit");
quit.textContent = "Quit";
quit.setAttribute("type", "button");
blockBtn.insertAdjacentElement("beforeend", quit);

//создаем уведамление при нажатии паузы...
let messagePause = document.createElement("h1");
messagePause.classList.add("pause");
messagePause.textContent = "Game paused.Press enter to unpause";
wrap.insertAdjacentElement("beforeend", messagePause);

btnLinkPlay.addEventListener("click", startGame);
retry.addEventListener("click", playAgain);
quit.addEventListener("click", quitGame);

document.addEventListener("keydown", (e) => {
    arrKeyCode[e.code] = true;
    move(arrKeyCode);
  },
  false
);

document.addEventListener("keyup", (e) => {
    delete arrKeyCode[e.code];
  },
  false
);

let player = {
  x: 50,
  y: 100,
  pacMouth: 320,
  pacDir: 0,
  pSize: 32,
  speed: 17,
};

let enemy = {
  x: 150,
  y: 200,
  dirx: 0,
  diry: 0,
  speed: 3,
  moving: 0,
  flash: 0,
  grincheat: false,
};

let enemy2 = {
  x: 150,
  y: 200,
  dirx: 0,
  diry: 0,
  speed: 3,
  moving: 0,
  flash: 0,
  grincheat: false,
};

let enemy3 = {
  x: 150,
  y: 200,
  dirx: 0,
  diry: 0,
  speed: 3,
  moving: 0,
  flash: 0,
  grincheat: false,
};

let star = {
  x: 10,
  y: 10,
  powerup: false,
  pcountdown: 0,
  grinchNum: 0,
  grinchNum2: 0,
};

function move(arrKeyCode) {
  if ("ArrowLeft" in arrKeyCode) {
    player.x -= player.speed;
    player.pacDir = 64;
  };
  if ("ArrowUp" in arrKeyCode) {
    player.y -= player.speed;
    player.pacDir = 96;
  };
  if ("ArrowRight" in arrKeyCode) {
    player.x += player.speed;
    player.pacDir = 0;
  };
  if ("ArrowDown" in arrKeyCode) {
    player.y += player.speed;
    player.pacDir = 32;
  };

  if ("Enter" in arrKeyCode) {
    pauseGame();
  };

  if (player.x >= canvas.width - 48) {
    player.x = canvas.width - 48;
  };
  if (player.y >= canvas.height - 48) {
    player.y = canvas.height - 48;
  };
  if (player.x < 0) {
    player.x = 0;
  };
  if (player.y < 0) {
    player.y = 0;
  };
  if (player.pacMouth == 320) {
    player.pacMouth = 352;
  } else {
    player.pacMouth = 320;
  };

  render();
};

function startGame() {
  containerMenu.style.display = "none";
  imgBackground.style.display = "none";
  imgNew.style.display = "block";
  canvas.style.display = "block";
  soundMenu.pause(); //выключаем музыку из меню...
  mainImage = new Image();
  mainImage.ready = false;
  mainImage.onload = checkReady;
  mainImage.src = "/christmas pacman(project)/assets/pacman5.png";

  audio = new Audio();
  audio.src = "/christmas pacman(project)/assets/sound_background.mp3";
  audio.volume = 0.1;
  audio.loop = 1;
  audio.play();
  win = new Audio();
  win.src = "/christmas pacman(project)/assets/sound_bonus.mp3";
  win.volume = 0.3;
  lose = new Audio();
  lose.src = "/christmas pacman(project)/assets/sound_eat.mp3";
  lose.volume = 0.3;
}

//функция для повторной игры...
function playAgain() {
  blockBtn.style.display = "none";
  blockSaveResult.style.display = "none";
  player.speed = 11;
  score = 0;
  grinchScore = 0;
};

//функция для паузы в игре...
function pauseGame() {
  if (!gamePaused) {
    player.speed = 0;
    enemy.speed = 0;
    enemy2.speed = 0;
    enemy3.speed = 0;
    canvas.style.opacity = "0.8";
    messagePause.style.display = "block";
    gamePaused = true;
  } else if (gamePaused) {
    player.speed = 10;
    enemy.speed = myNum(5) - 1;
    enemy2.speed = myNum(5) - 1;
    enemy3.speed = myNum(5) - 1;
    canvas.style.opacity = "1";
    messagePause.style.display = "none";
    gamePaused = false;
  };
};

//функция для прекращения игры...
function quitGame() {
  audio.pause();
  mainImage.src = "";
  canvasSnow.style.display = "block";
  containerMenu.style.display = "flex";
  canvas.style.display = "none";
  blockSaveResult.style.display = "none";
  blockBtn.style.display = "none";
  retry.style.display = 'none';
  quit.style.display = 'none';
  inputName.style.display = "none";
  saveName.style.display = "none";
  imgBackground.style.display = "block";
  imgNew.style.display = "none";
};

//проверяем готовность...
function checkReady() {
  this.ready = true;
  playGame();
};

//запускаем функции для игры отрисовки игры...
function playGame() {
  render();
  requestAnimationFrame(playGame);
};

function myNum(n) {
  return Math.floor(Math.random() * n);
};

//рендерим всю игру (поле и игроков)...
//рисуем звезду...
function render() {
  ctx.fillStyle = "rgb(3,38,81)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  if (!star.powerup && star.pcountdown < 5) {
    star.x = myNum(600) + 30;
    star.y = myNum(550);
    star.powerup = true;
  };

  if (!grinch) {
    enemy.grinchNum = myNum(5) * 64;
    enemy.x = myNum(750);
    enemy.y = myNum(250) + 30;
    grinch = true;
  };

  if (!grinch2) {
    enemy2.grinchNum = myNum(5) * 64;
    enemy2.x = myNum(750);
    enemy2.y = myNum(250) + 30;
    grinch2 = true;
  };

  if (!grinch3) {
    enemy3.grinchNum = myNum(5) * 64;
    enemy3.x = myNum(750);
    enemy3.y = myNum(250) + 30;
    grinch3 = true;
  };

  //отрисовываем первого гринча...
  if (enemy.moving < 0) {
    enemy.moving = myNum(20) * 3 + 10 + myNum(2);
    // enemy.speed = myNum(5);
    enemy.dirx = 0;
    enemy.diry = 0;
    if (star.grincheat) {
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
      };
    };
  };

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

  //отрисовываем второго гринча....
  if (enemy2.moving < 0) {
    enemy2.moving = myNum(20) * 3 + 10 + myNum(2);
    // enemy2.speed = myNum(5);
    enemy2.dirx = 0;
    enemy2.diry = 0;
    if (star.grincheat) {
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
  //Collision detection grinch
  //отрисовываем третьего гринча...
  if (enemy3.moving < 0) {
    enemy3.moving = myNum(20) * 3 + 10 + myNum(2);
    // enemy2.speed = myNum(5);
    enemy3.dirx = 0;
    enemy3.diry = 0;
    if (star.grincheat) {
      enemy3.speed = enemy3.speed * -1;
    }
    if (enemy3.moving % 2) {
      if (player.x < enemy3.x) {
        enemy3.dirx = -enemy3.speed;
      } else {
        enemy3.dirx = enemy3.speed;
      }
    } else {
      if (player.y < enemy3.y) {
        enemy3.diry = -enemy3.speed;
      } else {
        enemy3.diry = enemy3.speed;
      }
    }
  }

  enemy3.moving--;
  enemy3.x = enemy3.x + enemy3.dirx;
  enemy3.y = enemy3.y + enemy3.diry;

  if (enemy3.x >= canvas.width - 32) {
    enemy3.x = 0;
  }
  if (enemy3.y >= canvas.height - 32) {
    enemy3.y = 0;
  }
  if (enemy3.x < 0) {
    enemy3.x = canvas.width - 32;
  }
  if (enemy3.y < 0) {
    enemy3.y = canvas.height - 32;
  }

  //обнаруживаем столкновения для гринчей...
  // гринч 1...
  if (
    player.x <= enemy.x + 26 &&
    enemy.x <= player.x + 26 &&
    player.y <= enemy.y + 26 &&
    enemy.y <= player.y + 32
  ) {
    if (enemy.grincheat) {
      score++;
      console.log("score", score);
      win.play();
    } else {
      grinchScore++;
      console.log("grinchScore", grinchScore);
      lose.play();
    }
    player.x = 10;
    player.y = 100;
    enemy.x = 600;
    enemy.y = 400;
    star.pcountdown = 0;
  }

  // гринч 2...
  if (
    player.x <= enemy2.x + 26 &&
    enemy2.x <= player.x + 26 &&
    player.y <= enemy2.y + 26 &&
    enemy2.y <= player.y + 32
  ) {
    if (enemy2.grincheat) {
      score++;
      console.log("score", score);
      win.play();
    } else {
      grinchScore++;
      console.log("grinchScore", grinchScore);
      lose.play();
    }
    player.x = 10;
    player.y = 100;
    enemy2.x = 600;
    enemy2.y = 400;
    star.pcountdown = 0;
  }

  // гринч 3...
  if (
    player.x <= enemy3.x + 26 &&
    enemy3.x <= player.x + 26 &&
    player.y <= enemy3.y + 26 &&
    enemy3.y <= player.y + 32
  ) {
    if (enemy3.grincheat) {
      score++;
      console.log("score", score);
      win.play();
    } else {
      grinchScore++;
      console.log("grinchScore", grinchScore);
      lose.play();
    }
    player.x = 10;
    player.y = 100;
    enemy3.x = 600;
    enemy3.y = 400;
    star.pcountdown = 0;
  }

  //условие столкновения со звезды(меняем анимацию для гринчей)...
  if (
    player.x <= star.x &&
    star.x <= player.x + 32 &&
    player.y <= star.y &&
    star.y <= player.y + 32
  ) {
    star.powerup = false;
    star.pcountdown = 500;
    star.grinchNum = enemy.grinchNum;
    star.grinchNum2 = enemy2.grinchNum;
    star.grinchNum3 = enemy3.grinchNum;
    enemy.grinchNum = 384;
    enemy2.grinchNum = 384;
    enemy3.grinchNum = 384;
    star.x = 0;
    star.y = 0;
    enemy.grincheat = true;
    enemy2.grincheat = true;
    enemy3.grincheat = true;
  }

  if (enemy.grincheat) {
    star.pcountdown--;
    if (star.pcountdown <= 0) {
      enemy.grincheat = false;
      enemy.grinchNum = star.grinchNum;
    }
  }

  if (enemy2.grincheat) {
    star.pcountdown--;
    if (star.pcountdown <= 0) {
      enemy2.grincheat = false;
      enemy2.grinchNum = star.grinchNum;
    }
  }

  if (enemy3.grincheat) {
    star.pcountdown--;
    if (star.pcountdown <= 0) {
      enemy3.grincheat = false;
      enemy3.grinchNum = star.grinchNum;
    }
  }

  if (star.powerup) {
    //отрисовываем звезду...
    function drawStar(x, y, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      var x = star.x;
      var y = star.y;
      let step = Math.PI / spikes;

      ctx.strokeSyle = "#000000";
      ctx.beginPath();
      ctx.moveTo(x, y - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = star.x + Math.cos(rot) * outerRadius;
        y = star.y + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = star.x + Math.cos(rot) * innerRadius;
        y = star.y + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(star.x, star.y - outerRadius);
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(255,0,0)";
      ctx.stroke();
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.fill();
    }
    drawStar(115, 100, 7, 10, 2);
  }

  if (enemy.flash == 0) {
    enemy.flash = 32;
    enemy2.flash = 32;
    enemy3.flash = 32;
  } else {
    enemy.flash = 0;
    enemy2.flash = 0;
    enemy3.flash = 0;
  }

  if (countblink > 10) {
    countblink--;
  } else {
    countblink = 10;
  }

  if (score == 5) {
    ctx.font = "100px Sunshiney";
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.lineWidth = 1;
    ctx.fillText(`You Win`, 250, 250);
    ctx.strokeText(`You Win`, 250, 250);
    enemy.x = 750;
    enemy.y = 100;
    enemy2.x = 750;
    enemy2.y = 500;
    enemy3.x = 750;
    enemy3.y = 300;
    player.speed = 0;
    blockBtn.style.display = "flex";
    blockSaveResult.style.display = "flex";
  }
  if (grinchScore == 5) {
    ctx.font = "100px Sunshiney";
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.lineWidth = 1;
    ctx.fillText(`Game Over`, 220, 250);
    ctx.strokeText(`Game Over`, 220, 250);
    enemy.x = 750;
    enemy.y = 100;
    enemy2.x = 750;
    enemy2.y = 500;
    enemy3.x = 750;
    enemy3.y = 300;
    player.speed = 0;
    blockBtn.style.display = "flex";
    blockSaveResult.style.display = "flex";
  }

  ctx.font = "30px Sunshiney";
  ctx.fillStyle = "white";
  ctx.fillText(`Pacman ${score} : ${grinchScore} Grinch`, 290, 30);

  ctx.font = "15px Sunshiney";
  ctx.fillStyle = "white";
  ctx.fillText(`2022 Sodortsov D. All rights reserved`, 590, 555);

  //отрисовываем всех...
  ctx.drawImage(
    mainImage,
    enemy.grinchNum,
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
    enemy2.grinchNum,
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
    enemy3.grinchNum,
    enemy3.flash,
    32,
    32,
    enemy3.x,
    enemy3.y,
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
}
//событие на закрытие окна брайзера...
window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  event.returnValue = "Возможно внесенные изменения не сохранятся!";
});



