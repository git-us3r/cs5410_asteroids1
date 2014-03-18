// The GAME variable exists since loader was executed.

GAME.gameLoop = function(time){


	GAME.elapsedTime = time - GAME.lastTimeStamp;
	GAME.lastTimeStamp = time;

	GAME.updateAsteroids(GAME.elapsedTime / 1000); // elapsedTime is now in seconds.
	GAME.renderingManager.renderElements();

	requestAnimationFrame(GAME.gameLoop);

};


GAME.initialize = function(){

	var canvas = document.getElementById('canvas');

	// TODO: describe number and type of asteroids for the rendering manager.

	GAME.renderingManager = RenderingManager(canvas, GAME.images);

	GAME.updateAsteroids = function(elapsedTime){

		GAME.renderingManager.elements.forEach(function(element, index, array){

			element.update(element.moveRight, elapsedTime);
		});
	};


	GAME.elapsedTime = 0;
	GAME.lastTimeStamp = performance.now();

	requestAnimationFrame(GAME.gameLoop);

};
