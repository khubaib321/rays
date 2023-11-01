console.log("Welcome to Rays!");

const PI = Math.PI;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Ray {
  constructor(source, angle, length) {
    this.source = source;
    this.length = length;
    this.direction = p5.Vector.fromAngle(angle).mult(length);
  }

  draw = () => {
    // The endpoint of a ray is calculated based on the scene.
    // Any intersections with boundaries or walls need to be considered.
    // The intersection point with a boundary or a wall becomes the end point.
    let nearestWallDistance = this.length;
    let nearestWallIntersectionPoint = null;

    for (const wall of walls) {
      let intersectsAt = this.intersects(wall);
      if (intersectsAt !== false) {
        let distanceToWall = dist(
          this.source.x,
          this.source.y,
          intersectsAt.x,
          intersectsAt.y
        );
        if (distanceToWall < nearestWallDistance) {
          // Found a wall even closer.
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

  intersects = (wall) => {
    let x1 = this.source.x;
    let y1 = this.source.y;
    let x2 = this.source.x + this.direction.x;
    let y2 = this.source.y + this.direction.y;

    let x3 = wall.start.x;
    let y3 = wall.start.y;
    let x4 = wall.end.x;
    let y4 = wall.end.y;

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Lines are parallel
    if (denominator === 0) {
      return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return an object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

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
    this.position.x = mouseX;
    this.position.y = mouseY;
    ellipse(this.position.x, this.position.y, this.width, this.height);

    strokeWeight(0.3);
    for (let i = 1; i <= this.rayDensity; ++i) {
      const angle = map(i, 1, this.rayDensity, 0, 2 * PI);
      new Ray(this.position, angle, TOTAL_PIXELS).draw();
    }
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
  new Wall(new Point(300, 100), new Point(500, 300)),
  new Wall(new Point(100, 300), new Point(300, 500)),
  new Wall(new Point(600, 300), new Point(600, 500)),
  new Wall(new Point(800, 600), new Point(1000, 600)),
  new Wall(new Point(1200, 100), new Point(1200, 700)),
];
const lightSource = new LightSource(720);
