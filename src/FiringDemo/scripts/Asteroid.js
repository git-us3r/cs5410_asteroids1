// A simple asteroid.
var Asteroid = (function(){

	// /ast = Asteroid(image, width, height, center, roation, speed, visible);
	var that = {},
		uniqueId = 0;

	////
	// FUNCTIONS
	///////

	function create(_image, _width, _height, _center, _rotation, _speed, _direction, _visible){

		var ast = Spec.create(_image, _width, _height, _center, _rotation);

		ast.id = uniqueId;
		uniqueId++;

		ast.direction = _direction;								// vector
		ast.motionVector = {x:0, y:0};
		ast.speed = _speed;										// used to control motion
		ast.rotateRate = .014;										// worked in the past ...												
		ast.lifespan = null;
		ast.age = null;
		ast.visible = _visible;




		function adjustBounds (canvasDim){

			// check for bounds
			if(ast.center.x > (canvasDim.x + ast.width)) {

				ast.center.x = 0;

			}
			else if(ast.center.x < (-ast.width)) {

				ast.center.x = canvasDim.x;

			}


			if(ast.center.y > (canvasDim.y + ast.height)) {

				ast.center.y = 0;

			}
			else if(ast.center.y < (-ast.width)) {

				ast.center.y = canvasDim.y;

			}

		}




		function move(elapsedTime, canvasDim){

			// that.center.x = (that.center.x + (elapsedTime * that.speed * that.direction.x)) % (canvasDim.x + that.width);	// modular so it wraps
			// that.center.y = (that.center.y + (elapsedTime * that.speed * that.direction.y)) % (canvasDim.y + that.height);

			ast.center = Vector2d.add(ast.center, Vector2d.scale((elapsedTime * ast.speed), ast.direction));
			adjustBounds(canvasDim);

		}


		ast.update = function update(elapsedTime, canvasDim){

			// Hardcoded works fine for now
			ast.rotation += ast.rotateRate;
			move(elapsedTime, canvasDim);

		}

		return ast;
		
	}


	// Expose the create function only .. for now
	return {create : create};
	
}());