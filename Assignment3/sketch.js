let cnv;
let spriteSheet, spriteSheet2, spriteSheet3;
let sprite1, sprite2, sprite3, sprite4;

function preload() {
  spriteSheet = loadImage("assets/SpelunkyNinja.png");
  spriteSheet2 = loadImage("assets/SpelunkyViking.png");
  spriteSheet3 = loadImage("assets/SpelunkyRoundBoy.png");
}

function setup() {
  cnv = createCanvas(windowWidth, 550);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

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
  //draws the clouds
  cloud(width/6,100,1);
  cloud(width/2.5,80,1.1);
  cloud(width - width/6, 90,0.9);
  //draws the platforms 
  push();
  stroke('tan')
  strokeWeight(4);
  line(0, 232, width, 232);
  line(0, 332, width, 332)
  line(0, 432, width, 432)
  pop();
  //draws the characters
  sprite1.draw();
  sprite2.draw();
  sprite3.draw();
  //Text: Walking Simulator
  textSize(40);
  textAlign(CENTER);
  stroke('white')
  textFont('Georgia');
  text("Walking Simulator", width/2, height - 40);
}

function cloud(x, y, scaleSize) {
  push();
  noStroke();
  fill('white');
  scale(scaleSize);
  circle(x, y, 75);
  circle(x+20, y-20, 75);
  circle(x+25, y+20, 75);
  circle(x+50, y, 75);
  pop();
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
    if(this.x < 25){
      this.x = 25;
    }
    if(this.x > width - 25){
      this.x = width -25;
    }
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
