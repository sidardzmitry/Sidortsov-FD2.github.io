class Bullet {
    constructor(x, y, speed) {
        this.pos = { x, y };
        this.speed = speed;
    }
    //move bullets
    update() {
        this.pos.y -= this.speed;
        if (this.pos.y < 55 || this.pos.y > canvas.height) { /////////условие уничтожения пули вверху и внизу
            this.destroy();
        }
    };
    //draw bullets
    draw() {
        ctx.fillRect(
            this.pos.x - bulletSpeed / 2,
            this.pos.y - bulletSpeed / 2,
            bulletSpeed, bulletSpeed);
    };
    //////clean bullets
    destroy() {
        this.index = bullets.indexOf(this);
        bullets.splice(this.index, 1);
    };

}

class Smoke {
    constructor(x, y) {
        this.pos = { x: x + Math.floor(Math.random() * 8) - 4, y };
        this.lifetime = Math.floor(Math.random() * 30);
    }

        update() {
            //move
            this.pos.x += (Math.random() * 2) - 1;
            this.pos.y += speed;

            this.lifetime--;
            if (this.lifetime <= 0) {
                this.index = smoke.indexOf(this);
                smoke.splice(this.index, 1);
            }
        };
        draw() {
            ctx.fillRect(
                this.pos.x - smokeSize / 2,
                this.pos.y - smokeSize / 2,
                smokeSize, smokeSize);
        };
    
}