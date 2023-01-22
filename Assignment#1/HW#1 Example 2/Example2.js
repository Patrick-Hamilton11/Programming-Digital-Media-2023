function setup() {
  createCanvas(400,400);
}

function draw() {
  background('white');
  noStroke();
  
  //red circle
  fill('rgba(100%, 0%, 0%, 0.33)')
  circle(width/2,height/3, 200);
  
  //blue circle
  fill('rgba(0%, 0%, 100%, 0.33)')
  circle(width/3,height - height/3,200);
  
  //green circle
  fill('rgba(0%, 100%, 0%, 0.33)');
  circle(width - (width/3),height - height/3,200);
}