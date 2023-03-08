const Synth = new Tone.FMSynth({
  "harmonicity":8,
    "modulationIndex": 2,
    "oscillator" : {
        "type": "sine"
    },
    "envelope": {
        "attack": 0.101,
        "decay": 2,
        "sustain": 0.1,
        "release": 2
    },
    "modulation" : {
        "type" : "square"
    },
    "modulationEnvelope" : {
        "attack": 0.002,
        "decay": 0.2,
        "sustain": 0,
        "release": 0.2
    }
})

const osc = new Tone.OmniOscillator("C#4", "pwm").start();

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.6,
  sustain: 0.3,
  release: 0.2
})

const reverb = new Tone.JCReverb({
  "roomSize" : 0.6,
  "wet" : 0
})

let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5',
}

let harmonicitySlider;
let reverbSlider;

let harmonicityReset;

function setup() {
  createCanvas(400,400);

  Synth.connect(reverb);
  reverb.toDestination();

  harmonicityReset = createButton("reset");
  harmonicityReset.position(150,100);
  harmonicityReset.size(50,20)
  harmonicityReset.mousePressed(() => harmonicitySlider.value(8));

  reverbSlider = createSlider(0, 0.4, 0, 0.05);
  reverbSlider.position(10, 40);

  harmonicitySlider = createSlider(2, 16, 8, 0.5);
  harmonicitySlider.position(10, 100);
  

}

function draw() {
  background(100,200,150);

  textSize(15);
  text("Reverb:" , 10, 35);
  text("Harmonicity:" , 10, 95);

  reverb.wet.value = reverbSlider.value();
  Synth.harmonicity.value = harmonicitySlider.value();
}

function keyPressed() {
  let whatNote = notes[key];
  Synth.triggerAttackRelease(whatNote, "8n");
}