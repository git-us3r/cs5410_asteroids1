var EXPD = {
	images : {},

	status : {
		preloadRequest : 0,
		preloadComplete : 0
	}
};

//------------------------------------------------------------------
//
// Wait until the browser 'onload' is called before starting to load
// any external resources.  This is needed because a lot of JS code
// will want to refer to the HTML document.
//
//------------------------------------------------------------------
window.addEventListener('load', function() {
	console.log('Loading resources...');
	Modernizr.load([
		{
			load : [
				'preload!scripts/Vector2d.js',
				'preload!scripts/random.js',
				'preload!scripts/Spec.js',
				'preload!scripts/ship_v.js',
				'preload!scripts/asteroid_v.js',
				'preload!scripts/keyboard.js',
				'preload!images/ship.jpg',
				'preload!images/asteroid1.jpg',
				'preload!images/fire.png',
				'preload!images/smoke.png',
				'preload!scripts/particle-system-exp.js',
				'preload!scripts/CollisionDetector.js',
				'preload!scripts/Explosion.js',
				'preload!scripts/ExplosionFactory.js',
				'preload!scripts/CollisionDemo.js'
			],
			complete : function() {
				console.log('All files requested for loading...');
			}
		}
	]);
}, false);

//
// Extend yepnope with our own 'preload' prefix that...
// * Tracks how many have been requested to load
// * Tracks how many have been loaded
// * Places images into the 'images' object
yepnope.addPrefix('preload', function(resource) {
	console.log('preloading: ' + resource.url);
	
	EXPD.status.preloadRequest += 1;
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;
	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			EXPD.images[resource.url] = image;
		}
		
		EXPD.status.preloadComplete += 1;
		//console.log(EXPD.status);
		
		//
		// When everything has finished preloading, go ahead and start the EXPD
		if (EXPD.status.preloadComplete === EXPD.status.preloadRequest) {
			console.log('Preloading complete!');
			EXPD.initialize();
		}
	};
	
	return resource;
});


//
// Extend yepnope with a 'preload-noexec' prefix that loads a script, but does not execute it.  This
// is expected to only be used for loading .js files.
yepnope.addPrefix('preload-noexec', function(resource) {
	console.log('preloading-noexec: ' + resource.url);
	resource.noexec = true;
	return resource;
});
