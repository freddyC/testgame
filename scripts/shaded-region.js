
MYGAME.ShadedField = (function () {

  var width
    , height
    , x
    , y
    ;

  function init () {
    width = 700;
    height = 350;
    x = 100;
    y = 325;
  }

  function update (level) {
    var l = level -1
    width = 600 - (l * 100)
    x = ((800 - width) / 2) + 100;
  }

  function render () {
    MYGAME.Graphics.context.beginPath();
    MYGAME.Graphics.context.fillStyle = "#5B7D9B";
    MYGAME.Graphics.context.fillRect(x, y, width, height);
    MYGAME.Graphics.context.stroke();
  }

  function clickRange () {
    var x = (800 - width) / 2;
    x += 100;
    return {
      min: x,
      max: x + width
    }
  }

  return {
    clickRange : clickRange,
    init       : init,
    update     : update,
    render     : render
  }
}())