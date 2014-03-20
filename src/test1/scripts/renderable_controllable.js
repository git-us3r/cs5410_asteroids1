// Renderable

function Renderable(){
	
	var that = {};

	that.image = null;
	that.width = null;
	that.height = null;
	that.center = {x:null, y:null};				// vector
	that.direction = {x : null, y : null};		// vector
	that.rotation = null;						// radians
	that.rotateRate = null;
	that.speed = null;							// scalar
	that.lifespan = null;
	that.age = null;


	////
	// FUNCTIONS
	///////

	that.update = function(_function, _param){

		_function(_param);

	};


	return that;

}


function Controllable(){
	
	var that = Renderable();		// inherit ... sort of


	////
	// Additional functions
	//////

	// elapsedTime is expected to be in secs.
	that.rotateRight = function(elapsedTime) {
		that.rotation += that.rotateRate * (elapsedTime); 		
	};
		
	that.rotateLeft = function(elapsedTime) {
		that.rotation -= that.rotateRate * (elapsedTime);
	};
	
	that.moveLeft = function(elapsedTime) {
		that.center.x -= that.speed * (elapsedTime);
	};
	
	that.moveRight = function(elapsedTime) {
		//that.center.x += that.speed * (elapsedTime);
		that.center.x = (that.center.x + (that.speed * elapsedTime)) % 600;	// this needs to be dynamic... fix 
	};
	
	that.moveUp = function(elapsedTime) {
		that.center.y -= that.speed * (elapsedTime);
	};
	
	that.moveDown = function(elapsedTime) {
		that.center.y += that.speed * (elapsedTime);
	};
	

	return that;

}