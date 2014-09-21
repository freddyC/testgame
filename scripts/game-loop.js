

MYGAME.GameLoop = (function () {
  'use strict';

  var previousTimeStamp;

  function gameLoop (now) {
    if (!MYGAME.isActive) return endGame();

    var elapsedTime = now - previousTimeStamp;
    previousTimeStamp = now;

    update(elapsedTime, function () {
      render(function () {
        requestAnimationFrame(gameLoop);
      });
    });
  }

  function update (elapsed, cb) {
   MYGAME.controller.update(elapsed);
    cb();
  }

  function render (cb) {
    MYGAME.controller.render();
    cb();
  };

  function start() {
    MYGAME.controller.run();
    previousTimeStamp = performance.now();
    requestAnimationFrame(gameLoop);
  }

  function endGame() {
    if (MYGAME.controller.getScore() > MYGAME.Scores.worstScore()) {
      var person = prompt("Please enter your name")
        , score = MYGAME.controller.getScore()
        ;

      MYGAME.Scores.Add({name: person, score: score});
    }
    MYGAME.Nav.showScores();
  }

  return {
    start: start
  }
}())
