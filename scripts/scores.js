
MYGAME.Scores = (function () {
  var scores
    , storageName = 'testGame'
    , limit = 5
    ;

  function fetchScores() {
    scores = [];
    if (localStorage[storageName]) {
      scores = JSON.parse(localStorage[storageName])
    }
    return scores;
  }


  var AddScore = function (scoreObj) {
    fetchScores();
    scores.push(scoreObj)
    scores.sort(function (a, b) {
      return a.score < b.score;
    })

    scores = scores.slice(0, limit);
    localStorage[storageName] = JSON.stringify(scores);
  }

  function worstScore () {
    var s = fetchScores();
    var low;
    if (s.length < 5) {
      low = 0;
    } else {
      low = s[s.length -1].score;
    }
    return low;
  }

  return {
    Add: AddScore,
    Get: fetchScores,
    worstScore: worstScore
  }
}());