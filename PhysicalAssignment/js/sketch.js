let port;
let writer;
let reader;

let redSlider, greenSlider, blueSlider;
let red, geen, blue;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

let backgroundColor = 220;
let sensorData = {"senValue" : 220};

function setup() {
  createCanvas(400, 400);

  if ("serial" in navigator) {
    let button = createButton('connect');
    button.position(10,15);
    button.mousePressed(connect);

    redSlider = createSlider(0, 100, 50);
    redSlider.position(10, 75);
    redSlider.style('width', '100px');

    greenSlider = createSlider(0, 100, 50);
    greenSlider.position(10, 125);
    greenSlider.style('width', '100px');

    blueSlider = createSlider(0, 100, 50);
    blueSlider.position(10, 175);
    blueSlider.style('width', '100px');
  }
}

function draw() {
  background(backgroundColor);

  if(reader){
    serialRead();
  }


  red = redSlider.value();
  green = greenSlider.value();
  blue = blueSlider.value();

  textSize(15);
  text("red", 15, 75);
  text("green", 15, 125);
  text("blue", 15, 175);

  if (writer && frameCount % 5 == 0) {
    writer.write(encoder.encode(red + "," + green + "," + blue + "\n"));
  }

  if(frameCount % 10 == 0){
    backgroundColor = round(map(sensorData.senValue, 0, 1024, 0, 255));
  }

  text("backgroundColor =" + backgroundColor, 10 , 250);
}

async function serialRead(){
  while(true){
    const {value, done} = await reader.read();
    if (done){
      reader.releaseLock();
      break;
    }
    console.log(value);
    sensorData = JSON.parse(value);
  }
}

//connect to serial port, open it, and create writer and reader
async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
} 



class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }

  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
}