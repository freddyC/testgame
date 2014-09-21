
MYGAME.Marker = (function () {

  var width
    , height
    , x
    , y
    , goRight
    , speed
    , canLevel
    ;

  function init () {
    width = 5;
    height = 300;
    x = 100;
    y = 350;
    goRight = true;
    speed = 1000;
    canLevel = true;
    elapsedTime = 0;
  }

  function update (elapsedTime) {
    move(elapsedTime);
    if (MYGAME.Keyboard.Down.indexOf(32) > -1 && canLevel) {
      var range = MYGAME.ShadedField.clickRange();
      if (range.min < x && range.max > x + width) {
        speed -= 40;
        // canLevel = false;
        MYGAME.controller.levelUp(x + width/2);
      } else {
        MYGAME.controller.endGame();
      }
    }
    MYGAME.Keyboard.Down = [];
  }

  function move (elapsedTime) {
    if (!elapsedTime) elapsedTime = 0;
    var distance = 800 * elapsedTime / speed;

    if (x + distance > 880) {
      goRight = false;
      // canLevel = true;
    } else if (x - distance < 100) {
      goRight = true;
      // canLevel = true;
    }

    if (goRight) {
      x += distance;
    } else {
      x -= distance;
    }
  }

  function getPosition () {
    return x + (width/2);
  }

  function render () {
    MYGAME.Graphics.context.beginPath();
    MYGAME.Graphics.context.fillStyle = 'red';
    MYGAME.Graphics.context.fillRect(x, y, width, height);
    MYGAME.Graphics.context.stroke();
  }

  return {
    init   : init,
    update : update,
    render : render,
    getPosition: getPosition
  }
}())