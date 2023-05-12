let cnv;
let bugSpritesheet;
let bugs = [];
let initialized = false;

//Physical Vars
let connectButton;
let port;
let writer, reader;
let joySwitch;
let Xaxis;
let Yaxis;
let LedBrightness = 0;
let sensorData = {};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

//JSON GameState obect
let GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "gameOver"
}

//JSON game object
let game = { 
  score: 0, 
  maxScore: 0, 
  maxTime: 30, 
  elapsedTime: 0, 
  totalSprites: 50, 
  state: GameState.Start 
}

//gain
const gainNode = new Tone.Gain(0.08).toDestination();

//synth
let synth = new Tone.MonoSynth().connect(gainNode);

//notes to the intro of crazy train
let crazyTrain = ['F#4', 'F#4', 'C#5', 'F#4', 'D5', 'F#4', 'C#5', 'F#4', 'B4', 'A4', 'G#4', 'A4', 'B4', 'A4', 'G#4', 'E4'];

//melody sequence
const melody = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, '16n', time);
}, crazyTrain ).start("0");

//bassline

const synthA = new Tone.MembraneSynth().connect(gainNode);
const synthB = new Tone.MembraneSynth().connect(gainNode);

//play a note every quarter-note
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);

//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop(time => {
	synthB.triggerAttackRelease("C3", "8n", time);
}, "4n").start("8n");


//editing Transport
Tone.Transport.bpm.value = 100; //normally for crazy train

//sounds used in game
let sounds = new Tone.Players({
  "bugSquished" : "sounds/bugSquish.wav" ,
  "gameOverSound" : "sounds/gameOver.wav",
  "countdown" :"sounds/countdown.wav",
  "coinSound" : "sounds/coin.wav"
});

//editing sounds 
sounds.player("coinSound").playbackRate = 0.78; 
sounds.player("coinSound").volume.value = -25; 
sounds.player("gameOverSound").playbackRate = 0.75;
sounds.player("gameOverSound").volume.value = -20;
sounds.player("countdown").volume.value = -20;


function preload(){
  bugSpritesheet = loadImage("assets/bug.png");
}

function setup() {
  cnv = createCanvas(1000, 700);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  imageMode(CENTER);
  angleMode(DEGREES);

  sounds.toDestination();

  if ("serial" in navigator) {
    // The Web Serial API is supported
    connectButton = createButton("connect");
    connectButton.mousePressed(connect);
  }

  reset();
}

function reset(){
  game.elapsedTime = 0;
  game.score = 0;
  LedBrightness = 0;

  for(let i = 0; i < game.totalSprites; i++) {
    bugs[i] = new bug(random(40, width - 40), random(40, height - 40), random(1,3), round(random(0,1)));
  }

}

function draw() {
  if (reader) {
    serialRead();
  }

  if (writer) {
    writer.write(encoder.encode(LedBrightness + "\n"))
  }

  joySwitch = sensorData.Switch;
  Xaxis = sensorData.Xaxis;
  Yaxis = sensorData.Yaxis;
 
  switch(game.state){
    case GameState.Playing:
      background(200);

      push();
      textSize(15);
      text("X-axis: " + Xaxis, 20, 100);
      text("Y-axis: " + Yaxis, 20, 120);
      
      noFill();
      stroke('red')
      circle(map(Xaxis, 0, 255, 0, width), map(Yaxis, 0, 255, 0, height), 15);
      pop();
  
      for(let i=0; i < bugs.length; i++) {
        bugs[i].draw();
      }
      
      for(let i=0; i < bugs.length; i++) {
        let contains = bugs[i].contains(map(Xaxis, 0, 255, 0, width), map(Yaxis, 0, 255, 0, height));

        if (contains) {
          if (bugs[i].moving != 0) {
            bugs[i].stop();
            sounds.player("bugSquished").start();
            game.score += 1;
            LedBrightness += 1;
          }
        }
      }

      textSize(40);
      fill(255)
      text(game.score, 20 , 40);
      let currentTime = game.maxTime - game.elapsedTime
      text(ceil(currentTime), width - 30, 40)
      game.elapsedTime += deltaTime / 1000; 

      if (currentTime < 5 && currentTime > 4.95){
        sounds.player("countdown").start();
      }
    
      if (currentTime <= 0) {
        game.state = GameState.GameOver;
        sounds.player("countdown").stop();
        sounds.player("gameOverSound").start();
      }

      break;

    case GameState.GameOver: 
      game.maxScore = max(game.score, game.maxScore);

      background(30);
      fill(255);
      textSize(60)
      textAlign(CENTER);
      text("Game Over!", width/2, height/3);
      textSize(30)
      text("Score:" + game.score, width/2, height/2 + 40)
      text("High Score: " + game.maxScore, width/2,height/2 +100);
      textSize(20)
      text("Press the JoyStick to play again", width/2, height/2 + 200);

      if (joySwitch == 0){
        reset();
        Tone.Transport.bpm.value = 100;
        Tone.Transport.start();
        Tone.Transport.bpm.rampTo(150, 24);
        Tone.Transport.stop("+25");
        game.state = GameState.Playing;
      }
      
      break;

    case GameState.Start:
      
      background(30);

      if (joySwitch == 0 && initialized) {
        Tone.Transport.start();
        Tone.Transport.bpm.rampTo(150, 24);
        Tone.Transport.stop("+25");
        game.state = GameState.Playing;
      }

      image(bugSpritesheet, width/2 , height/2 + 40 , 150 , 150, 0, 0, 80, 80);
      fill(255);
      textSize(100);
      textAlign(CENTER)
      text("Bug Squish", width/2, height/3)
      textSize(30);
      if(!initialized){
        text("press any key to initialize game", width/2, height/2.5 + 5)
      }
      fill(255, 230, 0)
      if (frameCount % 55 <= 30 && initialized){
        text("Press the JoyStick to Play", width/2, height- 90);
        if (frameCount % 55 == 1)
        {
          sounds.player("coinSound").start();
        }
      }
      break;
  }
}

function keyPressed() {
  switch(game.state) {

    case GameState.Start:
      initialized = true;
    break;
  }
} 

async function serialRead() {
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
   //  console.log(value);
    sensorData = JSON.parse(value);
  }
 }
 
 
 async function connect() {
  port = await navigator.serial.requestPort();
 
 
  await port.open({ baudRate: 9600 });
 
 
  writer = port.writable.getWriter();
 
 
  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
 }

class bug{
  constructor(x, y, speed, verticle = false){
    this.x = x;
    this.y = y;
    this.size = 60;
    this.sx = 0;
    this.facing = 1;
    this.moving = 1;
    this.speed = speed;
    this.verticle = verticle;
  }

  draw(){
    //animates the bugs
    if (this.moving != 0){
      if (frameCount % 10 == 0){
        this.sx += 1;
        this.sx = this.sx % 4;
      }
    }
    else{
      this.sx = 4;
    }

    push()
    translate(this.x, this.y);

    if (this.verticle)
        rotate(90);

    scale(this.facing, 1);
    //rect(-25,-25,50,50);
    image(bugSpritesheet, 0, 0, this.size, this.size, 80 * this.sx , 0, 80, 80);
    pop();

    if (this.verticle) {
      this.y += this.moving*this.speed*((game.score + 1)/4)
      this.move(this.y, this.size /2, height - this.size/2)
    } 
    else {
      this.x += this.moving*this.speed*((game.score + 1)/4);
      this.move(this.x, this.size / 2, width - this.size/2)
    }
  }

  move(position, lowerBounds, upperBounds){
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.facing = 1;
  }

  moveLeft() {
    this.moving = -1;
    this.facing = -1;
  }

  contains(x,y) {
    //rect(-26,-35,50,70);
    //rect(-25,-25,50,50);
    let insideX = x >= this.x - 25 && x <= this.x + 25;
    let insideY = y >= this.y - 25 && y <= this.y + 25;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
  }
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