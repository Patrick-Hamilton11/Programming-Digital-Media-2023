let spriteSheet, spriteSheet2, spriteSheet3;
let sprite1, sprite2, sprite3, sprite4;

function preload() {
  spriteSheet = loadImage("assets/SpelunkyNinja.png");
  spriteSheet2 = loadImage("assets/Spelunkyviking.png");
  spriteSheet3 = loadImage("assets/SpelunkyRoundBoy.png");
}

function setup() {
  createCanvas(700, 550);
  imageMode(CENTER);
  sprite1 = new sprite(width/2, 200, spriteSheet);
  sprite2 = new sprite(width/2, 300, spriteSheet2);
  sprite3 = new sprite(width/2, 400, spriteSheet3);
  
}

function draw() {
  background('skyblue');
  //draws the sun in top left
  push();
  noStroke();
  fill("yellow");
  circle(0, 0, 100);
  pop();
  //draws the platforms 
  line(0, 232, width, 232);
  line(0, 332, width, 332)
  line(0, 432, width, 432)
  //draws the characters
  sprite1.draw();
  sprite2.draw();
  sprite3.draw();
}

class sprite {
  constructor(x,y,spriteSheet) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.sx = 0;
    this.facing = 1;
    this.spriteSheet = spriteSheet;
  }

  draw() {
    this.sx = this.sx % 7;
    if (keyIsDown(LEFT_ARROW)) {
      this.facing = -1;
      push();
      translate(this.x,this.y)
      scale(-1,1);
      image(this.spriteSheet, 0, 0, 80, 80, 80* (this.sx + 1), 0, this.size,this.size);
      pop();
      this.x -= 2;
      if (frameCount % 4 == 0){
        this.sx += 1;
      }
    }else if (keyIsDown(RIGHT_ARROW)) {
      this.facing = 1;
      image(this.spriteSheet, this.x, this.y, 80, 80, 80* (this.sx + 1), 0, this.size,this.size);
      this.x += 2;
      if (frameCount % 4 == 0){
        this.sx += 1;
      }
    } else {
      this.sx = -1
      if (this.facing == 1){
        image(this.spriteSheet, this.x, this.y, 80, 80, 80* (this.sx + 1), 0, this.size,this.size);
      } else {
        push();
        translate(this.x,this.y);
        scale(-1,1);
        image(this.spriteSheet, 0, 0, 80, 80, 80* (this.sx + 1), 0, this.size,this.size);
        pop();
      }
    }
  }
}
