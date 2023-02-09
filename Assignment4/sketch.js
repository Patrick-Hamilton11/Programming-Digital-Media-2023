let cnv;
let bugSpritesheet;
let bugs = [];

//JSON GameState obect
let GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "gameOver"
}

//JSON game object
let game = { 
  score: 0, 
  maxScore: 0, 
  maxTime: 30, 
  elapsedTime: 0, 
  totalSprites: 50, 
  state: GameState.Start 
}

function preload(){
  bugSpritesheet = loadImage("assets/bug.png");
}

function setup() {
  cnv = createCanvas(1000, 700);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  imageMode(CENTER);
  angleMode(DEGREES);

  reset();
}

function reset(){
  game.elapsedTime = 0;
  game.score = 0;

  for(let i = 0; i < game.totalSprites; i++) {
    bugs[i] = new bug(random(40, width - 40), random(40, height - 40), random(1,3), round(random(0,1)));
  }

}

function draw() {
  switch(game.state){
    case GameState.Playing:
      background(220);
  
      for(let i=0; i < bugs.length; i++) {
        bugs[i].draw();
      }
      textSize(40);
      text(game.score, 20 , 40);
      let currentTime = game.maxTime - game.elapsedTime
      text(ceil(currentTime), width - 30, 40)
      game.elapsedTime += deltaTime / 1000; 
    
      if (currentTime <= 0) 
        game.state = GameState.GameOver;
      break;

    case GameState.GameOver: 
      game.maxScore = max(game.score, game.maxScore);

      background(0);
      fill(255);
      textSize(30)
      textAlign(CENTER);
      text("Game Over!", width/2, height/2);
      text("Score:" + game.score, width/2, height/2 + 50)
      text("High Score: " + game.maxScore, width/2,height/2 +100);
      textSize(20)
      text("Press any key to play again", width/2, height/2 + 150);
      break;
    case GameState.Start:
      background(0);
      fill(255);
      textSize(50);
      textAlign(CENTER)
      text("Bug Game", width/2, height/2)
      textSize(20);
      text("Press Any Key to Start", width/2, height- 75);
      break;
  }
}

function keyPressed() {
  switch(game.state) {

    case GameState.Start:
      game.state = GameState.Playing;
      break;

    case GameState.GameOver: 
      reset();
      game.state = GameState.Playing;
      break;
  }
} 

function mousePressed() {
  switch(game.state) {
    case GameState.Playing:
      for (let i=0; i < bugs.length; i++) {
        let contains = bugs[i].contains(mouseX,mouseY);
        if (contains) {
          if (bugs[i].moving != 0) {
            bugs[i].stop();
            game.score += 1;
          }
        }
      }
      break;
    }
}

class bug{
  constructor(x, y, speed, verticle = false){
    this.x = x;
    this.y = y;
    this.size = 60;
    this.sx = 0;
    this.facing = 1;
    this.moving = 1;
    this.speed = speed;
    this.verticle = verticle;
  }

  draw(){
    //animates the bugs
    if (this.moving != 0){
      if (frameCount % 10 == 0){
        this.sx += 1;
        this.sx = this.sx % 4;
      }
    }
    else{
      this.sx = 4;
    }

    push()
    translate(this.x, this.y);

    if (this.verticle)
        rotate(90);

    scale(this.facing, 1);
    //rect(-25,-25,50,50);
    image(bugSpritesheet, 0, 0, this.size, this.size, 80 * this.sx , 0, 80, 80);
    pop();

    if (this.verticle) {
      this.y += this.moving*this.speed*((game.score + 1)/4)
      this.move(this.y, this.size /2, height - this.size/2)
    } 
    else {
      this.x += this.moving*this.speed*((game.score + 1)/4);
      this.move(this.x, this.size / 2, width - this.size/2)
    }
  }

  move(position, lowerBounds, upperBounds){
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.facing = 1;
  }

  moveLeft() {
    this.moving = -1;
    this.facing = -1;
  }

  contains(x,y) {
    //rect(-26,-35,50,70);
    //rect(-25,-25,50,50);
    let insideX = x >= this.x - 25 && x <= this.x + 25;
    let insideY = y >= this.y - 25 && y <= this.y + 25;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
  }

}
