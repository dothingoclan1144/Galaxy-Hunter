const canvas = document.getElementById('gameCanvas');

  player.x = Math.max(30, Math.min(canvas.width - 30, player.x));
  player.y = Math.max(30, Math.min(canvas.height - 30, player.y));
}

// ===== EXPLOSION EFFECT =====
function drawGlow() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ===== GAME LOOP =====
function animate() {
  drawGlow();
  drawStars();
  movePlayer();
  drawPlayer();
  drawBullets();
  drawEnemies();

  requestAnimationFrame(animate);
}

animate();

// ===== RESPONSIVE =====
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});