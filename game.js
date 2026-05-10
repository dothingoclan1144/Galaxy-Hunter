const canvas = document.getElementById("gameCanvas");

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speed = Math.random() * 2;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.y += this.speed;

    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }

    this.draw();
  }
}

const player = new Player();
const bullets = [];
const enemies = [];
const stars = [];

for (let i = 0; i < 150; i++) {
  stars.push(new Star());
}

setInterval(() => {
  enemies.push(new Enemy());
}, 1000);

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    bullets.push(
      new Bullet(player.x + player.width / 2 - 2, player.y)
    );
  }
});

function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => star.update());

  player.update();

  bullets.forEach((bullet, bulletIndex) => {
    bullet.update();

    if (bullet.y < 0) {
      bullets.splice(bulletIndex, 1);
    }
  });

  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();

    if (enemy.y > canvas.height) {
      enemies.splice(enemyIndex, 1);
    }

    bullets.forEach((bullet, bulletIndex) => {
      if (collision(bullet, enemy)) {
        enemies.splice(enemyIndex, 1);
        bullets.splice(bulletIndex, 1);
      }
    });
  });
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});