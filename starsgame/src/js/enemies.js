class Enemie {
  constructor(x, y, type) {
    this.pos = { x, y };
    this.type = type; // wave number starts from 1

    if (this.type == 1) {
      //begin moves enemies
      this.pos.x = -(Math.random() * 250 + 20);
      this.pos.y = Math.random() * 100 + 100;
      if (Math.random() > 0.5) {
        this.pos.x = canvas.width - this.pos.x;
      }
    }
    this.sprite = enemiesSprites[this.type];
    this.health = enemiesHealths[this.type];
    this.speed = enemiesSpeeds[this.type];
    this.size = enemiesSizes[this.type];
    this.bulletSpeed = enemiesBulletSpeeds[this.type];
    this.pattern = enemiesPatterns[this.type];

    this.stepInPattern = Math.floor(Math.random() * this.pattern.length * 10);
    this.changeDir = 1; //pushing enemies away from borders
    this.shoot = false;
  }

  update() {
    //bullet hitting the grinch
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].speed > 0) {
        if (
          Math.abs(this.pos.x - bullets[i].pos.x) < this.size / 1.5 &&
          Math.abs(this.pos.y - bullets[i].pos.y) < this.size / 1.5
        ) {
          hitTarget.play();
          this.health--; //lower health
          bullets[i].destroy(); //cleaning bullets
        }
      }
    }
    // Checks health
    if (this.health <= 0) {
      hitTarget.play();
      this.destroy();
    }
    // return top if we have reached the bottom
    if (this.pos.y > canvas.height - 15) {
      this.pos.x = Math.random() * (canvas.width - 100) + 50;
      this.pos.y = 55;
    }
    //increases pattern (changes every 10 frames)
    this.stepInPattern++;
    if (this.stepInPattern > this.pattern.length * 10) {
      this.stepInPattern = 0;
    }
    // 1 bullet
    if (this.stepInPattern % 10 == 0) {
      this.shoot = false;
    }
    if (this.pattern[Math.floor(this.stepInPattern / 10)] === 1) {
      this.pos.y += this.speed;
    } else if (this.pattern[Math.floor(this.stepInPattern / 10)] === 2) {
      this.pos.x -= this.speed * this.changeDir;
    } else if (this.pattern[Math.floor(this.stepInPattern / 10)] === 3) {
      this.pos.x += this.speed * this.changeDir;
    } else if (this.pattern[Math.floor(this.stepInPattern / 10)] === 4) {
      if (!this.shoot) {
        bullets.push(new Bullet(this.pos.x, this.pos.y, -this.bulletSpeed));
        this.shoot = true;
        enemiesBulletSound.play();
      }
    }
    // change moves
    if (this.pos.x < this.size) this.changeDir = -1;
    if (this.pos.x > canvas.width - this.size) this.changeDir = 1;
  }
  // draws to frame
  draw() {
    ctx.drawImage(
      this.sprite,
      this.pos.x - this.size / 2,
      this.pos.y - this.size / 2 + 15,
      this.size,
      this.size
    );
  }
  destroy() {
    score += enemiesValues[this.type];
    this.index = enemies.indexOf(this);
    enemies.splice(this.index, 1);
  }
}
