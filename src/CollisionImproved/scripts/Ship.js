// requires 2dVector.js

var Ship = function( _image, _width, _height, _center, _rotation, _visible, _maxThrustRate, _rotationRate){
	
	var that = Spec.create(_image, _width, _height, _center, _rotation),
		inertiaVector = {x: 0, y: 0},			// points in the direction of motion. Updated with motion.
		directionVector = {x: 0, y: 0},			// Points in the nose direction (unit vector)
		thrustVector = {x: 0, y: 0},
		accelerationVector = {x: 0, y: 0},
		thrustRate = 0,
		motionMagnitude = 0,
		maxAcceleration = 350,
		minAcceleration = 1.6;

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

		// that.directionVector.x = Math.cos(that.rotate());
		//that.directionVector.y = Math.sin(that.rotate());
		directionVector = Vector2d.vectorFromAngle(truRotation());

	}


	

	function setThrustVector(){

		/*
		that.thrustVector.x = Math.abs(that.thrustRate) * that.directionVector.x;
		that.thrustVector.y = Math.abs(that.thrustRate) * that.directionVector.y;

		if(that.thrustVector.x < 0 || that.thrustVector.y < 0){

			console.log(that.thrustVector.x + ", " + that.thrustVector.y);
		}
		*/

		thrustVector = Vector2d.scale( Math.abs(thrustRate), directionVector);

	}



	

	function setAccelerationVector(){

		// accelerationVector = inertiaVector + thrustVector

		// that.accelerationVector.x = that.inertiaVector.x + that.thrustVector.x;
		// that.accelerationVector.y = that.inertiaVector.y + that.thrustVector.y;
		accelerationVector = Vector2d.add(inertiaVector, thrustVector);

		
		if (Vector2d.magnitude(accelerationVector) > maxAcceleration){

			accelerationVector = Vector2d.scale(maxAcceleration, Vector2d.getDirection(accelerationVector));
		}
		
	}




	function move(timeElapsed, canvasDim){

		//var dx = timeElapsed * that.accelerationVector.x,
		//	dy = timeElapsed * that.accelerationVector.y;



		// change in velocity ... fix
		var changeInMotion = Vector2d.scale(timeElapsed, accelerationVector);

		//that.motionMagnitude = Math.sqrt(Math.pow(dx,2 ) + Math.pow(dy, 2));
		motionMagnitude = Vector2d.magnitude(changeInMotion);



		/*
		if(dx !== 0 ) {
		
			that.center.x += dx;
			that.inMotion = true;

		}

		if(dy !== 0){

			that.center.y += dy;
			that.inMotion = true;
		}

		if(dx === 0 && dy === 0){

			that.inMotion = false;
		}
		*/
		
		that.center = Vector2d.add(that.center, changeInMotion);




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

		// Now, the iniertia vector points in the direction of current motion.
		inertiaVector = accelerationVector;

		/*
		if (Vector2d.magnitude(inertiaVector) > maxAcceleration){

			inertiaVector = Vector2d.scale(maxAcceleration, inertiaVector);
		}
		else if (Vector2d.magnitude(inertiaVector) < minAcceleration){

			inertiaVector = Vector2d.scale(minAcceleration, inertiaVector);	
		}

		// around here is where the friction could be implemented ... later: this is forbidden for now.
		*/
	}

	////
	// Input functions: bind with keyboard object.
	///

	that.rotateRight = function(elapsedTime, code) {
			
			that.rotation += that.rotationRate * elapsedTime;
			//console.log(that.rotation + ", " + that.rotation * 180 / Math.PI);

			//console.log(that.rotation + ", " + Math.cos((Math.abs(that.rotation) % 360) * (Math.PI/180)));
	};



		
	that.rotateLeft = function (elapsedTime, code) {

			that.rotation -= that.rotationRate * elapsedTime;
			//console.log(that.rotation + ", " + that.rotation * 180 / Math.PI);

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
	}
	that.update = update;


	return that;
};




