// Renderable

function Renderable(){
	
	var that = {};

	that.image = null;
	that.size = null;
	that.center = {x:null, y:null};				// vector
	that.direction = {x : null, y : null};		// vector
	that.rotation = null;						// radians
	that.speed = null;							// scalar
	that.lifespan = null;
	that.age = null;


	////
	// FUNCTIONS
	///////

	that.update = function(elapsedTime){

		// TODO
	};


	that.render = function(context){

		// TODO
	};


	return that;

}


function Controllable(){
	
	var that = Renderable();		// inherit ... sort of


	////
	// Additional functions
	//////


	// TODO
	that.rotateRight = function(elapsedTime){};
	that.rotateLeft = function(elapsedTime){};

	that.moveRight = function(elapsedTime){};
	that.moveLeft = function(elapsedTime){};
	that.moveUp = function(elapsedTime){};
	that.moveDown = function(elapsedTime){};
	that.moveTo = function(elapsedTime){};

	return that;

}