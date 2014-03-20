// The GAME variable exists since loader was executed.

GAME.gameLoop = function(time){


	GAME.elapsedTime = time - GAME.lastTimeStamp;
	GAME.lastTimeStamp = time;

	GAME.keyboard.update(GAME.elapsedTime / 1000);
	GAME.updateShip(GAME.elapsedTime / 1000, {x: GAME.canvas.width, y: GAME.canvas.height}); // elapsedTime is now in seconds.
	GAME.clear();
	GAME.renderShip(GAME.context);

	requestAnimationFrame(GAME.gameLoop);

};


GAME.initialize = function(){

	GAME.canvas = document.getElementById('canvas');
	GAME.context = GAME.canvas.getContext('2d');
	GAME.clear = function(){
	
		GAME.context.save();
		GAME.context.setTransform(1, 0, 0, 1, 0, 0);
		GAME.context.clearRect(0, 0, canvas.width, canvas.height);
		GAME.context.restore();
	};


	GAME.keyboard = Keyboard(KeyEvent.DOM_VK_E);


	// A single asteroid for now .. it is just to test the motion... then the vectors must be implemented nicely.
	GAME.ship = Ship();
	GAME.ship.image = GAME.images['images/ship.jpg'];
	GAME.ship.width = 50;
	GAME.ship.height = 50;
	GAME.ship.rotation = 0;
	GAME.ship.center = {x: 100, y: 100};
	
	GAME.ship.visible = true;

	

	GAME.updateShip = function(elapsedTime, canvasDim){

		GAME.ship.update(elapsedTime, canvasDim);
	};



	GAME.renderShip = function(ctx){

		GAME.ship.render(ctx);

	};


	GAME.keyboard.registerKey(KeyEvent.DOM_VK_E, GAME.ship.thrustAction);
	GAME.keyboard.registerKey(KeyEvent.DOM_VK_S, GAME.ship.rotateLeft);
	GAME.keyboard.registerKey(KeyEvent.DOM_VK_F, GAME.ship.rotateRight);



	GAME.elapsedTime = 0;
	GAME.lastTimeStamp = performance.now();

	requestAnimationFrame(GAME.gameLoop);

};
