let canvasWidth = 400;
let canvasHeight = 400;

function setup() {
  createCanvas(canvasWidth,canvasHeight);
}

function draw() {
  background('navy');
  
  strokeWeight(4);
  stroke(255)
  
  fill('green')
  circle(200,200,200)
  
  fill('red')
  star(200,200,5,40,100,-6)
  
}

function star(x, y, n, outerRadius, innerRadius, rotation){
  let theta = TAU /n;
  beginShape();

  for (let i = 0; i < n; i++){
    vertex(x + cos(i * theta + rotation) * outerRadius, y + sin(i * theta + rotation) * outerRadius);
    vertex(x + cos((i + 0.5) * theta + rotation) * innerRadius, y + sin((i + 0.5) * theta + rotation) * innerRadius);
  }

  endShape(CLOSE);
}

/*function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}*/
