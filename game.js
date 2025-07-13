import { drawMaze, generateMaze, maze } from './maze.js';
import { drawPlayer, updatePlayer, player } from './player.js';
import { drawDoors, updateDoors, doors } from './door.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze(ctx);
  updateDoors();
  drawDoors(ctx);
  updatePlayer();
  drawPlayer(ctx);
  scoreDisplay.textContent = "Score: " + player.score;
  requestAnimationFrame(gameLoop);
}

generateMaze();
gameLoop();
