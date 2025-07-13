let door = {
  x: cols - 2,
  y: rows - 2,
  color: 'gold',
  isNear: false,
};

const openBtn = document.getElementById('openDoorBtn');

function drawDoor() {
  const dx = door.x * tileSize;
  const dy = door.y * tileSize;

  ctx.fillStyle = door.color;
  ctx.fillRect(dx + 5, dy + 5, tileSize - 10, tileSize - 10);
}

function checkDoorProximity() {
  const dx = Math.abs(player.x - door.x);
  const dy = Math.abs(player.y - door.y);

  if (dx + dy === 1) {
    openBtn.style.display = 'block';
    door.isNear = true;
  } else {
    openBtn.style.display = 'none';
    door.isNear = false;
  }
}

openBtn.addEventListener('click', () => {
  if (door.isNear) {
    // Player escapes and respawns
    player.x = 1;
    player.y = 1;
    openBtn.style.display = 'none';
    increaseScore();
    drawEverything();
  }
});

function increaseScore() {
  let scoreText = document.getElementById("score");
  let current = parseInt(scoreText.textContent.split(": ")[1]);
  current += 1;
  scoreText.textContent = "Score: " + current;
}
