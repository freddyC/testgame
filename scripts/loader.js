var MYGAME = {
  images : {},
  status : {
    preloadRequest : 0,
    preloadComplete : 0
  }
};

//------------------------------------------------------------------
// Wait until the browser 'onload' is called before starting to load
// any external resources.  This is needed because a lot of JS code
// will want to refer to the HTML document.
//------------------------------------------------------------------
window.addEventListener('load', function() {
  console.log('Loading resources...');
  Modernizr.load([
    {
      load : [
        'preload!img/redstar.png',
        'preload!scripts/tools.js',
        'preload!scripts/renderer.js',
        'preload!scripts/marker.js',
        'preload!scripts/shaded-region.js',
        'preload!scripts/particle-system.js',
        'preload!scripts/particle-generator.js',
        'preload!scripts/input.js',
        'preload!scripts/scores.js',
        'preload!scripts/game-controller.js',
        'preload!scripts/game-loop.js',
        'preload!scripts/nav.js'
      ],
      complete : function() {
        console.log('All files requested for loading...');
      }
    }
  ]);
}, false);

// Extend yepnope with our own 'preload' prefix that...
// * Tracks how many have been requested to load
// * Tracks how many have been loaded
// * Places images into the 'images' object
yepnope.addPrefix('preload', function(resource) {

  MYGAME.status.preloadRequest += 1;
  var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
  resource.noexec = isImage;
  resource.autoCallback = function(e) {
    if (isImage) {
      var image = new Image();
      image.src = resource.url;
      MYGAME.images[resource.url] = image;
    }
    MYGAME.status.preloadComplete += 1;

        // When everything has finished preloading, go ahead and start the game
    if (MYGAME.status.preloadComplete === MYGAME.status.preloadRequest) {
      console.log('Preloading complete!');

    }
  };

  return resource;
});

// Extend yepnope with a 'preload-noexec' prefix that loads a script, but does not execute it.  This
// is expected to only be used for loading .js files.
yepnope.addPrefix('preload-noexec', function(resource) {
  resource.noexec = true;
  return resource;
});
