
let sounds = new Tone.Players({
  "Pig" : "sounds/ToyPig.wav",
  "Lazer" : "sounds/lazerConnon.wav",
  "Water" : "sounds/water.mp3",
  "Pop" : "sounds/Pop.mp3",
  "Ding" : "sounds/ding.mp3"
})

let delay = new Tone.FeedbackDelay("8n", 0);
let pitchShift = new Tone.PitchShift(0);
let gain = new Tone.Gain(1);

let soundNames = ["Pig" , "Lazer", "Water", "Pop", "Ding"];
let buttons = [];

let delaySlider;
let feedbackSlider;
let pitchSlider;
let gainSlider;

function setup() {
  createCanvas(450, 400);
  sounds.connect(delay);
  delay.connect(pitchShift);
  pitchShift.connect(gain);
  gain.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(10, (index * 50) + 55);
    buttons[index].size(100,35)
    buttons[index].mousePressed(() => buttonSound(word));
  })

  delaySlider = createSlider(0, 1, 0, 0.05);
  delaySlider.position(250, 175);
  delaySlider.mouseReleased( () => {
    delay.delayTime.value = delaySlider.value();
  })

  feedbackSlider = createSlider(0, 1, 0, 0.05);
  feedbackSlider.position(250, 225);
  feedbackSlider.mouseReleased( () => {
    delay.feedback.value = feedbackSlider.value();
  })

  pitchSlider = createSlider(-8, 8, 0, 0.5);
  pitchSlider.position(250, 125);
  pitchSlider.mouseReleased( () => {
    pitchShift.pitch = pitchSlider.value();
  });

  gainSlider = createSlider(0, 2, 1, 0.1);
  gainSlider.position(250, 75);
  gainSlider.mouseReleased( () => {
    gain.gain.value = gainSlider.value();
  })

}

function draw() {
  background(10,200,150);
  textSize(15);
  text("Press buttons for sounds", 5, 20);
  text("Sliders for cool effects", 250, 20);
  text("Delay: ", 250, 170);
  text("FeedBack:", 250, 220);
  text("Pitch:", 250, 120);
  text("Gain:", 250, 70)
}


function buttonSound(wichSound){
  sounds.player(wichSound).start();
}



