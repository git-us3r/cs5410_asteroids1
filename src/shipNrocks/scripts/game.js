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


	// Only 10 for now ... args can be used to changed that.
	GAME.initializeAsteroids = (function(arg){

		GAME.velements['asteroids'] = [];

		for (var i = 0; i < 7; i++){


			// A singel asteroids .. quickly
			var ast = Asteroid();
			ast.image = GAME.images['images/asteroid1.jpg'];
			ast.width = 50;
			ast.height = 50;
			ast.rotation = 0;

			// randomize location
			ast.center = {
				x: Random.nextRange(ast.width, GAME.canvas.width - ast.width), 
				y: Random.nextRange(ast.height, GAME.canvas.height - ast.height)
			};
			
			// randomize speed
			ast.speed = Random.nextGaussian(50, 20);

			// randomize direction
			ast.direction = Vector2d.vectorFromAngle(Random.nextGaussian(Math.PI, Math.PI));
			
			ast.visible = true;
			ast.renderable = true;

			GAME.velements['asteroids'].push(ast);
		}
	}());



	GAME.velements['explosions'] = [];		// An array of explosions




	GAME.collisionDetection = function(){

		// 
	};



	
	GAME.update = function(elapsedTime, canvasDim){

		GAME.velements['keyboard'].update(elapsedTime, canvasDim);
		GAME.velements['ship'].update(elapsedTime, canvasDim);
		
		for(var i = 0; i < GAME.velements['asteroids'].length; i++){

			if ( GAME.velements['asteroids'][i].visible) {

				GAME.velements['asteroids'][i].update(elapsedTime, canvasDim);				
			}
		}

		GAME.collisionDetection();		// Modifies the state of elements.

		// Here because they could be set inside collisionDetection
		for(var i = 0; i < GAME.velements['explosions'].length; i++){

			// an explosion should have a visible property (which is true as long as at least one of the particles is visible).
			if ( GAME.velements['explosions'][i].visible) {

				GAME.velements['explosions'][i].update(elapsedTime, canvasDim);				
			}
		}

	};




	GAME.render = function(ctx){

		GAME.velements['ship'].render(ctx);

		for(var i = 0; i < GAME.velements['asteroids'].length; i++){

			if ( GAME.velements['asteroids'][i].visible) {

				GAME.velements['asteroids'][i].render(ctx);				
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
