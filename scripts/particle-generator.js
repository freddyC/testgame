
/*
  particleTypes = [
    {
      density: 6,
      image: MYGAME.images['images/<NAME>.png'],
      center: {
        x: 300,
        y: 300
      },
      size: {
        mean: 12,
        stdev: 3
      },
      speed: {
        mean: 300,
        stdev: 70
      },
      lifetime: {
        mean: 0.25,
        stdev: 0.1
      }
    }
  ]
  emitTime = time the particle emitter emits particles
*/

MYGAME.particleEmitter = function (particleTypes, emitTime) {
  'use strict';

  var systems = []
    , explosionPoints = []
    ;

  particleTypes.forEach(function (type) {
    systems.push(particleSystem(type, MYGAME.graphics));
  })

  function explode(point) {
    explosionPoints.push({point: point, timeleft: emitTime});
  };

  function update(time) {
    var elapsedSeconds = time / 1000;

    systems.forEach(function (s) {
      s.update(elapsedSeconds);
    })


    explosionPoints.filter(function (p) {
      systems.forEach(function (s) {
        for(var i = 0; i < s.density; ++i) {
          s.create(JSON.parse(JSON.stringify(p.point)));
        }
      })
      p.timeleft -= elapsedSeconds;
      return p.timeleft > 0
    })

  };

  function render() {
    systems.forEach(function (s) {
      s.render();
    })
  };

  return {
    explode: explode,
    update: update,
    render: render
  };
};

