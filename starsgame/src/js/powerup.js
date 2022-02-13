const powerupSize = 18;
const powerupSpeed = 1;
const powerupLength = 1000;
const ui_powerupSize = 0.025;
const ui_powerupAdjust = 0.0125;

let powerups = [];//creat array for upgrade

let powerup1 = new Image();
powerup1.src = "src/img/powerup1.png";
let powerup2 = new Image();
powerup2.src = "src/img/powerup2.png";
let powerup3 = new Image();
powerup3.src = "src/img/powerup3.png";
let powerup4 = new Image();
powerup4.src = "src/img/powerup4.png";
let powerup5 = new Image();
powerup5.src = "src/img/powerup5.png";

let powerupSprites = [powerup1, powerup2, powerup3, powerup4, powerup5];

class Powerup {
    constructor(x, y) {
        this.pos = { x, y };
        this.type = Math.floor(Math.random() * powerupSprites.length);
        this.sprite = powerupSprites[this.type];
    }
    update() {
        this.pos.y += powerupSpeed;
        if (this.pos.y > canvas.height) {
            this.destroy();
        };
    }
    draw() {
        ctx.drawImage(
            this.sprite,
            this.pos.x - powerupSize / 2,
            this.pos.y - powerupSize / 2,
            powerupSize,
            powerupSize
        )
    }
    destroy() {
        this.index = powerups.indexOf(this);
        powerups.splice(this.index, 1);
    }

}