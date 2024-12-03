import * as ml5 from 'ml5';
import p5 from 'p5';
import inconsolata from '../fonts/inconsolata.ttf';
import { CustomML5Hand, Hand } from './Hand';

type CustomML5HandPose = {
  detectStart: (h: p5.MediaElement, c: (r: CustomML5Hand[]) => void) => void;
};

export type Colour = 'red' | 'green' | 'blue';

export const ColourSelect = (sketch: p5) => {
  let handPose: CustomML5HandPose;
  let font: p5.Font;

  sketch.preload = () => {
    font = sketch.loadFont(inconsolata);
    handPose = ml5.handPose({ maxHands: 4 });
  };

  let video: p5.MediaElement;

  let hands: Hand[] = [];

  let isLoading = true;

  const delay = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  let currentColour = { r: 0, g: 0, b: 0 };

  const w = innerWidth / 2.5;

  sketch.setup = async function setup() {
    sketch.createCanvas(w * 2, 480);
    sketch.textAlign(sketch.CENTER);
    sketch.textSize(16);

    video = sketch.createCapture('video') as p5.MediaElement;
    video.size(sketch.width / 2, sketch.height);
    video.hide();

    await delay(3000);
    isLoading = false;

    handPose.detectStart(video, gotHands);
    sketch.textFont(font);
    sketch.textSize(20);
    sketch.textAlign(sketch.CENTER);
  };

  sketch.draw = () => {
    sketch.background(50, 0);
    if (isLoading) {
      sketch.fill('white');
      sketch.text('Loading...', sketch.width / 2, sketch.height / 2);
      return;
    }
    sketch.image(video, 0, 0, sketch.width / 2, sketch.height);

    sketch.push();
    sketch.noFill();
    sketch.stroke('white');
    sketch.rect(
      sketch.width * 0.75,
      sketch.height / 2,
      sketch.width / 4,
      sketch.height / 2,
    );
    sketch.pop();

    sketch.pop();
    sketch.textAlign(sketch.RIGHT);
    sketch.fill('white');
    sketch.text('Instructions', sketch.width, 40);
    sketch.text(
      '- Hold your hand over a quadrant to take control',
      sketch.width,
      70,
    );
    sketch.text('- Close and open your hand to control', sketch.width, 100);
    sketch.pop();

    sketch.push();
    sketch.fill('black');
    sketch.rect(sketch.width / 2, 0, 50, sketch.height);
    sketch.pop();

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

    hands.forEach((hand) => {
      hand.draw(currentColour);
    });
  };

  function setColour(newColour: { r?: number; g?: number; b?: number }) {
    currentColour = { ...currentColour, ...newColour };
  }

  function gotHands(results: CustomML5Hand[]) {
    hands = [];
    results.forEach((result) => {
      hands.push(new Hand(sketch, result, setColour));
    });
  }
};
