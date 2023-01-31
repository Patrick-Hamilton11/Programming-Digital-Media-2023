let spriteSheet;
let sprite1, sprite2, sprite3, sprite4;

function preload() {
  spriteSheet = loadImage("SpelunkyNinja.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  sprite1 = new sprite(width/2, 200);
  sprite2 = new sprite(width/2, 300);
  sprite3 = new sprite(width/2, 400);
  sprite4 = new sprite(width/2, 500);
  
}

function draw() {
  background(220);
  sprite1.draw();
  sprite2.draw();
  sprite3.draw();
  sprite4.draw();
}

class sprite {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.sx = 0;
    this.facing = 1;
  }

  draw() {
    this.sx = this.sx % 7;
    if (keyIsDown(LEFT_ARROW)) {
      this.facing = -1;
      scale(-1,1);
      image(spriteSheet, -this.x, this.y, 80, 80, 80* (this.sx + 1), 0, this.size,this.size);
      this.x -= 2;
      if (frameCount % 4 == 0){
        this.sx += 1;
      }
    }else if (keyIsDown(RIGHT_ARROW)) {
      this.facing = 1;
      image(spriteSheet, this.x, this.y, 80, 80, 80* (this.sx + 1), 0, this.size,this.size);
      this.x += 2;
      if (frameCount % 4 == 0){
        this.sx += 1;
      }
    } else {
      this.sx = -1
      if (this.facing == 1){
        image(spriteSheet, this.x, this.y, 80, 80, 80* (this.sx + 1), 0, this.size,this.size);
      } else {
        scale(-1,1);
        image(spriteSheet, -this.x, this.y, 80, 80, 80* (this.sx + 1), 0, this.size,this.size);
     }
    }
  }
}
