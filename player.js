let player = {
  x: 1,
  y: 1,
  color: 'red',
  size: tileSize * 0.7,
  speed: 1
};

document.addEventListener('keydown', (e) => {
  let newX = player.x;
  let newY = player.y;

  if (e.key === 'ArrowUp') newY--;
  else if (e.key === 'ArrowDown') newY++;
  else if (e.key === 'ArrowLeft') newX--;
  else if (e.key === 'ArrowRight') newX++;

  if (maze[newY] && maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    drawEverything();
  }
});

function drawPlayer() {
  const px = player.x * tileSize + tileSize / 2;
  const py = player.y * tileSize + tileSize / 2;

  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(px, py, player.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawEverything() {
  drawMaze();
  drawPlayer();
  drawDoor();
}
