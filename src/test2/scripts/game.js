// The GAME variable exists since loader was executed.

GAME.gameLoop = function(time){


	GAME.elapsedTime = time - GAME.lastTimeStamp;
	GAME.lastTimeStamp = time;

	GAME.updateAsteroid(GAME.elapsedTime / 1000, {x: GAME.canvas.width, y: GAME.canvas.height}); // elapsedTime is now in seconds.
	GAME.renderAsteroid(GAME.context);

	requestAnimationFrame(GAME.gameLoop);

};


GAME.initialize = function(){

	GAME.canvas = document.getElementById('canvas');
	GAME.context = GAME.canvas.getContext('2d');


	// A single asteroid for now .. this is just to test the motion... then the vectors must be implemented nicely.
	GAME.ast = Asteroid();
	GAME.ast.image = GAME.images['images/asteroid1.jpg'];
	GAME.ast.width = 50;
	GAME.ast.height = 50;
	GAME.ast.rotation = 0;
	GAME.ast.center = {x: 100, y: 100};
	GAME.ast.direction = {x: 1, y: 1};		// not a unit vector!
	GAME.ast.speed = 60;
	GAME.ast.visible = true;

	// A single asteroid for now .. this is just to test the motion... then the vectors must be implemented nicely.
	GAME.ast2 = Asteroid();
	GAME.ast2.image = GAME.images['images/asteroid1.jpg'];
	GAME.ast2.width = 50;
	GAME.ast2.height = 50;
	GAME.ast2.rotation = 0;
	GAME.ast2.center = {x: 100, y: 100};
	GAME.ast2.direction = {x: 1, y: 2};		// not a unit vector!
	GAME.ast2.speed = 60;
	GAME.ast2.visible = true;


	

	GAME.updateAsteroid = function(elapsedTime, canvasDim){

		GAME.ast.update(elapsedTime, canvasDim);
		GAME.ast2.update(elapsedTime, canvasDim);
	};



	GAME.renderAsteroid = function(ctx){

		GAME.ast.render(ctx);
		GAME.ast2.render(ctx);

	};


	GAME.elapsedTime = 0;
	GAME.lastTimeStamp = performance.now();

	requestAnimationFrame(GAME.gameLoop);

};
