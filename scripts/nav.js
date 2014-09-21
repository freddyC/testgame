
MYGAME.Nav = (function () {
"use strict";

  var showing;

  function hideAll () {
    $('.display-board').slideUp();
    $('.navers').removeClass('selected');
  }

  function disableNav () {
    $("#show-game").attr("disabled", "disabled");
    $("#show-scores").attr("disabled", "disabled");
    $("#show-credits").attr("disabled", "disabled");
  }

  function enableNav () {
    $("#show-game").removeAttr("disabled");
    $("#show-scores").removeAttr("disabled");
    $("#show-credits").removeAttr("disabled");
  }

  function showGame () {
    if (showing !== 'game') hideAll();
    showing = 'game';
    disableNav();
    $('#show-game').addClass('selected');
    $('#game').show('slow');

    MYGAME.GameLoop.start();
  }

  function showScores () {
    enableNav();
    var scoresList = MYGAME.Scores.Get()
      , scoresEl = $('#scores');
      ;

    scoresEl.empty();

    if (scoresList.length == 0) {
      scoresEl.append('<li>Be the first to leave a score!</li>')
    } else {
      scoresList.forEach(function (s) {
        scoresEl.append('<li>' + s.name + ': ' + s.score + '</li>');
      })
    }
    if (showing !== 'scores') hideAll();
    showing = 'scores';
    $('#show-scores').addClass('selected');
    $('#high-scores').show('slow');
  }

  function showCredits () {
    if (showing !== 'credits') hideAll();
    showing = 'credits';
    $('#show-credits').addClass('selected');
    $('#credits').show('slow');
  }

  return {
    disableNav  : disableNav,
    enableNav   : enableNav,
    showGame    : showGame,
    showScores  : showScores,
    showCredits : showCredits,
    showing     : showing
  }

}());