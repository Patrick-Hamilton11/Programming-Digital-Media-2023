let bugNormal;
function preload(){
  bugNormal = loadImage("assets/BugSquishNormalTransparent.png");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(bugNormal,100,100, 100, 100);
}
