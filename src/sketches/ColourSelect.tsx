import * as ml5 from 'ml5';
import p5 from 'p5';
import inconsolata from '../fonts/inconsolata.ttf';

type CustomML5Hand = {
  index_finger_tip: {
    x: number;
    y: number;
  };
  thumb_tip: {
    x: number;
    y: number;
  };
};

type CustomML5HandPose = {
  detectStart: (h: p5.MediaElement, c: (r: CustomML5Hand[]) => void) => void;
};

export type Colour = 'red' | 'green' | 'blue';

export const ColourSelect = (sketch: p5, colour: Colour) => {
  let handPose: CustomML5HandPose;
  let font: p5.Font;

  sketch.preload = () => {
    font = sketch.loadFont(inconsolata);
    handPose = ml5.handPose({ maxHands: 1 });
  };

  let video: p5.MediaElement;

  let hands: CustomML5Hand[] = [];

  function gotHands(results: CustomML5Hand[]) {
    hands = results;
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const padding = 60;
  const videoWidth = 550;
  const videoHeight = 340;

  sketch.setup = async () => {
    sketch.createCanvas(videoWidth / 3, videoHeight + padding);

    video = sketch.createCapture('video') as p5.MediaElement;
    video.size(videoWidth, videoHeight);
    video.hide();

    await delay(3000);

    handPose.detectStart(video, gotHands);

    sketch.textFont(font);
    sketch.textSize(20);
    sketch.textAlign(sketch.CENTER);
  };

  function compileFill(c: number) {
    if (colour === 'red') {
      sketch.fill(c, 0, 0);
    } else if (colour == 'green') {
      sketch.fill(0, c, 0);
    } else {
      sketch.fill(0, 0, c);
    }
  }

  const xOffset =
    colour === 'red'
      ? 0
      : colour === 'green'
        ? -(videoWidth / 3)
        : -(videoWidth * (2 / 3));

  sketch.draw = () => {
    sketch.background(0);
    sketch.text(colour.toUpperCase()[0], sketch.width / 2, padding / 4);
    sketch.image(video, xOffset, padding / 2, videoWidth, videoHeight);

    for (let i = 0; i < hands.length; i++) {
      const hand = hands[i];
      const { index_finger_tip: indexFingerTip, thumb_tip: thumbTip } = hand;
      if (
        !isCoordinateOnCanvas(indexFingerTip.x + xOffset, indexFingerTip.y) ||
        !isCoordinateOnCanvas(thumbTip.x + xOffset, thumbTip.y)
      ) {
        continue;
      }

      const d = sketch.dist(
        thumbTip.x,
        thumbTip.y,
        indexFingerTip.x,
        indexFingerTip.y,
      );

      const c = sketch.round(
        sketch.map(d, 0, sketch.height - padding * 2, 0, 256, true),
      );

      compileFill(c);
      sketch.noStroke();
      sketch.circle(thumbTip.x + xOffset, thumbTip.y + padding / 2, 10);
      sketch.circle(
        indexFingerTip.x + xOffset,
        indexFingerTip.y + padding / 2,
        10,
      );

      sketch.fill('white');
      sketch.text(c, sketch.width / 2, sketch.height - padding / 6);
    }
  };

  const isCoordinateOnCanvas = (x: number, y: number) => {
    return x >= 0 && x <= sketch.width && y >= 0 && y <= sketch.height;
  };
};
