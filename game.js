let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#1a1a1a',
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: { preload, create, update }
};

let game = new Phaser.Game(config);

let player, cursors, doorBtn, score = 0;
let doors = [], exit, mazeWalls = [];
let countdownEl = document.getElementById('countdown');
let scoreEl = document.getElementById('scoreboard');

function preload() {}

function create() {
  this.cameras.main.setBackgroundColor('#222');
  player = this.add.circle(100, 100, 15, 0xff0000);
  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
  doorBtn = document.getElementById("doorBtn");

  generateMaze(this);

  this.time.addEvent({
    delay: 10000,
    callback: () => {
      startCountdown(this);
    },
    loop: true
  });
}

function update() {
  player.body.setVelocity(0);
  if (this.input.activePointer.isDown) {
    let pointer = this.input.activePointer;
    let dx = pointer.x - player.x;
    let dy = pointer.y - player.y;
    let speed = 150;
    let angle = Math.atan2(dy, dx);
    player.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
  }

  doors.forEach((door, i) => {
    if (Phaser.Math.Distance.Between(player.x, player.y, door.x, door.y) < 30) {
      doorBtn.style.display = "block";
      doorBtn.onclick = () => {
        doorBtn.style.display = "none";
        door.destroy();
        doors.splice(i, 1);
      };
    }
  });

  if (exit && Phaser.Math.Distance.Between(player.x, player.y, exit.x, exit.y) < 25) {
    score++;
    scoreEl.innerText = `Score: ${score}`;
    player.x = Phaser.Math.Between(50, 100);
    player.y = Phaser.Math.Between(50, 100);
  }
}

function generateMaze(scene) {
  mazeWalls.forEach(w => w.destroy());
  mazeWalls = [];

  for (let i = 0; i < 20; i++) {
    let wall = scene.add.rectangle(
      Phaser.Math.Between(50, scene.game.config.width - 50),
      Phaser.Math.Between(50, scene.game.config.height - 50),
      Phaser.Math.Between(80, 150),
      10,
      0x444444
    );
    scene.physics.add.existing(wall, true);
    scene.physics.add.collider(player, wall);
    mazeWalls.push(wall);
  }

  doors.forEach(d => d.destroy());
  doors = [];
  for (let i = 0; i < 2; i++) {
    let door = scene.add.rectangle(
      Phaser.Math.Between(100, scene.game.config.width - 100),
      Phaser.Math.Between(100, scene.game.config.height - 100),
      30, 10, 0xff9900
    );
    scene.physics.add.existing(door, true);
    scene.physics.add.collider(player, door);
    doors.push(door);
  }

  if (exit) exit.destroy();
  exit = scene.add.rectangle(
    scene.game.config.width - 40,
    scene.game.config.height - 40,
    20, 20, 0xffff00
  );
  scene.physics.add.existing(exit, true);
}

function startCountdown(scene) {
  countdownEl.innerText = "3";
  countdownEl.style.display = "block";
  setTimeout(() => countdownEl.innerText = "2", 1000);
  setTimeout(() => countdownEl.innerText = "1", 2000);
  setTimeout(() => {
    countdownEl.style.display = "none";
    generateMaze(scene);
  }, 3000);
    }
