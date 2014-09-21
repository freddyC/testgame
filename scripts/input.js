// Each object is responsible for setting it's own handler then
// on that object's update check for key events that match
// and update the state based on the action (click, down, up, keydown, keyup) taken


MYGAME.Keyboard = {
  Down  : [],
  Up    : []
};


$(window).keydown(function (e) {
  if (!MYGAME.isActive) {
    if (e.which == 13) {
      MYGAME.Nav.showGame();
    }
    return;
  }
  MYGAME.Keyboard.Down.push(e.which);
})


$(window).keyup(function (e) {
  MYGAME.Keyboard.Up.push(e.which);
})