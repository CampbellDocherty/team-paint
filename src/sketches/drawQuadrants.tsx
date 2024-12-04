import p5 from 'p5';

export function drawQuadrants(
  sketch: p5,
  currentColour: { r: number; g: number; b: number },
) {
  sketch.push();
  sketch.strokeWeight(1);
  sketch.push();
  sketch.fill('red');
  sketch.circle(20, 20, 20);
  sketch.pop();
  sketch.push();
  sketch.fill('green');
  sketch.circle(sketch.width / 2 - 20, 20, 20);
  sketch.pop();
  sketch.push();
  sketch.fill('blue');
  sketch.circle(20, sketch.height - 20, 20);
  sketch.pop();
  sketch.push();
  const { r, g, b } = currentColour;
  sketch.fill(r, g, b);
  sketch.circle(sketch.width / 2 - 20, sketch.height - 20, 20);
  sketch.pop();
  sketch.line(sketch.width / 4, 0, sketch.width / 4, sketch.height);
  sketch.line(0, sketch.height / 2, sketch.width / 2, sketch.height / 2);
  sketch.pop();
}
