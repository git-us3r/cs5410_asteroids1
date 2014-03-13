/*jslint browser: true, white: true */
/*global CanvasRenderingContext2D, requestAnimationFrame, console, MYGAME */
// ------------------------------------------------------------------
// 
// This is the game object.  Everything about the game is located in 
// this object.
//
// ------------------------------------------------------------------

MYGAME.graphics = (function() {
	'use strict';
	
	var canvas = document.getElementById('canvas-main'),
		context = canvas.getContext('2d');
	
	//------------------------------------------------------------------
	//
	// Place a 'clear' function on the Canvas prototype, this makes it a part
	// of the canvas, rather than making a function that calls and does it.
	//
	//------------------------------------------------------------------
	CanvasRenderingContext2D.prototype.clear = function() {
		this.save();
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.clearRect(0, 0, canvas.width, canvas.height);
		this.restore();
	};
	
	//------------------------------------------------------------------
	//
	// Public function that allows the client code to clear the canvas.
	//
	//------------------------------------------------------------------
	function clear() {
		context.clear();
	}
	
	//------------------------------------------------------------------
	//
	// This is used to create a texture function that can be used by client
	// code for rendering.
	//
	//------------------------------------------------------------------
	function Texture(spec) {
		var that = {};
		
		that.rotateRight = function(elapsedTime) {
			spec.rotation += spec.rotateRate * (elapsedTime / 1000);
		};
		
		that.rotateLeft = function(elapsedTime) {
			spec.rotation -= spec.rotateRate * (elapsedTime / 1000);
		};
		
		that.moveLeft = function(elapsedTime) {
			spec.center.x -= spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveRight = function(elapsedTime) {
			spec.center.x += spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveUp = function(elapsedTime) {
			spec.center.y -= spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveDown = function(elapsedTime) {
			spec.center.y += spec.moveRate * (elapsedTime / 1000);
		};
		
		that.draw = function() {
			context.save();
			
			context.translate(spec.center.x, spec.center.y);
			context.rotate(spec.rotation);
			context.translate(-spec.center.x, -spec.center.y);
			
			context.drawImage(
				spec.image, 
				spec.center.x - spec.width/2, 
				spec.center.y - spec.height/2,
				spec.width, spec.height);
			
			context.restore();
		};
		
		return that;
	}

	return {
		clear : clear,
		Texture : Texture,
	};
}());

//------------------------------------------------------------------
//
// This function performs the one-time game initialization.
//
//------------------------------------------------------------------
MYGAME.initialize = (function initialize(graphics, images, input) {
	'use strict';

	var myTexture = undefined,
		elapsedTime = 0,
		lastTimeStamp = performance.now(),
		myKeyboard = input.Keyboard();

	//------------------------------------------------------------------
	//
	// This is the Game Loop function!
	//
	//------------------------------------------------------------------
	function gameLoop(time) {

		elapsedTime = time - lastTimeStamp;
		lastTimeStamp = time;

		myKeyboard.update(elapsedTime);

		graphics.clear();
		myTexture.draw();

		requestAnimationFrame(gameLoop);
	};

	return function() {
		console.log('game initializing...');
		//
		// Have to wait until here to create the texture, because the images aren't
		// loaded and ready until this point.
		myTexture = graphics.Texture( {
			image : images['images/USU-Logo.png'],
			center : { x : 100, y : 100 },
			width : 100, height : 100,
			rotation : 0,
			moveRate : 200,			// pixels per second
			rotateRate : 3.14159	// Radians per second
		});
		
		//
		// Create the keyboard input handler and register the keyboard commands
		myKeyboard.registerCommand(KeyEvent.DOM_VK_A, myTexture.moveLeft);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_D, myTexture.moveRight);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_W, myTexture.moveUp);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_S, myTexture.moveDown);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_Q, myTexture.rotateLeft);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_E, myTexture.rotateRight);

		requestAnimationFrame(gameLoop); 
	};
}(MYGAME.graphics, MYGAME.images, MYGAME.input));
