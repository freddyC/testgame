/*jslint browser: true, white: true */
/*global CanvasRenderingContext2D, MYGAME */

/*
  TEXT -  http://www.w3schools.com/tags/ref_canvas.asp
  TEXT -  http://www.w3schools.com/tags/canvas_drawimage.asp
  obj: {
    font: "30px Arial",
    color: "#FF0000",
    text: "words and crap",
    x: 40
    y: 40
  }


*/


MYGAME.Graphics = (function() {
  'use strict';

  var canvas = $("#canvas")[0]
    , context = canvas.getContext('2d')
    ;

  // Place a 'clear' function on the Canvas prototype, this makes it a part
  // of the canvas, rather than making a function that calls and does it.
  CanvasRenderingContext2D.prototype.clear = function() {
    this.save();
    this.setTransform(1, 0, 0, 1, 0, 0);
    this.clearRect(0, 0, canvas.width, canvas.height);
    this.restore();
  };

  function clear() {
    context.clear();
  }

 function drawObject (obj) {
    context.save();

    if (obj.rotation) {
      context.translate(obj.center.x, obj.center.y);
      context.rotate(obj.rotation);
      context.translate(-obj.center.x, -obj.center.y);
    }

    if (obj.fade) {
      context.globalAlpha = obj.fade;
    }

    if (obj.text) {
      context.font = obj.font;
      context.fillStyle = obj.color;
      context.fillText(obj.text, obj.x, obj.y);
    } else if (obj.image) {
      context.drawImage(
        obj.image,
        obj.center.x - obj.size.width/2,
        obj.center.y - obj.size.height/2,
        obj.size.width, obj.size.height
      );
    }
    context.restore();
  }

  return {
    clear      : clear,
    drawObject : drawObject,
    canvas     : canvas,
    context    : context
  };
}());
