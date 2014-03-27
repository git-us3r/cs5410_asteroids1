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


	// Client Interface: spec.center represents the center of the explosion to be used.
	that.spec = function (_image, 
							_width, 
							_height, 
							expCenter, 
							_speed_mean, 
							_speed_std, 
							_lifetime_mean, 
							_lifetime_std
							){

		return {
			
			image : _image,
			width : _width,
			height : _height,
			center : expCenter,
			speed_std : _speed_std,
			speed_mean : _speed_mean,
			lifetime_mean : _lifetime_mean,
			lifetime_std : _lifetime_std,
		};

	};	

	// Client interface: Depends on that.spec
	that.explosionParameters = function (_specs, _graphics, _duration){

		return {
			specs : _specs || [],
			graphics : _graphics || {},
			duration : _duration
		};
	};



	// Client Interface: depends on that.explosionParamters and particle-system.js
	that.setExplosion = function(explosionParameters){

		// TODO
		var explosion = {};	


		(function init(){
			
			// Member variables.	
			explosion.particleSystems = [];

			explosion.duration = explosionParameters.duration;
			explosion.graphics = explosionParameters.graphics;

			explosion.lifetime = 0;
			explosion.visible = true;



			// initialize the systems
			for (var i = 0; i < explosionParameters.specs.length; i++){

				// add a new system for each element of the explosion.
				explosion.particleSystems.push(

					particleSystem(
						
						explosionParameters.specs[i],
						explosionParameters.graphics
					)
				);
			}


			// Prime the system.
			explosion.particleSystems.forEach(function(system, index, array){

				for (var i = 0; i < 20; i++){

					system.create();
				}
			});



		}());


		// Wrap the update function to work with several systems
		// particle-system does not recreate dead particles
		//////
		explosion.update = function(elapsedTime){

			// Update lifetime
			explosion.lifetime += elapsedTime;	

			// Update if the explosion is alive.
			if(explosion.visible && explosion.lifetime < explosion.duration){

				explosion.particleSystems.forEach(function(element, index, array){

					element.update(elapsedTime);
				});

				// recreate the most common particles in some relative proportion
				// TODO
				explosion.particleSystems[0].create();
				explosion.particleSystems[0].create();
				explosion.particleSystems[0].create();
				explosion.particleSystems[1].create();
				explosion.particleSystems[1].create();

			}
			else if (explosion.visible){

				explosion.visible  = false;
			}
		};


		// Wrap the render function
		explosion.render = function(){

			explosion.particleSystems.forEach(function(element, index, array){

				element.render(explosion.graphics);
			});
		};


		return explosion;
	};

	return that;
}());