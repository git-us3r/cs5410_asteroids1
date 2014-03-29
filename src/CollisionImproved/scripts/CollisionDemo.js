// The EXPD variable exists since loader was executed.


/*

	Implementation update:

	Iimplement a Factory pattern for the visual elements.
	Furhter, set the factory to add a unique integer for each
	visual element produced (ship, asteroids, etc.)

	The unique integer is used as key for the velements object.
	In particular, the velements elements will not longer be arrays but
	object literals - with key/value : intId/object.

	This allows the removal (or migration) of invisible elements
	from the game detection and collision managers.

*/



EXPD.EXPDLoop = function(time){


	EXPD.elapsedTime = time - EXPD.lastTimeStamp;
	EXPD.lastTimeStamp = time;

	EXPD.update(EXPD.elapsedTime / 1000, {x: EXPD.canvas.width, y: EXPD.canvas.height}); // cut the lines below ... TODO
	// EXPD.keyboard.update(EXPD.elapsedTime / 1000);
	// EXPD.updateShip(EXPD.elapsedTime / 1000, {x: EXPD.canvas.width, y: EXPD.canvas.height}); // elapsedTime is now in seconds.

	EXPD.graphics.clear();
	EXPD.render(EXPD.context);

	requestAnimationFrame(EXPD.EXPDLoop);

};


EXPD.initialize = function(){

	EXPD.velements = {};
	EXPD.canvas = document.getElementById('canvas');
	EXPD.context = EXPD.canvas.getContext('2d');
	
	
	(function initializeGraphics(){

		function _clear(){
	
		EXPD.context.save();
		EXPD.context.setTransform(1, 0, 0, 1, 0, 0);
		EXPD.context.clearRect(0, 0, canvas.width, canvas.height);
		EXPD.context.restore();
		}

		function _drawImage(spec) {
			
			EXPD.context.save();
			
			EXPD.context.translate(spec.center.x, spec.center.y);
			EXPD.context.rotate(spec.rotation);
			EXPD.context.translate(-spec.center.x, -spec.center.y);
			
			EXPD.context.drawImage(
				spec.image, 
				spec.center.x - spec.width/2, 
				spec.center.y - spec.height/2,
				spec.width, spec.height);
			
			EXPD.context.restore();
		}



		// Expose a graphics object to the particles.
		EXPD.graphics = {

			clear : _clear,
			drawImage : _drawImage

		};

	}());



	(function initializeKeyboard(){

		var kb = Keyboard(KeyEvent.DOM_VK_E);
		kb.renderable = false;
		EXPD.keyboard = kb;

	}());



	// var Ship = function( _image, _width, _height, _center, _rotation, _visible, _maxThrustRate, _rotationRate,)	
	(function initializeShip(){

		var image = EXPD.images['images/ship.jpg'],
		width = 50,
		height = 50,
		center = {x: 100, y: 100},
		rotation = 0,
		visible = true,
		maxThrustRate = 10,
		rotationRate = 4,
		ship = Ship(image, width, height, center, rotation, visible, maxThrustRate, rotationRate);
		

		EXPD.velements[ship.id] = ship;
		EXPD.shipID = ship.id;				// hack
	}());




	// Only 4 for now ... args can be used to changed that.
	(function initializeAsteroids(numberOfAsteroids){

		for (var i = 0; i < numberOfAsteroids; i++){

			//Asteroid(_image, _width, _height, _center, _rotation)
			var image = EXPD.images['images/asteroid1.jpg'],
				width = 50,
				height = 50,
				center = {
					x: Random.nextRange(width, EXPD.canvas.width - width), 
					y: Random.nextRange(height, EXPD.canvas.height - height)
				},
				rotation = 0,
				speed = Random.nextGaussian(50, 20),
				direction = Vector2d.vectorFromAngle(Random.nextGaussian(Math.PI, Math.PI)),
				visible = true;

			var	ast = Asteroid(image, width, height, center, rotation, speed, direction, visible);
				

			EXPD.velements[ast.id] = ast;
		}
	}(4));


	(function initializeKeyboard(){

		// There needs to be a function to do this with client requests.
		EXPD.keyboard.registerKey(KeyEvent.DOM_VK_E, EXPD.velements[EXPD.shipID].thrustAction);
		EXPD.keyboard.registerKey(KeyEvent.DOM_VK_S, EXPD.velements[EXPD.shipID].rotateLeft);
		EXPD.keyboard.registerKey(KeyEvent.DOM_VK_F, EXPD.velements[EXPD.shipID].rotateRight);
	}());



	// READY?, SET?, GO!
	EXPD.elapsedTime = 0;
	EXPD.lastTimeStamp = performance.now();
	requestAnimationFrame(EXPD.EXPDLoop);

};	// END EXPD.initialize





EXPD.initializeExplosion = function(arg){

	// say, base
	var imgs = ImageSet(

		EXPD.images['images/fire.png'],
		EXPD.images['images/smoke.png'],
		null,
		null,
		null,
		null,
		null
	)

	// Initialize the explosion and push to velement.
	// function(_ExplosionType, _ImageSet, _graphics, _duration, _center)
	var exp = ExplosionFactory(ExplosionType.baseExplosion, imgs, EXPD.graphics, 4, arg);
	//EXPD.velements['explosions'].push(exp);
	EXPD.explosions[exp.id] = exp;

	/// TODO : other explosions ... also, this one is pretty crappy.
};





EXPD.collisionDetection = function(){

	// Collision handling function
	function collisionStrategy_log(ntt1, ntt2){

		var mp = Vector2d.midPoint(ntt1.center, ntt2.center);
		console.log("collision at " + "< " + mp.x + ", " + mp.y + " >");
	}


	// kill the asteroid ... temporarily, of course. ... with an exp
	function collisionStrategy_exp(ntt1, ntt2){

		if(ntt1.name === 'ast'){

			ntt1.visible = false;
		}
		else{

			ntt2.visible = false;
		}

		EXPD.initializeExplosion(Vector2d.midPoint(ntt1.center, ntt2.center));


	}

	CollisionDetector.detectCollisions(EXPD.velements['ship'], EXPD.velements['asteroids'], collisionStrategy_exp);
};



EXPD.update = function(elapsedTime, canvasDim){

	//EXPD.velements['keyboard'].update(elapsedTime, canvasDim);
	EXPD.keyboard.update(elapsedTime, canvasDim);
	//EXPD.velements['ship'][0].update(elapsedTime, canvasDim);		// mmhh .. the pits of patching
	//EXPD.velements['ship'][0].update(elapsedTime, canvasDim);		// mmhh .. the pits of patching

	for(var velement in EXPD.velements){

		EXPD.velements[velement].update(elapsedTime, canvasDim);

		if(!EXPD.velements[velement].visible){

			delete EXPD.velements[velement];
		}
	}

	
	/*
	for(var i = 0; i < EXPD.velements['asteroids'].length; i++){

		if ( EXPD.velements['asteroids'][i].visible) {

			EXPD.velements['asteroids'][i].update(elapsedTime, canvasDim);				
		}
	}

	EXPD.collisionDetection();		// Modifies the state of elements.

	// Here because they could be set inside collisionDetection
	for(var i = 0; i < EXPD.velements['explosions'].length; i++){

		// an explosion should have a visible property (which is true as long as at least one of the particles is visible).
		if ( EXPD.velements['explosions'][i].visible) {

			EXPD.velements['explosions'][i].update(elapsedTime, canvasDim);				
		}
	}
	*/

};


EXPD.render = function(ctx){

	/*

		EXPD.graphics.drawImage(EXPD.velements[EXPD.shipID]);

		for(var i = 0; i < EXPD.velements['asteroids'].length; i++){

		if ( EXPD.velements['asteroids'][i].visible) {

			EXPD.graphics.drawImage(EXPD.velements['asteroids'][i]);
		}
	}

	*/

	(function renderVelements(){

		for(var velement in EXPD.velements){

			EXPD.graphics.drawImage(EXPD.velements[velement]);
		}

	}());



	// Explosions are special
	(function renderExplosions(){

		/*

			for(var i = 0; i < EXPD.velements['explosions'].length; i++){

			if ( EXPD.explosions[i].visible) {

				EXPD.velements['explosions'][i].render();				
			}
			}

		*/


		for(var exp in EXPD.explosions){

			exp.render();
		}

	}());

	

};
