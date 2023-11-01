const FPS_TARGET = 60;
const CANVAS_WIDTH = 1530;
const CANVAS_HEIGHT = 860;
const TOTAL_PIXELS = CANVAS_WIDTH * CANVAS_HEIGHT;

function setup() {
  smooth();
  pixelDensity(3);
  frameRate(FPS_TARGET);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  stroke(255);
  background(0);
  strokeWeight(1);
  walls.forEach((wall) => wall.draw());

  lightSource.draw();
  monitorFPS();
}
