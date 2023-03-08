
const bitCrusher = new Tone.BitCrusher({
  "bits" : 4,
  "wet" : 0.5
})

const osc = new Tone.OmniOscillator();

let ampEnv = new TOne.AmplituteEnvelope({
	
})

osc.connect(bitCrusher);

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

let slider;

function setup() {
  createCanvas(400,400);
  slider = createSlider(0, 1, 0.5, 0.05);
  slider.mouseReleased( () => {
    bitCrusher.wet.value = slider.value();
  })
  bitCrusher.toDestination();
}

function draw() {
  background(100,200,150);
}

function keyPressed() {
  let whatNote = notes[key];
  ampEnv.triggerAttackRelease(whatNote, "8n");
}



