let currentColor, button, button2;

function setup() {
  createCanvas(displayWidth, displayHeight);
  currentColor = 'black'
}

function draw() {
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

  //check is red box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 5 && mouseY <= 35) ){
    currentColor = 'red';
  }

  //check is orange box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 37 && mouseY <= 67) ){
    currentColor = 'orange';
  }

  //check is yellow box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 69 && mouseY <= 99) ){
    currentColor = 'yellow';
  }

  //check is lime box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 101 && mouseY <= 131) ){
    currentColor = 'lime';
  }

  //check is cyan box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 133 && mouseY <= 163) ){
    currentColor = 'cyan';
  }

  //check is blue box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 165 && mouseY <= 195) ){
    currentColor = 'blue';
  }

  //check is magenta box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 197 && mouseY <= 227) ){
    currentColor = 'magenta';
  }

  //check is brown box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 229 && mouseY <= 259) ){
    currentColor = 'brown';
  }

  //check is white box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 261 && mouseY <= 291) ){
    currentColor = 'white';
  }

  //check is black box is pressed and chages currentColor
  if(mouseIsPressed && (mouseX >= 5 && mouseX <= 35) && (mouseY >= 293 && mouseY <= 323) ){
    currentColor = 'black';
  }



  if(mouseIsPressed){
    stroke(currentColor);
    strokeWeight(6);   
    line(mouseX, mouseY,pmouseX, pmouseY)
  }
}


