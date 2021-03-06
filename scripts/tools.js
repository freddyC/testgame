var Random = (function() {
  'use strict';

  var Double = function () {
    return Math.random();
  }

  var RangeInt = function (min, max) {
    var range = max - min + 1;
    return Math.floor((Math.random() * range) + min);
  }

  var RangeDouble = function (min, max) {
    var range = max - min + 1;
    return (Math.random() * range) + min;
  }

  var PointOnUnitCircle = function () {
    var angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
  }


  ////////////////////////////////////////
  // This function is from DEAN MATHIAS
  ////////////////////////////////////////
  // This is used to give a small performance optimization in generating gaussian random numbers.
  var usePrevious = false
    , y2
    ;
  // Generate a normally distributed random number.
  // NOTE: This code is adapted from a wiki reference I found a long time ago.  I originally
  // wrote the code in C# and am now converting it over to JavaScript.
  var Gaussian = function (mean, stdDev) {
    if (usePrevious) {
      usePrevious = false;
      return mean + y2 * stdDev;
    }
    usePrevious = true;
    var x1 = 0
      , x2 = 0
      , y1 = 0
      , z = 0
      ;
    do {
      x1 = 2 * Math.random() - 1;
      x2 = 2 * Math.random() - 1;
      z = (x1 * x1) + (x2 * x2);
    } while (z >= 1);

    z = Math.sqrt((-2 * Math.log(z)) / z);
    y1 = x1 * z;
    y2 = x2 * z;
    return mean + y1 * stdDev;
  }

  return {
    Double: Double,
    RangeInt: RangeInt,
    RangeDouble: RangeDouble,
    PointOnUnitCircle: PointOnUnitCircle,
    Gaussian: Gaussian
  }

}());

var Distance = function ( x1, y1, x2, y2) {
  return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

var DistFromPoints = function (p1, p2) {
  return Distance(p1.x, p1.y, p2.x, p2.y);
}
