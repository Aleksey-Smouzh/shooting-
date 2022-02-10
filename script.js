function iShoot(enemy) {
  enemy.classList.add("dead");
  if (!livingEnemies().length) {
    alert("You WIN!!!!");
    window.location.reload();
  }
}
function enemyAttacksMe(enemy) {
  enemy.classList.add("showing");
  setTimeout(() => {
    enemyShootsMe(enemy);
  }, 1000);

  setTimeout(() => {
    enemy.classList.remove("showing");
  }, 3000);
}

// let enemy1 = document.querySelector('#enemy1');
// enemyAttacksMe(enemy1);

function enemyShootsMe(enemy) {
  enemyGunSound.play();
  if (!enemy.classList.contains("dead")) {
    enemy.classList.add("shooting");
    updateHealthPoints(healthPoints - 10);

    setTimeout(() => {
      enemy.classList.remove("shooting");
    }, 200);
  }
}

function livingEnemies() {
  return document.querySelectorAll(".enemy:not(.dead)");
}

function randomEnemyAttacks() {
  let randomEnemyNo = Math.random() * livingEnemies().length;
  randomEnemyNo = Math.floor(randomEnemyNo);
  let enemy = livingEnemies()[randomEnemyNo];

  let randomDelay = Math.random() * 2000 + 1000;

  setTimeout(() => {
    enemyAttacksMe(enemy);
    randomEnemyAttacks();
  }, randomDelay);
}

let healthPoints = 100;

function updateHealthPoints(points) {
  healthPoints = points;
  let healthBar = document.querySelector("#healthBar");
  healthBar.style.width = points + "%";

  if (healthPoints < 1) {
    alert(" Game over!");
    window.location.reload();
  }
}

function newGame() {
  randomEnemyAttacks();
  document.querySelector("button").style.display = "none";
  music.play();
}

let myGunSound = new Audio("sound/boom1.mp3");
let enemyGunSound = new Audio("sound/boom1.mp3");
enemyGunSound.volume = 0.9;

let music = new Audio("sound/start.mp3");
music.loop = true;
