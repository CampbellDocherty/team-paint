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

export const ColourSelect = (sketch: p5) => {
  let handPose: CustomML5HandPose;

  sketch.preload = () => {
    ml5.p5Utils.methodsToPreload['handPose'];
    handPose = ml5.handPose({ maxHands: 1 });
  };

  let video: p5.MediaElement;

  let hands: CustomML5Hand[] = [];

  function gotHands(results: CustomML5Hand[]) {
    hands = results;
  }

  sketch.setup = () => {
    sketch.createCanvas(640, 480);

    video = sketch.createCapture('video') as p5.MediaElement;
    video.size(sketch.width, sketch.height);
    video.hide();

    handPose.detectStart(video, gotHands);
  };

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
      const r = sketch.map(d, 0, 255, 0, sketch.height);

      sketch.fill(r, 0, 0);
      sketch.noStroke();
      sketch.circle(thumbTip.x, thumbTip.y, 10);
      sketch.circle(indexFingerTip.x, indexFingerTip.y, 10);
    }
  };
};
