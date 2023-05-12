let cnv;
let initialized = false;

//Physical Vars
let connectButton;
let port;
let writer, reader;
let joySwitch;
let Xaxis;
let Yaxis;
let Led1_Brightness = 0;
let Led2_Brightness = 0;
let Led3_Brightness = 0;
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
  totalScore: 0,
  level1Score: 0,
  level2Score: 0,
  level3Score: 0,
  level1Deaths: 0,
  level2Deaths: 0,
  level3Deaths: 0,
  totalDeaths: 0,
  lowestDeaths: 0,
  maxScore: 1000, 
  maxTime: 50, 
  elapsedTime: 0,
  level: 1, 
  totalCoins: 10, 
  state: GameState.Start 
}

//players , coins, and walls
let player;
let coins = [];
let walls = [];

let backgroundColor;

//gain
const gainNode = new Tone.Gain(0.08).toDestination();

//synth
let synth = new Tone.AMSynth();
let synth2 = new Tone.MonoSynth().toDestination;
//Edit Synth
var synthJSON = {
  "harmonicity": 2,
  "oscillator": {
      "type": "amsine2",
      "modulationType" : "sine",
      "harmonicity": 1.01
  },
  "envelope": {
      "attack": 0.006,
      "decay": 4,
      "sustain": 0.04,
      "release": 1.2
  },
  "modulation" : {
      "volume" : 13,
      "type": "amsine2",
      "modulationType" : "sine",
      "harmonicity": 12
  },
  "modulationEnvelope" : {
      "attack": 0.006,
      "decay": 0.2,
      "sustain": 0.2,
      "release": 0.4
  }
};

synth.set(synthJSON);

var effect1

// create effects
var effect1 = new Tone.BitCrusher();
effect1JSON = {
	"bits": 16,
  "wet": 0.2
};
effect1.set(effect1JSON);

synth.connect(effect1);
effect1.connect(Tone.Master);

let DSMK = ['G3','G3','F3','F3','F3','A3','A4','F4','E4','C4','A3','G3','F3','A3','G3', 'F3', 'G3', 'A3', 'B#3', 'C4'];

// Don't Stop Me Know//
let DSMKmainMelody = [
  {'time': 0, 'note': 'G3', 'duration': '8n'},
  {'time': '0:0:2', 'note': 'F3', 'duration': '8n'},
  {'time': '0:1', 'note': 'F3', 'duration': '4n'},
  {'time': '0:2', 'note': 'F3', 'duration': '8n'},
  {'time': '0:2:2', 'note': 'A3', 'duration': '8n'},
  {'time': '0:3', 'note': 'C4', 'duration': '8n'},
  {'time': '0:3:2', 'note': 'F4', 'duration': '8n'},

  {'time': '1:0', 'note': 'E4', 'duration': '2n'},
  {'time': '1:2:2', 'note': 'C4', 'duration': '8n'},
  {'time': '1:3', 'note': 'A3', 'duration': '8n'},
  {'time': '1:3:2', 'note': 'G3', 'duration': '4n'},

  {'time': '2:0:2', 'note': 'F3', 'duration': '4n'},
  {'time': '2:1:2', 'note': 'F3', 'duration': '8n'},
  {'time': '2:2', 'note': 'A3', 'duration': '8n'},
  {'time': '2:2;2', 'note': 'G3', 'duration': '8n'},
  {'time': '2:3', 'note': 'F3', 'duration': '8n'},
  {'time': '2:3:2', 'note': 'G3', 'duration': '4n'},

  {'time': '3:0:2', 'note': 'G3', 'duration': '4n.'},
  {'time': '3:2', 'note': 'A3', 'duration': '8n'},
  {'time': '3:2:2', 'note': 'B3', 'duration': '4n'},
  {'time': '3:3:2', 'note': 'C4', 'duration': '2n'},

  {'time': '4:3:0', 'note': 'G3', 'duration': '8n'},
  {'time': '4:3:2', 'note': 'A3', 'duration': '8n'},
  
  {'time': '5:0', 'note': 'G3', 'duration': '8n'},
  {'time': '5:0:2', 'note': 'F3', 'duration': '8n'},
  {'time': '5:1', 'note': 'F3', 'duration': '4n'},
  {'time': '5:2:2', 'note': 'C4', 'duration': '8n'},
  {'time': '5:3', 'note': 'F4', 'duration': '8n'},
  {'time': '5:3:2', 'note': 'E4', 'duration': '2n'},

  {'time': '6:1:2', 'note': 'C4', 'duration': '8n'},
  {'time': '6:2', 'note': 'A4', 'duration': '8n'},
  {'time': '6:2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '6:3', 'note': 'A4', 'duration': '8n'},
  {'time': '6:3:2', 'note': 'G4', 'duration': '4n'},

  {'time': '7:0:2', 'note': 'F4', 'duration': '4n'},
  {'time': '7:2:2', 'note': 'B3', 'duration': '8n'},
  {'time': '7:3:0', 'note': 'G3', 'duration': '8n'},
  {'time': '7:3:2', 'note': 'F3', 'duration': '4n'},

  {'time': '8:0', 'note': 'G3', 'duration': '4n.'},
  {'time': '8:1:2', 'note': 'A3', 'duration': '4n.'},
  {'time': '8:3', 'note': 'B3', 'duration': '4n.'},

  {'time': '9:0:2', 'note': 'C4', 'duration': '4n'},
  {'time': '9:1:2', 'note': 'C4', 'duration': '8n'},
  {'time': '9:2', 'note': 'D4', 'duration': '8n'},
  {'time': '9:2:2', 'note': 'E4', 'duration': '4n'},
  {'time': '9:3:2', 'note': 'F4', 'duration': '8n'},

];

const DSMKchords = [
  {'time': '0:0', 'note': ['F2','C4','F4','A4']},
  {'time': '1:0', 'note': ['A2','C4','E4','A4']},
  {'time': '2:0', 'note': ['D3','A3','D4','F4']},
  {'time': '3:0', 'note': ['G2','B#3','D4','G4']},
  {'time': '4:0', 'note': ['C3','C4','E4','G4']},
  {'time': '5:0', 'note': ['F2','C4','F4','A4']},
  {'time': '6:0', 'note': ['A2','C4','E4','A4']},
  {'time': '7:0', 'note': ['D3','A3','D4','F4']},
  {'time': '8:0', 'note': ['G2','B#3','D4','G4']},
  {'time': '9:0', 'note': ['C3','C4','E4','G4']},
];

const mainMelodyPart = new Tone.Part(function(time, note) {
  synth.triggerAttackRelease(note.note, note.duration, time);
}, DSMKmainMelody).start(0);

// let chords = new Tone.Part(function(time, note) {
//   synth2.triggerAttackRelease(note.note, '1n' , time);
// }, DSMKchords)

mainMelodyPart.loop = true;
mainMelodyPart.loopEnd = '10:0:0'

// chords.loop = true;
// chords.loopEnd = '11:0:0'


Tone.Transport.bpm.value = 160;
synth.volume.value = -9;

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

synthA.volume.value = -9;
synthB.volume.value = -9;


//sounds used in game
let sounds = new Tone.Players({
  "coinSound" : "sounds/coin.wav",
  "deathSound" : "sounds/death__lazer.mp3",
  "levelUP" : "sounds/levelUP.wav",
  "winSound" : "sounds/winner.wav"
});

//editing sounds
sounds.player("coinSound").playbackRate = 0.78; 
sounds.player("coinSound").volume.value = -25; 

sounds.player("deathSound").playbackRate = 0.90;
sounds.player("deathSound").volume.value = -25;

function preload(){
}

function setup() {
  cnv = createCanvas(1000, 700);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  imageMode(CENTER);
  angleMode(DEGREES);

  sounds.toDestination();
  
  player = new Player(width/2, height/2);

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
  player.x = width/2;
  player.y = height/2;

  Led1_Brightness = 0;
  Led2_Brightness = 0;
  Led3_Brightness = 0;

  //reset coinsound
  sounds.player("coinSound").playbackRate = 0.78;

  //level 1
  if(game.level == 1){

    Led1_Brightness = 50;
    Led2_Brightness = 0;
    Led3_Brightness = 0;

    backgroundColor = '#c6e2e9';
    

    //walls 
    walls[0] = new Wall(50, 300, 150, 30, 0, 6, 0, -1);
    walls[1] = new Wall(285, 300, 150, 30, 0, 6, 0, -1);
    walls[2] = new Wall(width - (50 + 150) , height - 300, 150, 30, 0, 6, 0, 1);
    walls[3] = new Wall(width - (285 + 150), height - 300, 150, 30, 0, 6, 0, 1);
    
    //coins
    let counter1 = 0
    for(let i = 50; i < width; i += 100){
      coins[counter1] = new Coin(i, 100);
      coins[counter1 + 1] = new Coin(i, 350);
      coins[counter1 + 2] = new Coin(i, 600);
      counter1 += 3;
    }
    
  }

  //level 2
  if(game.level == 2){

    Led1_Brightness = 0;
    Led2_Brightness = 50;
    Led3_Brightness = 0;

    backgroundColor = '#f1ffc4';
    //reset arrays
    walls = [];
    coins = [];

    //walls 
    walls[0] = new Wall(333, 50, 30, 50, 6, 0, -1, 0);
    walls[1] = new Wall(333, 150, 30, 50, 6, 0, 1, 0);
    walls[2] = new Wall(333, 250, 30, 50, 6, 0, -1, 0);
    walls[3] = new Wall(333, 450, 30, 50, 6, 0, 1, 0);
    walls[4] = new Wall(333, 550, 30, 50, 6, 0, -1, 0);
    walls[5] = new Wall(333, 650, 30, 50, 6, 0, 1, 0);

    walls[6] = new Wall(666, 50, 30, 50, 6, 0, -1, 0);
    walls[7] = new Wall(666, 150, 30, 50, 6, 0, 1, 0);
    walls[8] = new Wall(666, 250, 30, 50, 6, 0, -1, 0);
    walls[9] = new Wall(666, 450, 30, 50, 6, 0, 1, 0);
    walls[10] = new Wall(666, 550, 30, 50, 6, 0, -1, 0);
    walls[11] = new Wall(666, 650, 30, 50, 6, 0, 1, 0);
    
    //coins
    let counter1 = 0
    for(let i = 50; i < width; i += 100){
      coins[counter1] = new Coin(i, 100);
      coins[counter1 + 1] = new Coin(i, 600);
      counter1 += 2;
    }
    
  }

  if (game.level == 3){

    Led1_Brightness = 0;
    Led2_Brightness = 0;
    Led3_Brightness = 50;

    backgroundColor = '#ffcaaf';

    //reset arrays
    walls = [];
    coins = [];
    
    //walls 
    walls[0] = new Wall(333, 50, 30, 50, 6, 0, -1, 0);
    walls[1] = new Wall(333, 150, 30, 50, 6, 0, 1, 0);
    walls[2] = new Wall(333, 250, 30, 50, 6, 0, -1, 0);
    walls[3] = new Wall(333, 450, 30, 50, 6, 0, 1, 0);
    walls[4] = new Wall(333, 550, 30, 50, 6, 0, -1, 0);
    walls[5] = new Wall(333, 650, 30, 50, 6, 0, 1, 0);

    walls[6] = new Wall(666, 50, 30, 50, 6, 0, -1, 0);
    walls[7] = new Wall(666, 150, 30, 50, 6, 0, 1, 0);
    walls[8] = new Wall(666, 250, 30, 50, 6, 0, -1, 0);
    walls[9] = new Wall(666, 450, 30, 50, 6, 0, 1, 0);
    walls[10] = new Wall(666, 550, 30, 50, 6, 0, -1, 0);
    walls[11] = new Wall(666, 650, 30, 50, 6, 0, 1, 0);

    walls[12] = new Wall(50, 300, 150, 30, 0, 6, 0, -1);
    walls[13] = new Wall(285, 300, 150, 30, 0, 6, 0, -1);
    walls[14] = new Wall(width - (50 + 150) , height - 300, 150, 30, 0, 6, 0, 1);
    walls[15] = new Wall(width - (285 + 150), height - 300, 150, 30, 0, 6, 0, 1);


    //coins
    let counter1 = 0
    for(let i = 50; i < width; i += 100){
      coins[counter1] = new Coin(i, 100);
      coins[counter1 + 1] = new Coin(i, 350);
      coins[counter1 + 2] = new Coin(i, 600);
      counter1 += 3;
    }
  }

}

function draw() {
  if (reader) {
    serialRead();
  }

  if (writer) {
    writer.write(encoder.encode(Led1_Brightness + " " + Led2_Brightness + " " + Led3_Brightness + "\n"));
  }

  joySwitch = sensorData.Switch;
  Xaxis = sensorData.Xaxis;
  Yaxis = sensorData.Yaxis;
 
  switch(game.state){
    case GameState.Playing:
      background(backgroundColor);
      // draw player
      player.draw();

      // draw all walls
      for(let i = 0; i < walls.length; i++){
        walls[i].draw();
      }

      // draw all coins
      for(let i = 0; i < coins.length; i++){
        coins[i].draw();
      }

      //check for boarder collision
      if(player.x < 0 + (player.size/2)) {
        player.x -= player.moveX;
      }
      if(player.x > width - (player.size/2)) {
        player.x -= player.moveX;
      }
      if(player.y < 0 + (player.size/2)){
        player.y -= player.moveY;
      }
      if(player.y > height - (player.size/2)){
        player.y -= player.moveY;
      }

      // check for wall collision //
      for(let i = 0; i < walls.length; i++){
        let wallContains = walls[i].contains(player.x, player.y)
        if(wallContains){
          sounds.player("deathSound").start();
          if(game.level == 1){
            game.level1Deaths++;
          }
          if(game.level == 2){
            game.level2Deaths++;
          }
          if(game.level == 3){
            game.level3Deaths++;
          }

          //reset();

        }
      }

      //check for coin collition
      for (let i=0; i < coins.length; i++) {
        let contains = coins[i].contains(player.x,player.y);
        if (contains) {
          if (coins[i].collected == false){
            game.score += 1;
            sounds.player("coinSound").playbackRate += 0.02;
            sounds.player("coinSound").start();
          }
          coins[i].collected = true;
        }
      }
      
      textSize(40);
      fill(255);
      let currentTime = game.elapsedTime
      text(ceil(currentTime), width - 30, 40)
      game.elapsedTime += deltaTime / 1000; 

      //When you collect all coins on a level
      if (game.score >= coins.length){
        if(game.level == 1){
          game.level1Score = ceil(currentTime);
          game.level = 2
          sounds.player("levelUP").start();
          Tone.Transport.pause(0.5);
          reset();
        } else if (game.level == 2) {
          sounds.player("levelUP").start();
          Tone.Transport.pause(0.5);
          game.level2Score = ceil(currentTime);
          game.level = 3;
          reset();
        } else if (game.level == 3){
          game.level3Score = ceil(currentTime);
          game.totalScore = game.level1Score + game.level2Score + game.level3Score;
          game.totalDeaths = game.level1Deaths + game.level2Deaths + game.level3Deaths;
          game.level1Deaths = 0;
          game.level2Deaths = 0;
          game.level3Deaths = 0;
          game.level = 1;

          Tone.Transport.stop();
          sounds.player("winSound").start();
          game.state = GameState.GameOver;
        }
      }

      push();
      textSize(40);
      fill('red');
      stroke(1);
      if(game.level == 1){
        Led1_Brightness = 50;
        text(game.level1Deaths, 25 , 35);
      }
      if(game.level == 2){
        text(game.level2Deaths, 25 , 35);
      }
      if(game.level == 3){
        text(game.level3Deaths, 25 , 35);
      }
      pop();
      fill(255);
      text("Level: " + game.level, 920, 690) 

      break;

    case GameState.GameOver: 
      Led1_Brightness = 0;
      Led2_Brightness = 0;
      Led3_Brightness = 0;
      game.maxScore = min(game.totalScore, game.maxScore);
      game.lowestDeaths = min(game.totalDeaths, game.maxScore);

      background(30);
      fill(255);
      textSize(60)
      textAlign(CENTER);
      fill(255, 230, 0);
      text("Thanks For Playing!", width/2, height/3 -50);
      fill('skyblue');
      textSize(30);
      text("Level1: " + game.level1Score + " seconds", width/2, height/2 - 90);
      text("Level2: " + game.level2Score + " seconds", width/2, height/2-50);
      text("Level3: " + game.level3Score + " seconds", width/2, height/2 -10);
      text("Total Time: " + game.totalScore + " seconds", width/2, height/2 + 50);
      text("Total Deaths: " + game.totalDeaths, width/2, height/2 + 90);
      fill(255, 230, 0);
      text("Lowest Time: " + game.maxScore + " seconds", width/2,height/2 +150);
      text("Lowest Deaths: " + game.lowestDeaths , width/2, height/2 + 190);
      textSize(20)
      fill(255);
      text("Press the JoyStick to play again", width/2, height/2 + 300);

      if (joySwitch == 0){
        reset();
        Tone.Transport.start();
        game.state = GameState.Playing;
      }
      
      break;

    case GameState.Start:
      background(60);

      Led1_Brightness = 0;
      Led2_Brightness = 0;
      Led3_Brightness = 0;

      if (joySwitch == 0 && initialized) {
        Tone.Transport.start();
        game.state = GameState.Playing;
      }

      fill(255);
      textSize(55);
      textAlign(CENTER);
      push();
      textFont('Gorgia');
      fill('skyblue')
      text("The Nearly Impossible Game", width/2, height/3 - 30);
      pop();
      textSize(30);
      if(!initialized){
        text("press any key to initialize game", width/2, height/2.5 + 20);
      }
      if(initialized){
        push();
        rectMode(CENTER);
        fill('pink');
        square(width/2, height/2 + 10, 120);
        fill('skyblue');
        circle(width/2 - 30, height/2 - 10, 30);
        circle(width/2 + 30, height/2 - 10, 30);
        pop();
      }
      fill(255, 230, 0);
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

class Player{
  constructor(x, y){
    this.size = 40;
    this.x = x 
    this.y = y
    this.moveX = 0;
    this.moveY = 0;
  }

  draw(){
    push();
    fill('pink');
    square(this.x - this.size/2, this.y - this.size/2, this.size);
    fill('skyblue');
    circle(this.x - this.size/2 + (this.size/4), this.y - this.size/2 + (this.size/3), 10);
    circle(this.x - this.size/2 + (this.size - this.size/4), this.y - this.size/2 + (this.size/3), 10);
    pop();

    this.moveX = round(map(Xaxis, 0, 255, -6, 6));
    this.moveY = round(map(Yaxis, 0, 255, -6, 6));

    this.x += this.moveX;
    this.y += this.moveY;
  }
}

class Coin{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 25;
    this.r = floor(this.size/2) + 1 + player.size/2;
    this.collected = false;
  }

  draw(){
    if(this.collected == false){
      push();
      fill('gold');
      circle(this.x, this.y, this.size);
      pop();
    }
  }

  contains(x, y) {
    let insideX = x >= this.x - this.r && x <= this.x + this.r;
    let insideY = y >= this.y - this.r && y <= this.y + this.r;
    return insideX && insideY;
  }
}

class Wall{
  constructor(x, y, width, height, speedX, speedY, moveX, moveY){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.moveX = moveX;
    this.moveY = moveY;
  }

  draw(){
    push();
    fill('red');
    rect(this.x,this.y,this.width,this.height);
    pop();

    this.x += (this.moveX * this.speedX);
    this.y += (this.moveY * this.speedY);
    
    //check for boarder collision
    if(this.x < 0 ) {
      this.moveX = this.moveX * -1;
    }
    if(this.x > width ) {
      this.moveX = this.moveX * -1;
    }
    if(this.y < 0 ){
      this.moveY = this.moveY * -1
    }
    if(this.y > height - this.height){
      this.moveY = this.moveY * -1
    }
  }

  contains(x, y) {
    let insideX = x >= this.x - player.size/2 && x <= this.x + this.width + player.size/2;
    let insideY = y >= this.y - player.size/2 && y <= this.y + this.height + player.size/2;
    return insideX && insideY;
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