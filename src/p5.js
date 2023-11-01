let averageFPS = 0;
let totalFrames = 0;
let frameCountSinceStart = 0;

const FPS_TARGET = 60;
const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 860;
const TOTAL_PIXELS = CANVAS_WIDTH * CANVAS_HEIGHT;

function setup() {
  smooth();
  pixelDensity(2);
  frameRate(FPS_TARGET);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  let currentFPS = frameRate();
  frameCountSinceStart++;
  totalFrames += currentFPS;
  averageFPS = totalFrames / frameCountSinceStart;

  stroke(255);
  background(0);
  strokeWeight(1);
  walls.forEach((wall) => wall.draw());

  lightSource.draw();

  displayFPS && displayFPS(currentFPS);
}
