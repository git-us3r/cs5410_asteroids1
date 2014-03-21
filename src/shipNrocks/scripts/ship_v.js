// requires 2dVector.js

function Ship(){
	
	var that = {};


	that.image = null;
	that.width = 50;
	that.height = 50;
	that.center = {x:100, y:100};				// vector

	that.lifespan = null;						// null is infinity .. ?
	that.age = null;							// null is ageless
	that.visible = false;						// false isn't true

	that.rotation = 0;
	
	that.truRotation = function(){

		return that.rotation - Math.PI/2;

	}; 	


	that.inertiaVector = {x: 0, y: 0};					// points in the direction of motion. Updated with motion.
	that.directionVector = {x: 0, y: 0};					// Points in the nose direction (unit vector)
	that.thrustVector = {x: 0, y: 0};						// Also
	that.accelerationVector = {x: 0, y: 0};
	that.rotateRate = 3;
	that.thrustRate = 0;						// set in client
	that.maxThrustRate = 8;
	//	that.inMotion = false;					// irrelevant given motionMagnitude
	that.motionMagnitude = 0;



	
	that.setDirectionVector = function(){			// Unit vector

		// that.directionVector.x = Math.cos(that.rotate());
		//that.directionVector.y = Math.sin(that.rotate());
		that.directionVector = Vector2d.vectorFromAngle(that.truRotation());

	};

	
	

	

	that.setThrustVector = function(){

		/*
		that.thrustVector.x = Math.abs(that.thrustRate) * that.directionVector.x;
		that.thrustVector.y = Math.abs(that.thrustRate) * that.directionVector.y;

		if(that.thrustVector.x < 0 || that.thrustVector.y < 0){

			console.log(that.thrustVector.x + ", " + that.thrustVector.y);
		}
		*/

		that.thrustVector = Vector2d.scale( Math.abs(that.thrustRate), that.directionVector);

	};


	

	that.setAccelerationVector = function(){

		// accelerationVector = inertiaVector + thrustVector

		// that.accelerationVector.x = that.inertiaVector.x + that.thrustVector.x;
		// that.accelerationVector.y = that.inertiaVector.y + that.thrustVector.y;
		that.accelerationVector = Vector2d.add(that.inertiaVector, that.thrustVector);
	};



	that.move = function(timeElapsed, canvasDim){

		//var dx = timeElapsed * that.accelerationVector.x,
		//	dy = timeElapsed * that.accelerationVector.y;

		var changeInMotion = Vector2d.scale(timeElapsed, that.accelerationVector);

		//that.motionMagnitude = Math.sqrt(Math.pow(dx,2 ) + Math.pow(dy, 2));
		that.motionMagnitude = Vector2d.magnitude(changeInMotion);



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
		if (that.motionMagnitude !== 0)
		{
			that.center = Vector2d.add(that.center, changeInMotion);
		}




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
		that.inertiaVector = that.accelerationVector;

		// around here is where the friction could be implemented ... later: this is forbidden for now.

	};



	////
	// Input functions
	///

	that.rotateRight = function(elapsedTime, code) {
			
			that.rotation += that.rotateRate * elapsedTime;	// in radians
			//console.log(that.rotation + ", " + that.rotation * 180 / Math.PI);

			//console.log(that.rotation + ", " + Math.cos((Math.abs(that.rotation) % 360) * (Math.PI/180)));
	};
		
	that.rotateLeft = function(elapsedTime, code) {

			that.rotation -= that.rotateRate * elapsedTime;
			//console.log(that.rotation + ", " + that.rotation * 180 / Math.PI);

	};


	that.thrustAction = function(elapsedTime, code){

		if(code !== -1){

			if(that.thrustRate < that.maxThrustRate){

				that.thrustRate += 1 / (Math.max(that.thrustRate, 2));
			}

		}else {

			that.thrustRate = 0;
		}
	};



	that.update = function(elapsedTime, canvasDim){

		//set vectors
		that.setDirectionVector();
		that.setThrustVector();
		that.setAccelerationVector();

		that.move(elapsedTime, canvasDim);
	};


	that.render = function(_context) {

		_context.save();
			
		_context.translate(that.center.x, that.center.y);

		_context.rotate(that.rotation);
		_context.translate(-that.center.x, -that.center.y);
		
		_context.drawImage(
			that.image, 
			that.center.x - that.width/2, 
			that.center.y - that.height/2,
			that.width, that.height);
		
		_context.restore();
	};


	return that;
}




