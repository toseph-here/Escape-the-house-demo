// Maze dimensions
const cols = 15;
const rows = 15;
const tileSize = 25;

let maze = [];
let canvas, ctx;

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  canvas.width = cols * tileSize;
  canvas.height = rows * tileSize;
  ctx = canvas.getContext('2d');

  generateEmptyMaze();
  carveMaze(1, 1);
  drawMaze();
};

function generateEmptyMaze() {
  for (let y = 0; y < rows; y++) {
    maze[y] = [];
    for (let x = 0; x < cols; x++) {
      maze[y][x] = 1; // 1 = wall, 0 = path
    }
  }
}

function carveMaze(x, y) {
  maze[y][x] = 0;

  const directions = shuffle([
    [0, -2], [2, 0], [0, 2], [-2, 0]
  ]);

  for (let [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && maze[ny][nx] === 1) {
      maze[y + dy / 2][x + dx / 2] = 0; // remove wall between
      carveMaze(nx, ny);
    }
  }
}

function drawMaze() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = '#4a4a4a'; // wall - dark grey
      } else {
        ctx.fillStyle = '#cce7ff'; // floor - soft blue
      }
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

// Helper: shuffle directions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
