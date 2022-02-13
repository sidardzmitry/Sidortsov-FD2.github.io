const wrap = document.getElementById("wrap");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 500;
const height = 500;
canvas.width = width;
canvas.height = height;

const playerSize = 30;
const playerSpeed = 1.5;
const playerHealth = 3;//number of lives
const beginWave = 1;
const shotDelay = 30;//shot delay
const shotSpeed = 3;
const bulletSpeed = 4;
const smokeSize = 3;
const heartSize = 30;

let keysDown = [];
let inGame = false;// default not in game false
let inMenu = true;// default in the menu
let displayWave = 0;
let score = 0;
let speed = 2;
let numStars = 50;//number of stars
let stars = [];//array for stars
let bullets = [];//array for bullets
let smoke = [];//output from the player
let player;
let currentWave = 0;//current wave
let startWave = false;//start no wave
let enemies = []; //creat array for enemy


let spritePlayer = new Image();
spritePlayer.src = "src/img/shuttle.png";
let enemies1 = new Image();
enemies1.src = "src/img/enemy_1.png";
let enemies2 = new Image();
enemies2.src = "src/img/enemy_2.png";
let enemies3 = new Image();
enemies3.src = "src/img/enemy_3.png";
let enemies4 = new Image();
enemies4.src = "src/img/enemy_4.png";
let enemies5 = new Image();
enemies5.src = "src/img/enemy_5.png";
let heart = new Image();
heart.src = "src/img/heart.png";

const menuMusic = new Audio('src/sound/startMusic.mp3');
const gameAudio = new Audio('src/sound/bgmusic.mp3');
const bulletSound = new Audio('src/sound/bulSound.mp3');
const enemiesBulletSound = new Audio('src/sound/enemBulSound.mp3');
const hitPlayer = new Audio('src/sound/explode1.mp3');
const hitTarget = new Audio('src/sound/explode1.mp3');
const destroyPlayerSound = new Audio('src/sound/explode.m4a');
menuMusic.volume = 0.1;
gameAudio.volume = 0.1;
bulletSound.volume = 0.1;
enemiesBulletSound.volume = 0.1;
hitTarget.volume = 0.1;


// types of enemies
//determine all indicators of enemies (sprite, health, speed, size, rate of fire, points)
let enemiesSprites = [enemies1, enemies2, enemies3, enemies4, enemies5];
let enemiesHealths = [4, 3, 2, 1, 10];
let enemiesSpeeds = [1.5, 1, 2, 3, 0.5];
let enemiesSizes = [25, 40, 20, 20, 35];
let enemiesBulletSpeeds = [1, 3, 0, 2.5, 1.5];
let enemiesValues = [400, 350, 50, 100, 300];


//create an array of waves for enemies, we can make any waves witn any enemies
let waves = [
    [1, 1, 0],
    [1, 1, 0, 0, 2, 2],
    [2, 2, 2, 2, 1, 0, 0],
    [1, 0, 0, 2, 2, 3, 3],
    [1, 1, 0, 0, 2, 4, 4, 3, 3],
    [3, 3, 3, 3, 3, 3, 4, 2, 1],
    [1, 1, 0, 0, 0, 0, 2, 4, 4, 3, 3]
]


// 0 up, 1 down, 2 left, 3 right, 4 shot, 5 delay
let moveEnemies = [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 4, 5, 1, 1, 1, 1
];
let moveEnemies2 = [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 4, 5, 4, 5, 4, 5, 5, 5
];
let moveEnemies3 = [
    1, 1, 1, 1, 2, 1, 1, 1, 1, 3
];
let moveEnemies4 = [
    1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 4, 2, 4, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
];
let moveEnemies5 = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2
];
let enemiesPatterns = [moveEnemies, moveEnemies2, moveEnemies3, moveEnemies4, moveEnemies5];

//create menu, buttons
const btnStart = document.createElement("button");
btnStart.innerHTML = "Start";
btnStart.classList.add('btn')
btnStart.addEventListener('click', function () {
    if (inMenu) {
        startGame();
        inGame = true;
    }
});

const btnRules = document.createElement('button');
btnRules.innerHTML = "Rules";
btnRules.classList.add('btn', 'rules')
btnRules.addEventListener('click', readRules);

const btnScore = document.createElement('button');
btnScore.innerHTML = "Score";
btnScore.classList.add('btn', 'score');

const showResult = document.getElementById('ajax');

wrap.append(btnStart);
wrap.append(btnRules);
wrap.append(btnScore);

const rule = document.createElement('span');
rule.innerHTML = "Take control on spaceship and protect Earth from aliens! You are able to move the spaceship all four directions:</br>Arrow Up : Move Up.</br>Arrow Down : Move Down.</br>Arrow Right : Move Right.</br>Arrow Left : Move Left.</br>Space Bar: Release Bullet from spaceship.</br>";
rule.classList.add('rule')

const btnMainMenu = document.createElement('button');
btnMainMenu.innerHTML = "Return";
btnMainMenu.classList.add('btn', 'returnFromRule')
btnMainMenu.addEventListener('click', backMenu);
function backMenu() {
    setupGame();
    wrap.append(btnStart);
    wrap.append(btnRules);
    wrap.append(btnScore);
    rule.remove();
    btnMainMenu.remove();
    showList.remove();
    inputName.remove();
    saveName.remove();
    headerResult.remove();
    gameover.remove();
}

//class stars sky
class Stars {
    constructor() {
        this.pos = {
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height)
        };
    }
    update() {
        this.pos.y += speed;
        if (this.pos.y > canvas.height + 10) {
            this.pos.x = Math.floor(Math.random() * canvas.width);
            this.pos.y = -10;
        }
    };
    draw() {
        ctx.fillRect(this.pos.x, this.pos.y, 1, 1);
    };

}
//fill the array of stars
function setupGame() {
    for (let i = 0; i < numStars; i++) {
        stars.push(new Stars());//add class in array
    }
    if (inMenu) {
        menuMusic.play();
    }
}
//update all
function update() {
    //update stars
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
    }
    //update bullets
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
    }
    //update smoke behind the player ship
    for (let i = 0; i < smoke.length; i++) {
        smoke[i].update();
    }
    for (let i = 0; i < powerups.length; i++) {
        powerups[i].update()
    }
    if (inGame) {
        if (inMenu) {
            inMenu = false;
        }
        player.update();
        for (let i = 0; i < enemies.length; i++)
            enemies[i].update();
    } else {
    }
    // update waves
    if (inGame) {
        updateWave();
    }
    if (inGame && player.die) {
        endGame();
    }
    draw()
}
function showScore() {
    showResult.style.display = 'block';
}
function draw() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    for (let i = 0; i < stars.length; i++) {
        stars[i].draw();
    }
    if (inMenu) {
        drawMenu();
    }
    //if in the game, we draw ui and game
    if (inGame) {
        drawUI();
        drawGame();
    }
    //borders
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 4);
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0, canvas.height, canvas.width, -4);
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0, 0, 4, canvas.height);
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width, 0, -4, canvas.height);
    ctx.fill();
}
function updateWave() {
    if (enemies.length == 0 && !inMenu) {//if 0 enemies and we are not in the menu
        startWave = true;//flag true for waves
        currentWave++; // add wave
        if (player.health < playerHealth) {
            player.health++;
        }
        if (currentWave != 1) {
            powerups.push(new Powerup(Math.random() * canvas.width, 55));
            powerups.push(new Powerup(Math.random() * canvas.width, 55));
            score += 2000;
        }
    }
    if (startWave) {
        startWave = false;
        displayWave = 200;
        if (currentWave <= waves.length) {//if the current wave is less than the length of the array
            for (let i = 0; i < waves[currentWave - 1].length; i++) { //while i less than the length of the subarray (number of enemies in the wave) 
                enemies.push(new Enemie(
                    Math.random() * (canvas.width - 100) + 50,
                    55,
                    waves[currentWave - 1][i]));//two-dimensional array
            }
        } else {
            for (let i = 0; i < currentWave; i++) {
                enemies.push(new Enemie(
                    Math.random() * (canvas.width - 100) + 50,
                    55,
                    Math.floor(Math.random() * 5)));//infinite waves
            }
        }
    }
}
function drawMenu() {
    let shakingX = (Math.random() * 3) - 1.5;
    let shakingY = (Math.random() * 3) - 1.5;
    ctx.fillStyle = "orange";
    ctx.font = "50px Arial";
    ctx.fillText("STAR WARS", (canvas.width / 2 - 145) + shakingX, 97 + shakingY);
    ctx.fillStyle = "orange";
    ctx.font = "50px Arial";
    ctx.fillText("STAR WARS", (canvas.width / 2 - 145) + shakingX, 100 + shakingY);

    ctx.beginPath();
    ctx.rect((canvas.width / 2 - 130) + shakingX, 110 + shakingY, 265, 10);
    ctx.fillStyle = "darkred";
    ctx.fill();
    ctx.beginPath();
    ctx.rect((canvas.width / 2 - 130) + shakingX, 115 + shakingY, 265, 10);
    ctx.fillStyle = "orange";
    ctx.fill();

    ctx.fillStyle = "orange";
    ctx.font = "10px Arial";
    ctx.fillText("Handmade by A.Bubelev. All rights reserved.", canvas.width / 2 - 95, canvas.height - 30);
}
function drawUI() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 55);
    ctx.fillStyle = "orange";
    ctx.fill();

    // number of wave
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Wave " + currentWave, 10, 35);

    ctx.fillStyle = "white";
    ctx.font = "35px Arial";
    if (displayWave > 0) {
        displayWave--;
        ctx.fillText("Wave " + currentWave, canvas.width / 2.6, canvas.height / 2);
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score " + score, canvas.width - 150, 35);

    //heart
    for (let i = 0; i < player.health; i++) {
        ctx.drawImage(
            heart,
            i * (heartSize + 10) + 100,
            10,
            heartSize,
            heartSize);
    }
    // Powerup display 1
    if (player.speedBoost > 0)
        ctx.drawImage(
            powerup3,
            23 - (player.speedBoost * ui_powerupAdjust),
            (canvas.height - 67) - (player.speedBoost * ui_powerupAdjust),
            ui_powerupSize * player.speedBoost,
            ui_powerupSize * player.speedBoost);

    if (player.bulletBoost > 0)
        ctx.drawImage(
            powerup4,
            53 - (player.bulletBoost * ui_powerupAdjust),
            (canvas.height - 67) - (player.bulletBoost * ui_powerupAdjust),
            ui_powerupSize * player.bulletBoost,
            ui_powerupSize * player.bulletBoost);

    if (player.immortalBoost > 0)
        ctx.drawImage(
            powerup5,
            83 - (player.immortalBoost * ui_powerupAdjust),
            (canvas.height - 67) - (player.immortalBoost * ui_powerupAdjust),
            ui_powerupSize * player.immortalBoost,
            ui_powerupSize * player.immortalBoost);


}
function drawGame() {
    //bullets
    ctx.fillStyle = "white";
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw()
    }
    //smoke
    ctx.fillStyle = 'white';
    for (let i = 0; i < smoke.length; i++) {
        smoke[i].draw();
    }
    //enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
    for (let i = 0; i < powerups.length; i++) {
        powerups[i].draw();
    }

    player.draw();
}

function startGame() {
    player = new Player(150, canvas.height + 50, spritePlayer);
    menuMusic.pause();
    gameAudio.load();
    gameAudio.play();
    currentWave = beginWave - 1;
    score = 0;
    btnStart.remove();
    btnRules.remove();
    btnScore.remove();
}
function endGame() {
    inGame = false;
    inMenu = true;
    enemies.splice(0);
    bullets.splice(0);
    smoke.splice(0);
    player = null;
    saveResult();
    gameAudio.pause();
}
function readRules() {
    btnStart.remove();
    btnRules.remove();
    btnScore.remove();
    wrap.append(rule);
    wrap.append(btnMainMenu);
}
setupGame();
setInterval(update, 10);
document.addEventListener("keydown", function (event) {
    if (["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "Space"].indexOf(event.code) > -1)
        event.preventDefault();
    keysDown[event.code] = true;

});
document.addEventListener("keyup", function (event) {
    keysDown[event.code] = false;
});

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = 'You have made changes. They will be lost if you continue.';
});
