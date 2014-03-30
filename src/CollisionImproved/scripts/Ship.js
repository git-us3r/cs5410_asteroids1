// requires 2dVector.js

var Ship = function( _image, _width, _height, _center, _rotation, _visible, _maxThrustRate, _rotationRate){
	
	var that = Spec.create(_image, _width, _height, _center, _rotation),
		inertiaVector = {x: 0, y: 0},			// points in the direction of motion. Updated with motion.
		directionVector = {x: 0, y: 0},			// Points in the nose direction (unit vector)
		thrustVector = {x: 0, y: 0},
		accelerationVector = {x: 0, y: 0},
		thrustRate = 0,
		speed = 0,
		maxAcceleration = 350,
		minAcceleration = 1.6;

	that.direction = directionVector;
	that.visible = _visible;						// false isn't true	
	that.rotationRate = _rotationRate;	
	that.maxThrustRate = _maxThrustRate;


	function truRotation(){

		return that.rotation - Math.PI/2;

	}


	function getThrustRate(){

		return that.thrustRate;
	}


	function setDirectionVector(){			// Unit vector

		directionVector = Vector2d.vectorFromAngle(truRotation());

	}


	

	function setThrustVector(){

		thrustVector = Vector2d.scale( Math.abs(thrustRate), directionVector);

	}



	

	function setAccelerationVector(){

		accelerationVector = Vector2d.add(inertiaVector, thrustVector);
		
		// Cap acceleration to smooth game play (not too fast please)
		if (Vector2d.magnitude(accelerationVector) > maxAcceleration){

			accelerationVector = Vector2d.scale(maxAcceleration, Vector2d.getDirection(accelerationVector));
		}
		
	}




	function move(timeElapsed, canvasDim){


		// change in velocity ... fix
		var velocity = Vector2d.scale(timeElapsed, accelerationVector);

		//that.speed = Math.sqrt(Math.pow(dx,2 ) + Math.pow(dy, 2));
		speed = Vector2d.magnitude(velocity);

		
		// move
		that.center = Vector2d.add(that.center, velocity);


		// Wrapping
		(function wrapAroundCanvas(){

			// Horizontal Wrap
			if(that.center.x > (canvasDim.x + that.width)) {

			that.center.x = 0;

			}
			else if(that.center.x < (-that.width)) {

				that.center.x = canvasDim.x;

			}


			// Vertical Wrap
			if(that.center.y > (canvasDim.y + that.height)) {

				that.center.y = 0;

			}
			else if(that.center.y < (-that.width)) {

				that.center.y = canvasDim.y;

			}

		}());


		// Now, the iniertia vector points in the direction of current motion.
		inertiaVector = accelerationVector;
	}



	////
	// Input functions: bind with keyboard object.
	///

	that.rotateRight = function(elapsedTime, code) {
			
			that.rotation += that.rotationRate * elapsedTime;
	};



		
	that.rotateLeft = function (elapsedTime, code) {

			that.rotation -= that.rotationRate * elapsedTime;

	};





	function thrustAction(elapsedTime, code){

		if(code !== -1){

			thrustRate = that.maxThrustRate;

		}else {
			thrustRate = 0;
			// friction ?? 
		}
	}

	// Hackitty hack
	that.thrustAction = thrustAction;



	function update(elapsedTime, canvasDim){

		//set vectors
		setDirectionVector();
		setThrustVector();
		setAccelerationVector();
		move(elapsedTime, canvasDim);
		that.direction = directionVector;
	}
	that.update = update;


	return that;
};




