import './App.css';
import React, { useRef, useEffect } from 'react';

function App() {

  const bg1 = useRef(null);
  const bg2 = useRef(null);
  const fg1 = useRef(null);
  const fg2 = useRef(null);
  const redQueen_alice_sprite = useRef(null);

  useEffect(() => {
    var sceneryFrames = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' }
    ];
  
    var sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity
    };
  
    var sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity
    };
  
    var spriteFrames = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-100%)' }
    ];

    var background1Movement = bg1.current.animate(sceneryFrames, sceneryTimingBackground);
    background1Movement.currentTime = background1Movement.effect.getTiming().duration / 2;

    var background2Movement = bg2.current.animate(sceneryFrames, sceneryTimingBackground);

    var foreground1Movement = fg1.current.animate(sceneryFrames, sceneryTimingForeground);
    foreground1Movement.currentTime = foreground1Movement.effect.getTiming().duration / 2;

    var foreground2Movement = fg2.current.animate(sceneryFrames, sceneryTimingForeground);

    const redQueen_alice = redQueen_alice_sprite.current.animate(
      spriteFrames, {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    });

    const sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

    const adjustBackgroundPlayback = function () {
      if (redQueen_alice.playbackRate < .8) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = redQueen_alice.playbackRate / 2 * -1;
        });
      } else if (redQueen_alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = redQueen_alice.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.playbackRate = 0;
        });
      }
    }
    adjustBackgroundPlayback();

    setInterval(function () {
      if (redQueen_alice.playbackRate > .4) {
        redQueen_alice.playbackRate *= .9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    var goFaster = function () {
      redQueen_alice.playbackRate *= 1.1;
      adjustBackgroundPlayback();
    }

    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

  }, [])

  return (
    <div className="wrapper" >
      <div className="sky" />
      <div className="earth">
        <div id="red-queen_and_alice" >
          <img id="red-queen_and_alice_sprite" ref={redQueen_alice_sprite} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." />
        </div>
      </div>
      <div className="scenery" id="foreground1" ref={fg1}>
        <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={fg2}>
        <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
        <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background1" ref={bg1}>
        <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
        <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
        <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background2" ref={bg2}>
        <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />
        <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
        <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
      </div>
    </div>
  );
}

export default App;
