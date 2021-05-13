//defining the timer for the game
function timer() {
  var sec = 0;
  var timer = setInterval(function() {
    document.getElementById("gameTimer").innerHTML = sec + " seconds";
    sec++;
    if (playergem.gemcount === 10) {
      clearInterval(timer);
    }
  }, 1000);
}

timer();

function gameover() {
  //adding the modal from sweetalert js  https://sweetalert.js.org/guides/
  const totalTime = document.getElementById("gameTimer").innerHTML;

  swal("good job, you collected them in " + totalTime);
}

// Creating the enemy class

class Enemy {
  constructor(x, y, s) {
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    this.speed = s;
  }

  //upate function to return the enemies

  update(dt) {
    if (this.x < 500) {
      this.x += this.speed;
    } else if (this.x >= 500) {
      this.x = Math.random() * -220;
    }

    //definign enemy collision

    let enemyleft = this.x - 70;
    let enemyright = this.x + 70;
    let enemytop = this.y - 60;
    let enemybottom = this.y + 60;

    if (player.x > enemyleft && player.x < enemyright && player.y > enemytop && player.y < enemybottom) {
      player.resetplayer();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

//creating the player class

class Player {
  constructor(x, y) {
    this.avatar = "images/char-boy.png";
    this.x = x;
    this.y = y;
  }
  //update() {}
  render() {
    ctx.drawImage(Resources.get(this.avatar), this.x, this.y);
  }

  //function that resets the location of player if touched by enemy
  resetplayer() {
    this.x = 200;
    this.y = 400;
  }

  //defining the key for player movement
  handleInput(direction) {
    switch (direction) {
      case "left":
        if (this.x > 0) {
          this.x -= 100;
        }
        break;

      case "right":
        if (this.x < 400) {
          this.x += 100;
        }
        break;

      case "down":
        if (this.y < 400) {
          this.y += 83;
        }
        break;

      case "up":
        if (this.y > -15) {
          this.y -= 83;
        }
        break;
    }
  }
}

//gem class

class Gems {
  constructor(x, y) {
    this.gem = "images/Gem Blue.png";
    this.x = x;
    this.y = y;
    this.gemcount = 0;
  }

  render() {
    ctx.drawImage(Resources.get(this.gem), this.x, this.y);
  }
  //function that ramdomizes the location of gem when collected
  randomgem() {
    this.x = Math.floor(Math.random() * 450);
    this.y = Math.floor(Math.random() * 450);
  }

  //updating the gem if player touches it
  update(dt) {
    let left = this.x - 70;
    let right = this.x + 70;
    let top = this.y - 60;
    let bottom = this.y + 60;

    if (player.x > left && player.x < right && player.y > top && player.y < bottom) {
      this.gemcount += 1;
      this.randomgem();
    }

    if (this.gemcount === 10) {
      gameover();
    }
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

const player = new Player(200, 400);
const playergem = new Gems(Math.floor(Math.random() * 250), Math.floor(Math.random() * 400));

const allEnemies = [new Enemy(Math.random() * 100, 220, 4), new Enemy(0, 60, 5), new Enemy(Math.random() * 230, 150, 6)];
