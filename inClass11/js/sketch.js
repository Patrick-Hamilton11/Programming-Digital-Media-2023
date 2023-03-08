let button, button2;

let synth = new Tone.PolySynth().toDestination();

let pattern = new Tone.Pattern(function (time, note) {
  synth.triggerAttackRelease(note, 0.25, time);
}, ['C4' , 'D4', 'E4', 'G4', 'A4']);

let melody = new Tone.Sequence();

 // create two monophonic synths
 const synthA = new Tone.FMSynth().toDestination();
 const synthB = new Tone.AMSynth().toDestination();
 //play a note every quarter-note
 const loopA = new Tone.Loop(time => {
   synthA.triggerAttackRelease("C2", "8n", time);
 }, "4n").start(0);
 //play another note every off quarter-note, by starting it "8n"
 const loopB = new Tone.Loop(time => {
   synthB.triggerAttackRelease("C4", "8n", time);
 }, "4n").start("8n");

 button = createButton("reset");
 button.position(100,100);
 button.mousePressed( () => {
  Tone.start();
  pattern.start(0);
  Tone.Transport.start();
 })


function setup() {
  createCanvas(400, 400);

  button = createButton('Click to start');
  button.position(50,100);
  button.mousePressed( () => {
  Tone.start();
  pattern.start(0);
  Tone.Transport.start();
 })

  button2 = createButton('Click to stop');
  button2.position(200,100);
  button2.mousePressed( () => {
  Tone.start();
  pattern.start(0);
  Tone.Transport.stop();
 })

}

function draw() {
  background(100,200,150);
}

function keyPressed() {

}