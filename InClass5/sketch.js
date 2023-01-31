let vikingImg;
let x = 300;
let y = 300;
let rotation = 0;
let sx = 0;
let startTime = 15;
let timeRemaining = startTime;
let score = 0;
let topScore = 0;

function preload(){
  vikingImg = loadImage("assets/Viking.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  textFont('Arial');
  textStyle(BOLD);
  textSize(20);

  if(rotation >= 360) {
    rotation -= 360;  
  }

  push();
  translate(x,y);
  rotate(rotation);
  rotation += 5;
  scale(-1,1)
  image(vikingImg, 0, 0, 80, 80, 80* (sx + 1), 0, 80, 80);
  pop();


  text("Time: " + ceil(timeRemaining),400,50);
  timeRemaining -= deltaTime / 1000;
  if(timeRemaining < 0) {
    timeRemaining = startTime;
    topScore = max(topScore,score);   
    score = 0;
  }

  text("Score: " + score,20, 50);
  text("Top Score: " + topScore, 250, height - 20);
}

function keyTyped(){
  if (key  === ' ') {
    print("space!");
    if (rotation > 350 || rotation < 10){
      score += 10;
    }
  }
}



class sprite{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

}
