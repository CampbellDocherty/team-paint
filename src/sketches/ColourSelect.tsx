import * as ml5 from 'ml5';
import p5 from 'p5';
import inconsolata from '../fonts/inconsolata.ttf';
import { CustomML5Hand, Hand } from './Hand';
import { drawInstructions } from './drawInstructions';
import { drawQuadrants } from './drawQuadrants';
import { uploadBase64Image } from '../firebase';

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

  const waitForML5 = 5000;
  const delay = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  let currentColour = { r: 0, g: 0, b: 0 };
  const w = innerWidth / 2.2;
  let graphics: p5.Graphics;

  sketch.setup = async function setup() {
    sketch.createCanvas(w * 2, 480);
    sketch.textFont(font);
    sketch.textSize(20);
    sketch.textAlign(sketch.CENTER);

    video = sketch.createCapture('video') as p5.MediaElement;
    video.size(sketch.width / 2, sketch.height);
    video.hide();

    graphics = sketch.createGraphics(sketch.width / 4, sketch.height / 2);

    await delay(waitForML5);
    isLoading = false;

    handPose.detectStart(video, gotHands);
  };

  const saveButton = sketch.select('.save-image');

  saveButton?.mouseClicked(async () => {
    if (!graphics) {
      return;
    }
    const graphicsCanvas = graphics.elt;
    const dataURL = graphicsCanvas.toDataURL('image/png');

    await uploadBase64Image(
      dataURL,
      localStorage.getItem('teamName'),
      localStorage.getItem('teamId'),
    );
  });

  sketch.draw = () => {
    sketch.background(0);

    if (isLoading) {
      sketch.fill('white');
      sketch.text('Loading...', sketch.width / 2, sketch.height / 2);
      return;
    }

    sketch.image(video, 0, 0, sketch.width / 2, sketch.height);

    graphics.push();
    graphics.stroke('white');
    graphics.noFill();
    graphics.rect(0, 0, graphics.width, graphics.height);
    graphics.pop();

    drawInstructions(sketch);

    drawQuadrants(sketch, currentColour);

    hands.forEach((hand) => {
      if (hand.role === 'painter') {
        hand.graphicBuffer = graphics;
      }
      hand.draw(currentColour);
    });

    sketch.image(graphics, sketch.width * 0.75 - 100, sketch.height / 2);
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
