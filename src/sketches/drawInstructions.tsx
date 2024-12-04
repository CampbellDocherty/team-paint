import p5 from 'p5';

export function drawInstructions(sketch: p5) {
  sketch.push();
  sketch.textAlign(sketch.RIGHT);
  sketch.fill('white');
  sketch.text('Instructions', sketch.width - 100, 40);
  sketch.text('- Hold your hand over a quadrant', sketch.width - 100, 70);
  sketch.text(
    '- Close and open your hand to control the colour',
    sketch.width - 100,
    100,
  );
  sketch.text(
    '- The bottom right quadrant paints to the canvas',
    sketch.width - 100,
    130,
  );
  sketch.pop();
}
