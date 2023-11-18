console.log("Welcome to Rays!");

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  intersectsLine = (line) => {
    let d1 = dist(this.x, this.y, line.end.x, line.end.y);
    let d2 = dist(this.x, this.y, line.start.x, line.start.y);
    const lineLength = dist(line.start.x, line.start.y, line.end.x, line.end.y);

    return abs(d1 + d2 - lineLength) < 0.01;
  };
}

class Wall {
  constructor(startPoint, endPoint) {
    this.start = startPoint;
    this.end = endPoint;
  }

  draw = () => line(this.start.x, this.start.y, this.end.x, this.end.y);
}

const walls = [
  // Scene boundaries.
  new Wall(new Point(0, 0), new Point(CANVAS_WIDTH, 0)),
  new Wall(new Point(0, 0), new Point(0, CANVAS_HEIGHT)),
  new Wall(new Point(CANVAS_WIDTH, 0), new Point(CANVAS_WIDTH, CANVAS_HEIGHT)),
  new Wall(new Point(0, CANVAS_HEIGHT), new Point(CANVAS_WIDTH, CANVAS_HEIGHT)),

  // Obstacles.
  new Wall(new Point(300, 100), new Point(500, 300)),
  new Wall(new Point(200, 600), new Point(500, 800)),
  new Wall(new Point(600, 300), new Point(600, 500)),
  new Wall(new Point(800, 600), new Point(1000, 600)),
  new Wall(new Point(1200, 100), new Point(1200, 700)),
];

class Ray {
  constructor(source, angle, length) {
    // A ray is a vector with source, angle and length.
    this.source = source;
    this.length = length;
    this.direction = p5.Vector.fromAngle(angle).mult(length);
  }

  draw = () => {
    // The endpoint of a ray is calculated based on the scene.
    // Any intersections with lines need to be considered.
    // The intersection point with the closest line becomes the end point.
    let nearestWallDistance = this.length;
    let nearestWallIntersectionPoint = null;

    for (const wall of walls) {
      let intersectsAt = this.intersectsLine(wall);

      if (intersectsAt !== false) {
        let distanceToWall = dist(
          this.source.x,
          this.source.y,
          intersectsAt.x,
          intersectsAt.y
        );

        if (distanceToWall < nearestWallDistance) {
          // Found a closer line.
          nearestWallDistance = distanceToWall;
          nearestWallIntersectionPoint = intersectsAt;
        }
      }
    }

    if (nearestWallIntersectionPoint) {
      this.endPoint = nearestWallIntersectionPoint;
    } else {
      // Set the endpoint based on the direction vector.
      this.endPoint = new Point(
        this.source.x + this.direction.x,
        this.source.y + this.direction.y
      );
    }

    line(this.source.x, this.source.y, this.endPoint.x, this.endPoint.y);
  };

  intersectsLine = (line) => {
    const x1 = this.source.x;
    const y1 = this.source.y;
    const x2 = this.source.x + this.direction.x;
    const y2 = this.source.y + this.direction.y;

    const x3 = line.start.x;
    const y3 = line.start.y;
    const x4 = line.end.x;
    const y4 = line.end.y;

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Lines are parallel
    if (denominator === 0) {
      return false;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return an object with the x and y coordinates of the intersection
    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);

    return new Point(x, y);
  };
}

class LightSource {
  constructor(rayDensity = 1) {
    this.width = 5;
    this.height = 5;
    this.rayDensity = rayDensity;
    this.position = new Point(0, 0);
  }

  draw = () => {
    fill(255);
    this.position.x = mouseX;
    this.position.y = mouseY;
    ellipse(this.position.x, this.position.y, this.width, this.height);

    mouseIsPressed && this.drawRays();
  };

  drawRays = () => {
    // Draw rays extending in all directions from the light source.
    strokeWeight(0.4);
    for (let i = 1; i <= this.rayDensity; ++i) {
      const angle = map(i, 1, this.rayDensity, 0, TWO_PI);
      new Ray(this.position, angle, TOTAL_PIXELS).draw();
    }
    strokeWeight(1);
  };
}

const lightSource = new LightSource(4320);

SCENE_OBJECTS.push(...walls, lightSource);
