const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 10;
const cellSize = 40;

let maze = [];
let player = { x: 0, y: 9 };
let exit = { x: 9, y: 0 };

// Create maze
function generateMaze() {
  maze = [];
  for (let y = 0; y < gridSize; y++) {
    let row = [];
    for (let x = 0; x < gridSize; x++) {
      row.push(Math.random() < 0.2 ? 1 : 0); // 1 = wall
    }
    maze.push(row);
  }
  maze[player.y][player.x] = 0;
  maze[exit.y][exit.x] = 0;
}
generateMaze();
setInterval(generateMaze, 10000); // Maze changes every 10 sec

// Draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      ctx.fillStyle = maze[y][x] ? '#555' : '#222';
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  // Exit
  ctx.fillStyle = 'gold';
  ctx.fillRect(exit.x * cellSize + 10, exit.y * cellSize + 10, 20, 20);

  // Player
  ctx.fillStyle = 'cyan';
  ctx.beginPath();
  ctx.arc(player.x * cellSize + 20, player.y * cellSize + 20, 15, 0, Math.PI * 2);
  ctx.fill();
}

setInterval(draw, 100);

// Joystick Control
let joystick = document.getElementById('joystick');
let container = document.getElementById('joystick-container');

let dragging = false;

joystick.addEventListener('touchstart', () => dragging = true);
joystick.addEventListener('touchend', () => {
  dragging = false;
  joystick.style.top = '30px';
  joystick.style.left = '30px';
});

joystick.addEventListener('touchmove', (e) => {
  if (!dragging) return;
  e.preventDefault();
  let touch = e.touches[0];
  let rect = container.getBoundingClientRect();
  let x = touch.clientX - rect.left - 50;
  let y = touch.clientY - rect.top - 50;
  joystick.style.left = `${30 + x}px`;
  joystick.style.top = `${30 + y}px`;

  if (Math.abs(x) > Math.abs(y)) {
    if (x > 10) move(1, 0); // right
    else if (x < -10) move(-1, 0); // left
  } else {
    if (y > 10) move(0, 1); // down
    else if (y < -10) move(0, -1); // up
  }
});

function move(dx, dy) {
  let nx = player.x + dx;
  let ny = player.y + dy;
  if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize) return;
  if (maze[ny][nx] === 1) return;
  player.x = nx;
  player.y = ny;
  if (player.x === exit.x && player.y === exit.y) {
    alert('🎉 You escaped!');
    player = { x: 0, y: 9 };
    generateMaze();
  }
}
