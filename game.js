const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player1 = {
  x: 100,
  y: 200,
  width: 50,
  height: 50,
  color: 'blue',
  health: 100
};

let player2 = {
  x: 600,
  y: 200,
  width: 50,
  height: 50,
  color: 'red',
  health: 100
};
function animateAttack(attacker, defender) {
  const originalX = attacker.x;
  const attackDistance = attacker === player1 ? 30 : -30;
  let steps = 0;
  const attackInterval = setInterval(() => {
    attacker.x += (steps < 10 ? attackDistance : -attackDistance) / 10;
    drawGame();
    steps++;
    if (steps >= 20) clearInterval(attackInterval);
  }, 25);
}

function attackPlayer(playerNumber) {
  const damage = Math.floor(Math.random() * 10) + 5;
  if (playerNumber === 1) {
    player2.health -= damage;
    animateAttack(player1, player2);
    if (player2.health <= 0) endGame('اللاعب 1');
  } else {
    player1.health -= damage;
    animateAttack(player2, player1);
    if (player1.health <= 0) endGame('اللاعب 2');
  }
  drawGame();
}
function drawPlayer(player) {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = '#000';
  ctx.fillText(`الحياة: ${player.health}`, player.x, player.y - 10);
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer(player1);
  drawPlayer(player2);
}

function attackPlayer(playerNumber) {
  const damage = Math.floor(Math.random() * 10) + 5;
  if (playerNumber === 1) {
    player2.health -= damage;
    if (player2.health <= 0) endGame('اللاعب 1');
  } else {
    player1.health -= damage;
    if (player1.health <= 0) endGame('اللاعب 2');
  }
  drawGame();
}

function endGame(winner) {
  document.getElementById('result').textContent = `${winner} هو الفائز!`;
  player1.health = 100;
  player2.health = 100;
}

drawGame();
