function setup() {
  createCanvas(400, 200);
}

function draw() {
  background('black');
  noStroke();
  
  //yellow packman
  fill('yellow');
  arc(100, 100, 150, 150, 5*PI/4, 3*PI/4);
  
  //body of the ghost
  fill('red');
  circle(300,100,150);
  rect(225,100,150,80);
  
  //ghost eyes
  fill('white');
  circle(265,100, 40);
  circle(335,100, 40);
  fill('blue');
  circle(265,100, 25);
  circle(335,100, 25);
}