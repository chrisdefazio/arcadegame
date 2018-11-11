/* Enemy Class */
class Enemy {
  constructor(cordx, cordy, speed) {
    this.speed = speed;
    this.x = cordx;
    this.y = cordy;
    this.sprite = "images/enemy-bug.png";
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //reset enemies after they go off-canvas
    if (this.x > 500) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 200);
    }
    // check if enemy hits player
    if (
      player.x < this.x + 40 &&
      player.x + 40 > this.x &&
      player.y < this.y + 40 &&
      40 + player.y > this.y
    ) {
      player.x = 200;
      player.y = 400;
    }
  };

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

/* Player Class */
class Player {
  constructor(cordx, cordy, speed) {
    this.speed = speed;
    this.x = cordx;
    this.y = cordy;
    this.player = "images/char-boy.png";
  }

  update(dt) {
    //reset player position
    if (this.y < 0) {
      setTimeout(() => {
        this.x = 200;
        this.y = 400;
      }, 200);
    }
  };

  render() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
  };

  handleInput(input) {
    if (input == "l" && this.x > 0) {
      this.x -= 105;
    }

    if (input == "r" && this.x < 400) {
      this.x += 105;
    }

    if (input == "u" && this.y > 0) {
      this.y -= 85;
    }

    if (input == "d" && this.y < 400) {
      this.y += 85;
    }
  };
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyY = [60, 140, 220];

//for each enemy entering canvas set semi-random speed
enemyY.forEach(function(y) {
  enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 200));
  //push to allEnemies array
  allEnemies.push(enemy);
});
//set player starting coordinates
let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener("keydown", function(e) {
  let allowedKeys = {
    37: "l",
    38: "u",
    39: "r",
    40: "d"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});