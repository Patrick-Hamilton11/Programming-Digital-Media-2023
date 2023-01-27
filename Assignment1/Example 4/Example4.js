function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('navy');
  
  strokeWeight(4);
  stroke(255)

  //green circle
  fill('green')
  circle(200,200,200)

  //red star using vertex to make custom shape
  fill('red')
  beginShape();
  vertex(200, 100);
  vertex(175, 170);
  vertex(105, 170);
  vertex(161, 210);
  vertex(135, 275);
  vertex(200, 240)
  vertex(265, 275)
  vertex(239, 210);
  vertex(295, 170);
  vertex(225, 170);
  endShape(CLOSE);
}

