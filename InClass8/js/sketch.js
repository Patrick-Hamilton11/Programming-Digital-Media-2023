let sounds = new Tone.Players({
  "pigSound" : "sounds/ToyPig.wav",
  "lazerConnon" : "sounds/lazerConnon.wav",
  "water" : "sounds/water.mp3"
})

let button1, button2, button3;

function setup() {
  createCanvas(400, 400);

  sounds.toDestination();

  button1 = createButton("ToyPig");
  button1.position(50, 50);
  button1.mousePressed(() => buttonSound("pigSound"));

  button2 = createButton("lazerConnon");
  button2.position(50, 100);
  button2.mousePressed(() => buttonSound("lazerConnon"));

  button3 = createButton("water");
  button3.position(50, 150);
  button3.mousePressed(() => buttonSound("water"));


}

function draw() {
  background(220);
}

function keyPressed(){  
  if (keyCode === UP_ARROW) {
    sounds.player("pigSound").start();
  }
}

function buttonSound(wichSound){
  if(wichSound === "pigSound"){

    sounds.player("pigSound").start();

  } else if(wichSound === "lazerConnon"){

    sounds.player("lazerConnon").start();

  } else if(wichSound === "water"){

    sounds.player("water").start();
  }

}



