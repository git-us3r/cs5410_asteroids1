// The GAME variable exists since loader was executed.

GAME.gameLoop = function(time){


	GAME.elapsedTime = time - GAME.lastTimeStamp;
	GAME.lastTimeStamp = time;

	GAME.update(GAME.elapsedTime / 1000, {x: GAME.canvas.width, y: GAME.canvas.height}); // cut the lines below ... TODO
	// GAME.keyboard.update(GAME.elapsedTime / 1000);
	// GAME.updateShip(GAME.elapsedTime / 1000, {x: GAME.canvas.width, y: GAME.canvas.height}); // elapsedTime is now in seconds.

	GAME.clear();
	GAME.render(GAME.context);

	requestAnimationFrame(GAME.gameLoop);

};


GAME.initialize = function(){

	GAME.velements = {};
	GAME.canvas = document.getElementById('canvas');
	GAME.context = GAME.canvas.getContext('2d');
	GAME.clear = function(){
	
		GAME.context.save();
		GAME.context.setTransform(1, 0, 0, 1, 0, 0);
		GAME.context.clearRect(0, 0, canvas.width, canvas.height);
		GAME.context.restore();
	};


	var kb = Keyboard(KeyEvent.DOM_VK_E);
	kb.renderable = false;
	GAME.velements['keyboard'] = kb;


	// A single asteroid for now .. it is just to test the motion... then the vectors must be implemented nicely.
	var ship = Ship();
	ship.image = GAME.images['images/ship.jpg'];
	ship.width = 50;
	ship.height = 50;
	ship.rotation = 0;
	ship.center = {x: 100, y: 100};
	
	ship.visible = true;
	ship.renderable = true;

	GAME.velements['ship'] = ship;


	
	// A singel asteroids .. quickly
	var ast = Asteroid();
	ast.image = GAME.images['images/asteroid1.jpg'];
	ast.width = 50;
	ast.height = 50;
	ast.rotation = 0;
	ast.center = {x: 100, y: 100};
	ast.speed = 10;
	
	ast.visible = true;
	ast.renderable = true;

	GAME.velements['asteroid'] = ast;



	
	GAME.update = function(elapsedTime, canvasDim){

		
		// Cite: https://stackoverflow.com/questions/587881/iterating-over-every-property-of-an-object-in-javascript-using-prototype
		for(var velement in GAME.velements) {

		    if(GAME.velements.hasOwnProperty(velement)) {

		    	GAME.velements[velement].update(elapsedTime, canvasDim);
		    }
		}
	};




	GAME.render = function(ctx){

		// Cite: https://stackoverflow.com/questions/587881/iterating-over-every-property-of-an-object-in-javascript-using-prototype
		for(var velement in GAME.velements) {

		    if(GAME.velements.hasOwnProperty(velement)) {

		    	// if object is renderable
		    	if (GAME.velements[velement].renderable) {

					GAME.velements[velement].render(ctx);
		    	}
		    }
		}

	};


	// There needs to be a function to do this with client requests.
	GAME.velements['keyboard'].registerKey(KeyEvent.DOM_VK_E, GAME.velements['ship'].thrustAction);
	GAME.velements['keyboard'].registerKey(KeyEvent.DOM_VK_S, GAME.velements['ship'].rotateLeft);
	GAME.velements['keyboard'].registerKey(KeyEvent.DOM_VK_F, GAME.velements['ship'].rotateRight);



	GAME.elapsedTime = 0;
	GAME.lastTimeStamp = performance.now();

	requestAnimationFrame(GAME.gameLoop);

};
