

//set up noise
let noise = new Tone.Noise('pink').start();

//gain
let gain = new Tone.Gain(1);

//envelope for the noise
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.2,
  sustain: 1,
  release: 0.6
})

//Filter
let autoFilter = new Tone.AutoFilter({
	frequency: "8n",
	baseFrequency: 800,
	octaves: 16
})

//this only allows low frequency to pass 
let noiseFilter = new Tone.Filter(800, 'lowpass');

const frequencyShifter = new Tone.FrequencyShifter(1900)

noise.connect(noiseEnv);
noiseEnv.connect(noiseFilter);
noiseFilter.connect(gain);
gain.connect(autoFilter)
autoFilter.connect(frequencyShifter)
frequencyShifter.toDestination();

var gif_loadImg, gif_createImg;

function preload() {
  gif_loadImg = loadImage("assets/maglevTrain2.webp");
}

function setup() {
  createCanvas(550, 400);
}


function draw() {
  background(220);

  text('Click Screen to play audio and video!', 180, 50);
  text("Maglev Train",250,380);
}

function keyPressed() {
  if(KEYCODE === ''){
    Tone.start();
  }
}


function mousePressed() {
  console.log('pressed');
  gif_createImg = createImg("assets/maglevTrain2.webp");
  gif_createImg.position(10,60);
  noiseEnv.triggerAttackRelease(2);
  

}