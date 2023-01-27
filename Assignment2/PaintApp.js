let currentColor = 'black';
let colorButtons;

function setup() {
  createCanvas(displayWidth, displayHeight);
  colorButtons = [
    new ColorButton (5, 5, 30, 'red'),
    new ColorButton (5, 5 + (32 * 1), 30, 'orange'),
    new ColorButton (5, 5 + (32 * 2), 30, 'yellow'),
    new ColorButton (5, 5 + (32 * 3), 30, 'lime'),
    new ColorButton (5, 5 + (32 * 4), 30, 'cyan'),
    new ColorButton (5, 5 + (32 * 5), 30, 'blue'),
    new ColorButton (5, 5 + (32 * 6), 30, 'magenta'),
    new ColorButton (5, 5 + (32 * 7), 30, 'brown'),
    new ColorButton (5, 5 + (32 * 8), 30, 'white'),
    new ColorButton (5, 5 + (32 * 9), 30, 'black')
  ]
}

function draw() {
  //makes the shapes have no border
  noStroke();

  //makes a background for the colorButtons
  fill('white');
  rect(0, 0, 40, 328);

  for(let i=0; i < colorButtons.length; i++){
    colorButtons[i].draw();
  }
}

//draws a line of the currentColor
function mouseDragged(){
  stroke(currentColor);
  strokeWeight(6);   
  line(mouseX, mouseY,pmouseX, pmouseY)
}

function mouseClicked(){
  for(let i=0; i < colorButtons.length; i++){
    colorButtons[i].changeColor();
  }
}

class ColorButton{
  constructor(x,y,size,color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw(){
    fill(this.color);
    square(this.x,this.y,this.size);
  }

  changeColor(){
    let insideX = mouseX >= this.x && mouseX <= (this.x + this.size);
    let insideY = mouseY >= this.y && mouseY <= (this.y + this.size);
    console.log("in x:",insideX);
    console.log("in y:",insideY);

    if(insideX && insideY){
      currentColor = this.color;
    }
  }

}


