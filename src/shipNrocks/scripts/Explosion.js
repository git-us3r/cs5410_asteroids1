// Explosion
// 
// Uses particle-system.js
/////

// An explosion consists of at least one particle system.
// Generally, several particle systems make up a single explosion effect.
/////

var Explosion = (function(){
	
	var that = {},
		systemGen = {};

	// TODO... parameters to determine the duration, expansion, intensity, and images of the explosion.
	that.explosionParameters = function (_specs, _graphics){

		specs : _specs || [],
		graphics : _graphics || {},
	};


	that.spec = function (_image, _width, _height, _center, _speed_mean, _speed_std, _lifetime_mean, _lifetime_std, _lifetime){

		image : _image,
		width : _width,
		height : _height,
		center : _center,
		speed_std : _speed_std,
		speed_mean : _speed_mean,
		lifetime : _lifetime,
		lifetime_mean : _lifetime_mean,
		lifetime_std : _lifetime_std
	};



	that.setExplosion = function(explosionParameters){

		// TODO
		var explosion = {},
			particleSystems = [];

		// initialize the systems
		for (var i = 0; i < specs.length; i++){

			// add a new system for each element of the explosion.
			particleSystems.push(particleSystem(specs[i], graphics));
		}

		// Set the particles
		explosion.particleSystems = particleSystems;


		// Wrap the update function to work with several systems
		explosion.update = function(elapsedTime){

			explosion.particleSystems.forEach(function(element, index, array){

				element.update(elapsedTime);
			});
		};


		// Wrap the render function
		explosion.render = function(){

			explosion.particleSystems.forEach(function(element, index, array){

				element.render();
			});
		};


		return explosion;
	};

	return that;
});