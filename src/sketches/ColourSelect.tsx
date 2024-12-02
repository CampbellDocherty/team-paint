import * as ml5 from 'ml5';
import p5 from 'p5';

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

type Colour = 'red' | 'green' | 'blue';

export const ColourSelect = (sketch: p5, colour: Colour) => {
  let handPose: CustomML5HandPose;

  sketch.preload = () => {
    handPose = ml5.handPose({ maxHands: 1 });
  };

  let video: p5.MediaElement;

  let hands: CustomML5Hand[] = [];

  function gotHands(results: CustomML5Hand[]) {
    hands = results;
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  sketch.setup = async () => {
    sketch.createCanvas(640, 480);

    video = sketch.createCapture('video') as p5.MediaElement;
    video.size(sketch.width, sketch.height);
    video.hide();

    await delay(2000);

    handPose.detectStart(video, gotHands);
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

  sketch.draw = () => {
    sketch.background(220);
    sketch.image(video, 0, 0, sketch.width, sketch.height);

    for (let i = 0; i < hands.length; i++) {
      const hand = hands[i];
      const { index_finger_tip: indexFingerTip, thumb_tip: thumbTip } = hand;
      const d = sketch.dist(
        thumbTip.x,
        thumbTip.y,
        indexFingerTip.x,
        indexFingerTip.y,
      );

      const c = sketch.map(d, 0, 255, 0, sketch.height);

      compileFill(c);
      sketch.noStroke();
      sketch.circle(thumbTip.x, thumbTip.y, 10);
      sketch.circle(indexFingerTip.x, indexFingerTip.y, 10);
    }
  };
};
