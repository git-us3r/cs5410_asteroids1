// A simple asteroid.
function Asteroid(){

var that = {};

	that.image = null;
	that.width = null;
	that.height = null;
	that.center = {x:null, y:null};				// vector
	that.direction = {x : null, y : null};		// unit vector
	that.rotation = null;						// radians
	that.rotateRate = null;
	that.speed = null;							// scalar
	that.lifespan = null;
	that.age = null;
	that.visible = false;


	////
	// FUNCTIONS
	///////

	that.move = function(elapsedTime, canvasDim){

		that.center.x = (that.center.x + (elapsedTime * that.speed * that.direction.x)) % (canvasDim.x + that.width);	// modular so it wraps
		that.center.y = (that.center.y + (elapsedTime * that.speed * that.direction.y)) % (canvasDim.y + that.height);

	};



	that.update = function(elapsedTime, canvasDim){

		// Hardcoded works fine for now
		that.rotation += .021;

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