const FPS_TARGET = 60;
const CANVAS_WIDTH = 1530;
const CANVAS_HEIGHT = 860;
const SCENE_OBJECTS = [];
const TOTAL_PIXELS = CANVAS_WIDTH * CANVAS_HEIGHT;

function setup() {
  smooth();
  pixelDensity(2);
  frameRate(FPS_TARGET);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  stroke(255);
  background(0);
  strokeWeight(1);

  SCENE_OBJECTS.forEach((object) => object.draw());

  monitorFPS();
}
