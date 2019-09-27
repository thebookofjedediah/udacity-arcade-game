// According to engine.js x=101 and y=83 in size
// From top: y = -23, 60, 143, 226, 309, 392

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 504){
      this.x += this.speed * dt;
    } else {
      this.x = -101;
    }


};
let enemy1 = new Enemy(0,60,222);
let enemy2 = new Enemy(0,143,111);
let enemy3 = new Enemy(0,226,100);
let enemy4 = new Enemy(0,60,150);
let enemy5 = new Enemy(0,143,200);
let enemy6 = new Enemy(0,226,250);
let enemy7 = new Enemy(-101,60,80);
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(){
    this.sprite = "images/char-boy.png";
    this.x = 202;
    this.y = 392;
  }
  update(){
    //how to make collision work
    //Adapted from: https://knowledge.udacity.com/questions/10129
    //fixed
    for (let enemy of allEnemies) {
      //when sharing roughly 1/2 square with enemy - hit
      if(this.y === enemy.y && (enemy.x + 55 > this.x && enemy.x - 55 < this.x))
      {
        this.reset();
      }
    }
    // Check for the W
    if (this.y === -23){
      this.winner();
    }
}
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(key){
    if (key === 'left' && this.x > 0){
      this.x = this.x - 101;
    } else if (key === 'right' && this.x < 404) {
      this.x = this.x + 101;
    } else if (key === 'up' && this.y > -23) {
      this.y = this.y - 83;
    } else if (key === 'down' && this.y < 392) {
      this.y = this.y + 83;
    }
  }

  reset(){
    this.x = 0;
    this.y = 392;
  }
  winner(){
    allEnemies.pop();
    this.x = 202;
    this.y = 392;
    if (allEnemies.length === 0){
      let youWin = document.querySelector(".winner");
      youWin.innerHTML = "Winner!"
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1,enemy2,enemy4,enemy5,enemy6,enemy7]
// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
