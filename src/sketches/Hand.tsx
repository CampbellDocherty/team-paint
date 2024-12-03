import p5 from 'p5';

export type CustomML5Hand = {
  keypoints: {
    x: number;
    y: number;
  }[];
  index_finger_tip: {
    x: number;
    y: number;
  };
};

export class Hand {
  sketch;
  ml5hand;
  setColour;
  role: 'r' | 'g' | 'b' | 'painter';

  constructor(
    sketch: p5,
    ml5Hand: CustomML5Hand,
    setColour: ({ r, g, b }: { r?: number; g?: number; b?: number }) => void,
  ) {
    this.sketch = sketch;
    this.ml5hand = ml5Hand;
    this.setColour = setColour;
    this.role = 'r';
  }

  drawPainter() {
    const { index_finger_tip: indexFingerTip } = this.ml5hand;
    const { x, y } = indexFingerTip;

    this.sketch.noStroke();
    if (
      x < this.sketch.width / 4 ||
      x > this.sketch.width / 2 - 15 ||
      y < this.sketch.height / 2 ||
      y > this.sketch.height - 15
    ) {
      return;
    }
    this.sketch.rect(x, y, 15);

    const rx = x + this.sketch.width / 2;
    this.sketch.rect(rx - 100, y, 20);
  }

  draw(currentColour: { r: number; g: number; b: number }) {
    this.setRoleFromAveragePosition();

    if (this.role === 'painter') {
      this.sketch.push();
      const { r, g, b } = currentColour;
      this.sketch.fill(r, g, b);
      this.drawPainter();
      this.sketch.pop();
    } else {
      const { minX, maxX, minY, maxY } = this.getBoundingBox();

      const rWidth = maxX - minX;
      const rHeight = maxY - minY;
      const area = rWidth * rHeight;

      const c = this.sketch.map(
        area,
        250,
        ((this.sketch.width / 2) * this.sketch.height) / 12,
        0,
        255,
        true,
      );

      this.sketch.push();
      this.setFill(c);
      this.sketch.text(
        this.sketch.round(c),
        this.sketch.lerp(minX, maxX, 0.5),
        this.sketch.lerp(minY, maxY, 0.5),
      );
      this.sketch.pop();
      this.sketch.push();
      this.setStroke(c);
      this.sketch.noFill();
      this.sketch.rect(minX, minY, rWidth, rHeight);
      this.sketch.pop();
    }
  }

  setFill(c: number) {
    if (this.role === 'r') {
      this.sketch.fill(c, 0, 0);
      this.setColour({ r: c });
    } else if (this.role === 'g') {
      this.sketch.fill(0, c, 0);
      this.setColour({ g: c });
    } else {
      this.sketch.fill(0, 0, c);
      this.setColour({ b: c });
    }
  }

  setStroke(c: number) {
    this.sketch.strokeWeight(2);
    if (this.role === 'r') {
      this.sketch.stroke(c, 0, 0);
    } else if (this.role === 'g') {
      this.sketch.stroke(0, c, 0);
    } else if (this.role === 'b') {
      this.sketch.stroke(0, 0, c);
    }
  }

  setRoleFromAveragePosition() {
    const { minX, maxX, minY, maxY } = this.getBoundingBox();
    const middleX = this.sketch.lerp(minX, maxX, 0.5);
    const middleY = this.sketch.lerp(minY, maxY, 0.5);

    const isTopLeft =
      this.sketch.dist(
        middleX,
        middleY,
        this.sketch.width / 8,
        this.sketch.height / 4,
      ) <
      this.sketch.width / 8;
    const isTopRight =
      this.sketch.dist(
        middleX,
        middleY,
        this.sketch.width * (3 / 8),
        this.sketch.height / 4,
      ) <
      this.sketch.width / 8;
    const isBottomLeft =
      this.sketch.dist(
        middleX,
        middleY,
        this.sketch.width / 8,
        this.sketch.height * 0.75,
      ) <
      this.sketch.width / 8;

    if (isTopLeft) {
      this.role = 'r';
    } else if (isTopRight) {
      this.role = 'g';
    } else if (isBottomLeft) {
      this.role = 'b';
    } else {
      this.role = 'painter';
    }
  }

  getBoundingBox() {
    return this.ml5hand.keypoints.reduce(
      (acc, point) => {
        return {
          minX: Math.min(acc.minX, point.x),
          maxX: Math.max(acc.maxX, point.x),
          minY: Math.min(acc.minY, point.y),
          maxY: Math.max(acc.maxY, point.y),
        };
      },
      { minX: this.sketch.width, maxX: 0, minY: this.sketch.height, maxY: 0 },
    );
  }
}
