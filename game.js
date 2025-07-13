const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

let player = { x: 10, y: 10, r: 10, color: "red", score: 0 };
let exit = { x: 270, y: 270, size: 20 };
let doors = [];
let walls = [];
let countdown = document.getElementById("countdown");
let doorButton = document.getElementById("doorButton");
let scoreDisplay = document.getElementById("scoreboard");

let keys = {};
let lastDoorOpen = 0;
let mazeChangeInterval = 10000; // 10 sec

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Random maze generator
function generateMaze() {
  walls = [];
  doors = [];

  for (let i = 0; i < 20; i++) {
    let wall = {
      x: Math.floor(Math.random() * 280),
      y: Math.floor(Math.random() * 280),
      w: 40,
      h: 10
    };
    walls.push(wall);
  }

  for (let i = 0; i < 3; i++) {
    doors.push({
      x: Math.floor(Math.random() * 260),
      y: Math.floor(Math.random() * 260),
      w: 20,
      h: 10,
      open: false
    });
  }
}

function drawMaze() {
  ctx.fillStyle = "#333";
  for (let wall of walls) ctx.fillRect(wall.x, wall.y, wall.w, wall.h);

  for (let door of doors) {
    ctx.fillStyle = door.open ? "lime" : "orange";
    ctx.fillRect(door.x, door.y, door.w, door.h);
  }

  ctx.fillStyle = "yellow";
  ctx.fillRect(exit.x, exit.y, exit.size, exit.size);
}

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();
}

function movePlayer() {
  let dx = 0, dy = 0;
  if (keys["ArrowUp"]) dy = -2;
  if (keys["ArrowDown"]) dy = 2;
  if (keys["ArrowLeft"]) dx = -2;
  if (keys["ArrowRight"]) dx = 2;

  let newX = player.x + dx;
  let newY = player.y + dy;

  if (!checkCollision(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }

  for (let door of doors) {
    if (isTouching(player, door)) {
      doorButton.style.display = "block";
      doorButton.onclick = () => {
        door.open = true;
        doorButton.style.display = "none";
      };
      return;
    }
  }

  doorButton.style.display = "none";
}

function checkCollision(x, y) {
  for (let wall of walls) {
    if (x > wall.x && x < wall.x + wall.w &&
        y > wall.y && y < wall.y + wall.h) return true;
  }
  return false;
}

function isTouching(c, rect) {
  return (c.x > rect.x && c.x < rect.x + rect.w &&
          c.y > rect.y && c.y < rect.y + rect.h);
}

function checkExit() {
  if (isTouching(player, exit)) {
    player.score += 1;
    scoreDisplay.textContent = `Score: ${player.score}`;
    player.x = 10 + Math.random() * 20;
    player.y = 10 + Math.random() * 20;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPlayer();
  movePlayer();
  checkExit();
  requestAnimationFrame(draw);
}

function mazeCountdown() {
  countdown.style.display = "block";
  countdown.textContent = "3";
  setTimeout(() => countdown.textContent = "2", 1000);
  setTimeout(() => countdown.textContent = "1", 2000);
  setTimeout(() => {
    countdown.style.display = "none";
    generateMaze();
  }, 3000);
}

generateMaze();
draw();
setInterval(mazeCountdown, mazeChangeInterval);
