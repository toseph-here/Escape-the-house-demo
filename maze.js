class MazeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MazeScene' });
  }

  preload() {
    this.load.image('wall', 'https://i.imgur.com/ZhD4gWb.png'); // wall tile
    this.load.image('floor', 'https://i.imgur.com/w5hZVmV.png'); // floor tile
    this.load.image('player', 'https://i.imgur.com/hRNSg0V.png'); // red dot player
  }

  create() {
    const cols = 15;
    const rows = 15;
    const tileSize = 32;

    const maze = this.generateMaze(cols, rows);
    this.cameras.main.setBackgroundColor('#000000');

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const tile = maze[y][x] === 1 ? 'wall' : 'floor';
        this.add.image(x * tileSize, y * tileSize, tile).setOrigin(0);
      }
    }

    this.player = this.physics.add.sprite(0, 0, 'player').setScale(0.5);
    this.player.setCollideWorldBounds(true);
    this.player.x = 1 * tileSize + tileSize / 2;
    this.player.y = 1 * tileSize + tileSize / 2;

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 150;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.setVelocityX(speed);

    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    else if (this.cursors.down.isDown) this.player.setVelocityY(speed);
  }

  generateMaze(cols, rows) {
    const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
    const stack = [];

    const carve = (x, y) => {
      maze[y][x] = 0;
      const directions = [
        [0, -2], [2, 0], [0, 2], [-2, 0]
      ].sort(() => Math.random() - 0.5);

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] === 1) {
          maze[y + dy / 2][x + dx / 2] = 0;
          carve(nx, ny);
        }
      }
    };

    carve(1, 1);
    return maze;
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: MazeScene
};

const game = new Phaser.Game(config);
