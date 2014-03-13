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
	
	//
	// Place a 'clear' function on the Canvas prototype, this makes it a part
	// of the canvas, rather than making a function that calls and does it.
	CanvasRenderingContext2D.prototype.clear = function() {
		this.save();
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.clearRect(0, 0, canvas.width, canvas.height);
		this.restore();
	};
	
	function clear() {
		context.clear();
	}
	
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
		
		that.moveTo = function(center) {
			spec.center = center;
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
MYGAME.initialize = function initialize() {
	'use strict';

	console.log('game initializing...');
	
	MYGAME.lastTimeStamp = performance.now();
	
	var myTexture = MYGAME.graphics.Texture( {
		image : MYGAME.images['images/USU-Logo.png'],
		center : { x : 100, y : 100 },
		width : 100, height : 100,
		rotation : 0,
		moveRate : 200,			// pixels per second
		rotateRate : 3.14159	// Radians per second
	});

	//
	// Create the keyboard input handler and register the keyboard commands
	var myKeyboard = MYGAME.input.Keyboard();
	myKeyboard.registerCommand(KeyEvent.DOM_VK_A, myTexture.moveLeft);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_D, myTexture.moveRight);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_W, myTexture.moveUp);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_S, myTexture.moveDown);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_Q, myTexture.rotateLeft);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_E, myTexture.rotateRight);
	
	//
	// Create an ability to move the logo using the mouse
	var mouseCapture = false;
	var myMouse = MYGAME.input.Mouse();
	myMouse.registerCommand('mousedown', function(e, elapsedTime) {
		mouseCapture = true;
		myTexture.moveTo({x : e.clientX, y : e.clientY});
	});

	myMouse.registerCommand('mouseup', function(e, elapsedTime) {
		mouseCapture = false;
	});

	myMouse.registerCommand('mousemove', function(e, elapsedTime) {
		if (mouseCapture) {
			myTexture.moveTo({x : e.clientX, y : e.clientY});
		}
	});

	//------------------------------------------------------------------
	//
	// This is the Game Loop function!
	//
	//------------------------------------------------------------------
	function gameLoop(time) {

		MYGAME.elapsedTime = time - MYGAME.lastTimeStamp;
		MYGAME.lastTimeStamp = time;

		myKeyboard.update(MYGAME.elapsedTime);
		myMouse.update(MYGAME.elapsedTime);

		MYGAME.graphics.clear();
		myTexture.draw();

		requestAnimationFrame(gameLoop);
	};

	requestAnimationFrame(gameLoop);
};
