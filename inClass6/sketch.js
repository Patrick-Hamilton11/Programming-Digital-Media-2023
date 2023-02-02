let spriteSheet;
let walkingAnimation;

function preload(){
  spriteSheet = loadImage('assets/SpelunkyViking.png');
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  walkingAnimation = new WalkingAnimation(spriteSheet,80,80,200,200,9);
}

function draw() {
  background(220);
  walkingAnimation.draw();
}

function keyPressed() {
  walkingAnimation.keyPressed();
}

function keyReleased() {
  walkingAnimation.keyReleased();
}

class WalkingAnimation{
  constrctor(spriteSheet, sw, sh, dx, dy){
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0
    this.xDirection = 1;
  }

  draw() {

    if (this.moving != 0){
      this.u = this.currentFrame % this.animationLength;
    }else{
      this.u = 0;
    }

    translate(this.dx,this.dy);
    scale(this.xDirection, 1);

    image(this.spriteSheet, 0, 0, this.sw, this.sh, this.u*this.sw, this.v*this.sh,this.sw,this.sh);

    if (frameCount % 4 == 0){ 
      this.currentFrame++
    }
      this.dx += this.moving;

  }

  keyPressed() {
    if (keyCode === RIGHT_ARROW){
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    }else if (keyCode === LEFT_ARROW){
      this.moving = -1;
      this.xDirection = -1;
    }
  }

  keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
      this.moving = 0;
    }
  }
  
}