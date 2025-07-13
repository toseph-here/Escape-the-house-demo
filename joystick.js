let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Scroll roko

  const touch = e.touches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  let newX = player.x;
  let newY = player.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 20) newX++;
    else if (dx < -20) newX--;
  } else {
    if (dy > 20) newY++;
    else if (dy < -20) newY--;
  }

  if (maze[newY] && maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    drawEverything();
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }
}, { passive: false });
