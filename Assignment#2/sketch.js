function setup() {
  createCanvas(displayWidth, displayHeight);
}

function draw() {
  //make the background light grey
  fill(240);
  
  //makes the shapes have no border
  noStroke();

  //color picker
  fill('white');
  rect(0, 0, 40, 328);
  fill('red')
  rect(5, 5, 30, 30)
  fill('orange')
  rect(5, 5 + (32 * 1), 30, 30)
  fill('yellow')
  rect(5, 5 + (32 * 2), 30, 30)
  fill('lime')
  rect(5, 5 + (32 * 3), 30, 30)
  fill('cyan')
  rect(5, 5 + (32 * 4), 30, 30)
  fill('blue')
  rect(5, 5 + (32 * 5), 30, 30)
  fill('magenta')
  rect(5, 5 + (32 * 6), 30, 30)
  fill('Brown')
  rect(5, 5 + (32 * 7), 30, 30)
  fill('white')
  rect(5, 5 + (32 * 8), 30, 30)
  fill('black')
  rect(5, 5 + (32 * 9), 30, 30)

 // if(mouseIsPressed && )

  if(mouseIsPressed){
    fill('black')
    stroke(0);
    strokeWeight(3);
    line(mouseX, mouseY,pmouseX, pmouseY)

   }
}


