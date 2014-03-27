//ExplosionLoader.js

var EXP = {
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
				'preload!particle-system-exp.js',
				'preload!Explosion.js',
				'preload!vector2d.js',
				'preload!random.js',
				'preload!keyboard.js',
				'preload!img_exp/fire.png',
				'preload!img_exp/smoke.png',
				'preload!ExplosionDemo.js'
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
	
	EXP.status.preloadRequest += 1;
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;
	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			EXP.images[resource.url] = image;
		}
		
		EXP.status.preloadComplete += 1;
		//console.log(EXP.status);
		
		//
		// When everything has finished preloading, go ahead and start the EXP
		if (EXP.status.preloadComplete === EXP.status.preloadRequest) {
			console.log('Preloading complete!');
			EXP.initialize();
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
