let score = 0;
let ghostScore = 0;
let ghost = false;
let ghost2 = false;
let countblink = 10;
let keyclick = {};
let gamePaused = false;
let btn = document.querySelector('.start');
let intro = document.querySelector('.intro');
let retry = document.querySelector('#retry');
let quitBtn = document.querySelector('#quit');
let canvas = document.querySelector('#myCanvas');
let paused = document.querySelector('#paused');
let ctx = canvas.getContext('2d');
let footer = document.querySelector('.mainFoot');

let mainImage;
let audio;
let win;
let lose;

btn.addEventListener('click', startGame);
retry.addEventListener('click', playAgain);
quit.addEventListener('click', quitGame);

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
  intro.style.display = "none";
  canvas.style.display = "block";
  retry.style.display = "none";
  quit.style.display = "none";
  footer.style.display = "none";
  mainImage = new Image();
  mainImage.ready = false;
  mainImage.onload = checkReady;
  mainImage.src = "img/pac.png";

  audio = new Audio();
  audio.src = "img/oforia.mp3";
  audio.volume = 0.1;
  audio.loop = 1;
  audio.play();
  win = new Audio();
  win.src = "img/wohoo.wav";
  win.volume = 0.3;
  lose = new Audio();
  lose.src = "img/doh.wav";
  lose.volume = 0.3;
}

function playAgain() {
  retry.style.display = "none";
  quit.style.display = "none";
  footer.style.display = "none";
  player.speed = 11;
  score = 0;
  ghostScore = 0;
}

  function pauseGame () {
  if (!gamePaused) {
      player.speed = 0;
      enemy.speed = 0;
      enemy2.speed = 0;
      canvas.style.opacity = "0.8";
      paused.style.display = "block";
      gamePaused = true;
    } else if (gamePaused) {
      player.speed = 10;
      enemy.speed = myNum(5)-1;
      enemy2.speed = myNum(5)-1;
      canvas.style.opacity = "1";
      paused.style.display = "none";
      gamePaused = false;
    }
}

function quitGame () {
  audio.pause();
  mainImage.src = "";
  intro.style.display = "block";
  footer.style.display = "block";
  canvas.style.display = "none";
  retry.style.display = "none";
  quit.style.display = "none";
  score = 0;
  ghostScore = 0;
}

function checkReady() {
  this.ready = true;
  playGame();
}

function playGame() {
  render();
  requestAnimationFrame(playGame);
}

function myNum(n) {
  return Math.floor(Math.random() * n);
}

function render() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!pill.powerup && pill.pcountdown < 5) {
    pill.x = myNum(600)+30;
    pill.y = myNum(550);
    pill.powerup = true;
  }

  if (!ghost) {
      enemy.ghostNum =  myNum(5) * 64;
      enemy.x = myNum(750);
      enemy.y = myNum(250) +30;
      ghost = true;
  }

  if (!ghost2) {
      enemy2.ghostNum =  myNum(5) * 64;
      enemy2.x = myNum(750);
      enemy2.y = myNum(250) +30;
      ghost2 = true;
  }

  if (enemy.moving < 0) {
  enemy.moving = (myNum(20) * 3)+10 + myNum(2);
  // enemy.speed = myNum(5);
  enemy.dirx = 0;
  enemy.diry = 0;
  if (pill.ghosteat) {
    enemy.speed = enemy.speed *-1;
  }
  if (enemy.moving % 2) {
    if (player.x < enemy.x) {
      enemy.dirx = -enemy.speed;
    }else{
      enemy.dirx = enemy.speed;
    }
  }else{
    if (player.y < enemy.y) {
      enemy.diry = -enemy.speed;
    }else{
      enemy.diry = enemy.speed;
  }
}
}

  enemy.moving--;
  enemy.x = enemy.x + enemy.dirx;
  enemy.y = enemy.y + enemy.diry;

  if (enemy.x >= (canvas.width - 32)) {
    enemy.x = 0;
  }
  if (enemy.y >= (canvas.height - 32)) {
    enemy.y = 0;
  }
  if (enemy.x < 0) {
    enemy.x = canvas.width - 32;
  }
  if (enemy.y < 0) {
    enemy.y = canvas.height - 32;
  }

  if (enemy2.moving < 0) {
  enemy2.moving = (myNum(20) * 3)+10 + myNum(2);
  // enemy2.speed = myNum(5);
  enemy2.dirx = 0;
  enemy2.diry = 0;
  if (pill.ghosteat) {
    enemy2.speed = enemy2.speed *-1;
  }
  if (enemy2.moving % 2) {
    if (player.x < enemy2.x) {
      enemy2.dirx = -enemy2.speed;
    }else{
      enemy2.dirx = enemy2.speed;
    }
  }else{
    if (player.y < enemy2.y) {
      enemy2.diry = -enemy2.speed;
    }else{
      enemy2.diry = enemy2.speed;
  }
}
}

  enemy2.moving--;
  enemy2.x = enemy2.x + enemy2.dirx;
  enemy2.y = enemy2.y + enemy2.diry;

  if (enemy2.x >= (canvas.width - 32)) {
    enemy2.x = 0;
  }
  if (enemy2.y >= (canvas.height - 32)) {
    enemy2.y = 0;
  }
  if (enemy2.x < 0) {
    enemy2.x = canvas.width - 32;
  }
  if (enemy2.y < 0) {
    enemy2.y = canvas.height - 32;
  }
  //Collision detection ghost

  if (player.x <= (enemy.x+26) && enemy.x <=(player.x+26) && player.y <= (enemy.y+26) && enemy.y <=(player.y+32) ) {
    if (enemy.ghosteat) {
      score++;
      win.play();
    }else {
      ghostScore++;
      lose.play();
    }
    player.x = 10;
    player.y = 100;
    enemy.x = 600;
    enemy.y = 400;
    pill.pcountdown = 0;
  }

  if (player.x <= (enemy2.x+26) && enemy2.x <=(player.x+26) && player.y <= (enemy2.y+26) && enemy2.y <=(player.y+32) ) {
    if (enemy2.ghosteat) {
      score++;
      win.play();
    }else {
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

  if (player.x <= pill.x && pill.x <=(player.x+32) && player.y <= pill.y && pill.y <=(player.y+32) ) {
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
    ctx.fillStyle = "tomato";
    ctx.beginPath();
    ctx.arc(pill.x,pill.y, 12, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }


  if (enemy.flash == 0) {
    enemy.flash = 32;
    enemy2.flash = 32;
  }else {
    enemy.flash = 0;
    enemy2.flash = 0;
  }

  if (countblink>10) {
    countblink--;
  }else{
    countblink = 10;
  }


  if (score == 5) {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "green";
    ctx.fillText(`YOU WIN`, 150, 350);
    enemy.x = 750;
    enemy.y = 100;
    enemy2.x = 750;
    enemy2.y = 500;
    player.speed = 0;
    retry.style.display = "block";
    quit.style.display = "block";
    footer.style.display = "none";
  }
  if (ghostScore == 5) {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText(`YOU LOSE`, 150, 350);
    enemy.x = 750;
    enemy.y = 100;
    enemy2.x = 750;
    enemy2.y = 500;
    player.speed = 0;
    retry.style.display = "block";
    quit.style.display = "block";
    footer.style.display = "none"; 
  }

  ctx.font = "20px Verdana";
  ctx.fillStyle = "white";
  ctx.fillText(`Pacman ${score} : ${ghostScore} Ghost`, 2, 18);

  ctx.font = "20px Verdana";
  let gradient = ctx.createLinearGradient(435, 18, 800, 18);
  gradient.addColorStop(0, "rgb(255, 0, 0)");
  gradient.addColorStop(1, "rgb(255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillText(`Currently listening: Oforia - Spiders`,435, 18);

  ctx.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 50, 50);
  ctx.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 50, 50);
  ctx.drawImage(mainImage, player.pacMouth, player.pacDir, 32, 32, player.x, player.y, 50, 50);
}