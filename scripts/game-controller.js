
MYGAME.controller = (function () {

// declare objects here

  var score
    , level
    , exploder
    , multiplier
    , baseScore
    ;

  function init () {
    MYGAME.isActive = true;
    multiplier = 1;
    baseScore = 100;
    score = 0;
    level = 1;
    exploder = particleInit();
    MYGAME.ShadedField.init();
    MYGAME.Marker.init();
    MYGAME.Keyboard.Down = [];
    MYGAME.Keyboard.Up = [];
  }

  function run () {
    MYGAME.isActive = true;
    multiplier = 1;
    baseScore = 100;
    score = 0;
    level = 1;
    exploder = particleInit();
    MYGAME.ShadedField.init();
    MYGAME.Marker.init();
    MYGAME.Keyboard.Down = [];
    MYGAME.Keyboard.Up = [];
  }


  function update (elapsedTime) {
    MYGAME.ShadedField.update(level);
    MYGAME.Marker.update(elapsedTime);
    exploder.update(elapsedTime);
  }

  function render () {
    MYGAME.Graphics.clear();
    drawPlayingField();
    MYGAME.ShadedField.render();
    MYGAME.Marker.render();
    renderStats();
    exploder.render();
  }

  function particleInit () {
    return MYGAME.particleEmitter([
      {
        density: 6,
        direction: Random.PointOnUnitCircle(),
        image: MYGAME.images['img/redstar.png'],
        size: {
          mean: 12,
          stdev: 3
        },
        speed: {
          mean: 100,
          stdev: 70
        },
        lifetime: {
          mean: 0.25,
          stdev: 0.1
        }
      }], 2
    );
  }


  function drawPlayingField () {
    MYGAME.Graphics.context.beginPath();
    MYGAME.Graphics.context.lineWidth="10";
    MYGAME.Graphics.context.strokeStyle = "black";
    MYGAME.Graphics.context.rect(110, 350, 780, 300);
    MYGAME.Graphics.context.stroke();
  }

  function renderStats () {
    MYGAME.Graphics.drawObject({
      font: '30px Arial',
      color: '#FF0000',
      text: 'Score: ' + score,
      x: 800,
      y: 75
    });

    MYGAME.Graphics.drawObject({
      font: '30px Arial',
      color: '#FF0000',
      text: 'Level: ' + level,
      x: 800,
      y: 150
    });
  }

  function levelUp (x) {
    score += multiplier * baseScore;

    if (level < 6) {
      level++;
      multiplier += 0.2;
    }
    exploder.explode({x:x, y:100});
    var bell = new Audio('sounds/bell.mp3');
    bell.play();
  }

  function endGame () {
    MYGAME.isActive = false;
  }

  function getScore () {
    return score;
  }

  return {
    init    : init,
    run     : run,
    update  : update,
    render  : render,
    levelUp : levelUp,
    endGame : endGame,
    getScore: getScore
  }
}())