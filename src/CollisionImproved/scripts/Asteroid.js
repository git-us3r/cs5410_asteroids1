// A simple asteroid.
function Asteroid(_image, _width, _height, _center, _rotation, _speed, _direction, _visible){

	// /ast = Asteroid(image, width, height, center, roation, speed, visible);
	var that = Spec.create(_image, _width, _height, _center, _rotation);
	
	that.direction = _direction;								// vector
	that.motionVector = {x:0, y:0};
	that.speed = _speed;										// used to control motion
	that.rotateRate = .014;										// worked in the past ...												
	that.lifespan = null;
	that.age = null;
	that.visible = _visible;

	/*

	that.image = null;
	that.width = 50;
	that.height = 50;
	that.center = {x: that.width, y: that.height};				// vector
	that.direction = {x : 1, y : 1};							// vector
	that.motionVector = {x:0, y:0};
	that.speed = 0;												// used to control motion

	that.rotation = 0;											// radians
	that.rotateRate = .014;										// worked in the past ...
												
	that.lifespan = null;
	that.age = null;
	that.visible = false;

	*/


	////
	// FUNCTIONS
	///////

	function adjustBounds (canvasDim){

		// check for bounds
		if(that.center.x > (canvasDim.x + that.width)) {

			that.center.x = 0;

		}
		else if(that.center.x < (-that.width)) {

			that.center.x = canvasDim.x;

		}


		if(that.center.y > (canvasDim.y + that.height)) {

			that.center.y = 0;

		}
		else if(that.center.y < (-that.width)) {

			that.center.y = canvasDim.y;

		}

	}




	that.move = function(elapsedTime, canvasDim){

		// that.center.x = (that.center.x + (elapsedTime * that.speed * that.direction.x)) % (canvasDim.x + that.width);	// modular so it wraps
		// that.center.y = (that.center.y + (elapsedTime * that.speed * that.direction.y)) % (canvasDim.y + that.height);

		that.center = Vector2d.add(that.center, Vector2d.scale((elapsedTime * that.speed), that.direction));
		adjustBounds(canvasDim);

	};



	that.update = function(elapsedTime, canvasDim){

		// Hardcoded works fine for now
		that.rotation += that.rotateRate;
		that.move(elapsedTime, canvasDim);

	};

	return that;
	
}