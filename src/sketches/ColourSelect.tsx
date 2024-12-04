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
  let photoGraphics: p5.Graphics;
  let isSaving = false;

  sketch.setup = async function setup() {
    sketch.createCanvas(w * 2, 480);
    sketch.textFont(font);
    sketch.textSize(20);
    sketch.textAlign(sketch.CENTER);

    video = sketch.createCapture('video') as p5.MediaElement;
    video.size(sketch.width / 2, sketch.height);
    video.hide();

    graphics = sketch.createGraphics(sketch.width / 4, sketch.height / 2);
    photoGraphics = sketch.createGraphics(video.width, video.height);

    await delay(waitForML5);
    isLoading = false;

    handPose.detectStart(video, gotHands);
  };

  let isFinished = false;
  let eventTime = 0;

  const saveButton = sketch.select('.save-image');
  saveButton?.mouseClicked(async () => {
    if (!graphics) {
      return;
    }
    saveButton.hide();
    isSaving = true;
    const graphicsCanvas = graphics.elt;
    const dataURL = graphicsCanvas.toDataURL('image/png');
    const teamName = localStorage.getItem('teamName');
    const teamId = localStorage.getItem('teamId');
    await uploadBase64Image(dataURL, 'painting', teamName, teamId);
    eventTime = sketch.millis();
  });

  const doneButton = sketch.select('.done');
  async function takePhoto() {
    photoGraphics = sketch.createGraphics(video.width, video.height);
    photoGraphics.image(video, 0, 0, video.width, video.height);
    isFinished = true;
    const dataURL = photoGraphics.elt.toDataURL('image/png');
    const teamName = localStorage.getItem('teamName');
    const teamId = localStorage.getItem('teamId');
    await uploadBase64Image(dataURL, 'team-photo', teamName, teamId);
    doneButton?.show();
  }

  sketch.draw = async () => {
    sketch.background(0);

    if (isLoading) {
      sketch.fill('white');
      sketch.text('Loading...', sketch.width / 2, sketch.height / 2);
      return;
    }

    if (isFinished) {
      sketch.image(photoGraphics, 0, 0, sketch.width / 2, sketch.height);
    } else {
      sketch.image(video, 0, 0, sketch.width / 2, sketch.height);
    }

    if (isSaving && !isFinished) {
      const elapsedTime = sketch.millis() - eventTime;
      const timer = (5000 - elapsedTime) / 1000;

      sketch.push();
      sketch.fill('white');
      sketch.textSize(28);
      sketch.text(
        'Taking team photo in:',
        sketch.width / 4,
        sketch.height / 2 - 50,
      );
      sketch.text(sketch.ceil(timer), sketch.width / 4, sketch.height / 2 + 50);
      sketch.pop();

      if (timer < 0) {
        await takePhoto();
      }
    }

    graphics.push();
    graphics.stroke('white');
    graphics.noFill();
    graphics.rect(0, 0, graphics.width, graphics.height);
    graphics.pop();
    sketch.image(graphics, sketch.width * 0.75 - 100, sketch.height / 2);

    if (!isSaving) {
      drawInstructions(sketch);

      drawQuadrants(sketch, currentColour);
      hands.forEach((hand) => {
        if (hand.role === 'painter') {
          hand.graphicBuffer = graphics;
        }
        hand.draw(currentColour);
      });
    }
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
