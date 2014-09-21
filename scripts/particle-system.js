/*jslint browser: true, white: true, plusplus: true */
/*global Tools */

function particleSystem(spec, graphics) {
  'use strict';
  var that = {}
  , particles = []  // Set of all active particles
  ;
  that.density = spec.density;
  //------------------------------------------------------------------
  // This creates one new particle
  //------------------------------------------------------------------
  that.create = function (point) {
    debugger;
    var  size =  Random.Gaussian(spec.size.mean, spec.size.stdev)
      , p = {
          density: spec.density,
          image: spec.image,
          height: size,
          width: size,
          center: point,
          direction: spec.direction,
          speed: Random.Gaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
          rotation: 0,
          lifetime: Random.Gaussian(spec.lifetime.mean, spec.lifetime.stdev),  // How long the particle should live, in seconds
          alive: 0  // How long the particle has been alive, in seconds
        }
      ;
    p.size = Math.max(1, p.size);             // Ensure we have a valid size - gaussian numbers can be negative
    p.lifetime = Math.max(0.01, p.lifetime);  // Same thing with lifetime
    particles.push(p);
  };

  //------------------------------------------------------------------
  // Update the state of all particles.  This includes remove any that
  // have exceeded their lifetime.
  //------------------------------------------------------------------
  that.update = function (elapsedTime) {
    debugger;
    particles = particles.filter(function (particle, i, arr) {
      // update partical data
      arr[i].alive    = particle.alive    + elapsedTime;
      arr[i].center.x = particle.center.x + (elapsedTime * particle.speed * particle.direction.x);
      arr[i].center.y = particle.center.y + (elapsedTime * particle.speed * particle.direction.y);
      arr[i].rotation = particle.rotation + (particle.speed / 500);
      // remove dead particles
      return (particle.alive > particle.lifetime);
    })
  };

  //------------------------------------------------------------------
  // Render all particles
  //------------------------------------------------------------------
  that.render = function () {
    debugger;
    particles.forEach(function (p) {
      MYGAME.Graphics.drawObject(p);
    })
  };

  return that;
}
