class Player {
    constructor(x, y, sprite) {
        this.pos = { x, y };
        this.sprite = sprite;
        this.upKey = "ArrowUp";
        this.downKey = "ArrowDown";
        this.leftKey = "ArrowLeft";
        this.rightKey = "ArrowRight";
        this.shootKey = "Space";

        this.health = playerHealth;
        this.die = false;
        this.control = false;
        this.playerExitScreen = true;
        this.gunLoaded = 0;
    }

    update() {
        smoke.push(new Smoke(this.pos.x, this.pos.y + 10));
        if (this.playerExitScreen) {
            this.pos.y -= 1;
            if (this.pos.y <= canvas.height - 100) {
                this.control = true;
                this.playerExitScreen = false;
            }
        } else {
            for (let i = 0; i < bullets.length; i++) { //bullet hit
                if (bullets[i].speed < 0) {
                    if (Math.abs(this.pos.x - bullets[i].pos.x) < playerSize / 1.5 &&
                        Math.abs(this.pos.y - bullets[i].pos.y) < playerSize / 1.5) {
                        hitPlayer.play();
                        this.health--;
                        bullets[i].destroy();
                    }
                }
            }
            // crash with enemies
            for (let i = 0; i < enemies.length; i++) {
                if (Math.abs(this.pos.x - enemies[i].pos.x) < (playerSize + enemies[i].size) / 2 &&
                    Math.abs(this.pos.y - enemies[i].pos.y) < (playerSize + enemies[i].size) / 2) {
                    this.health--;
                    enemies[i].destroy();
                }
            }
            //borders on the left by x
            if (this.pos.x < playerSize) {
                this.pos.x = playerSize;
            }
            //borders on the right by x
            if (this.pos.x + playerSize > canvas.width) {
                this.pos.x = canvas.width - playerSize;
            }
            //border bottom by y
            if (this.pos.y > canvas.height - 10 - playerSize) {
                this.pos.y = canvas.height - 10 - playerSize;
            }
            //border top by y
            if (this.pos.y < playerSize + 55) {
                this.pos.y = playerSize + 55;
            }
            //bullets
            if (this.gunLoaded > 0) {
                this.gunLoaded--;
            } else {
                this.gunLoaded = 0;
            }
            if (this.health <= 0) {
                destroyPlayerSound.play();
                this.death();
            }
            if (this.control) {
                // move
                if (keysDown[this.upKey]) {
                    this.pos.y -= playerSpeed;
                } else if (keysDown[this.downKey]) {
                    this.pos.y += playerSpeed;
                }
                if (keysDown[this.leftKey]) {
                    this.pos.x -= playerSpeed;
                }
                if (keysDown[this.rightKey]) {
                    this.pos.x += playerSpeed;
                }
                if (keysDown[this.shootKey] && this.gunLoaded == 0) {
                    bullets.push(new Bullet(this.pos.x, this.pos.y, shotSpeed));
                    this.gunLoaded = shotDelay;
                    bulletSound.play();
                }
            }
        }
    };
    draw() {
        ctx.drawImage(
            this.sprite,
            this.pos.x - playerSize / 2,
            this.pos.y - playerSize / 2,
            playerSize,
            playerSize);
    };
    death() {
        this.die = true;
        this.hasControl = false;
        this.speedBoost = 0;
        this.bulletBoost = 0;

        this.pos.x = (Math.random() * canvas.width / 2) + canvas.width / 4;
        this.pos.y = canvas.height;
    };

}