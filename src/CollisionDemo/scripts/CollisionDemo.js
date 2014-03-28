// The EXPD variable exists since loader was executed.

EXPD.EXPDLoop = function(time){


	EXPD.elapsedTime = time - EXPD.lastTimeStamp;
	EXPD.lastTimeStamp = time;

	EXPD.update(EXPD.elapsedTime / 1000, {x: EXPD.canvas.width, y: EXPD.canvas.height}); // cut the lines below ... TODO
	// EXPD.keyboard.update(EXPD.elapsedTime / 1000);
	// EXPD.updateShip(EXPD.elapsedTime / 1000, {x: EXPD.canvas.width, y: EXPD.canvas.height}); // elapsedTime is now in seconds.

	EXPD.clear();
	EXPD.render(EXPD.context);

	requestAnimationFrame(EXPD.EXPDLoop);

};


EXPD.initialize = function(){

	EXPD.velements = {};
	EXPD.canvas = document.getElementById('canvas');
	EXPD.context = EXPD.canvas.getContext('2d');
	
	EXPD.clear = function(){
	
		EXPD.context.save();
		EXPD.context.setTransform(1, 0, 0, 1, 0, 0);
		EXPD.context.clearRect(0, 0, canvas.width, canvas.height);
		EXPD.context.restore();
	};

	EXPD.draw = function(spec) {
		
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
	};


	EXPD.graphics = {

		clear : EXPD.clear,
		drawImage : EXPD.draw

	};


	var kb = Keyboard(KeyEvent.DOM_VK_E);
	kb.renderable = false;
	EXPD.velements['keyboard'] = kb;


	// A single asteroid for now .. it is just to test the motion... then the vectors must be implemented nicely.
	var ship = Ship();
	ship.image = EXPD.images['images/ship.jpg'];
	ship.width = 50;
	ship.height = 50;
	ship.rotation = 0;
	ship.center = {x: 100, y: 100};
	
	ship.visible = true;
	ship.renderable = true;
	ship.name = 'ship';						// new id for collision detection and strategy

	EXPD.velements['ship'] = [ship];		// an array of one to maintain a consistent interface. (see CollisionDetector)


	// Only 10 for now ... args can be used to changed that.
	EXPD.initializeAsteroids = (function(arg){

		EXPD.velements['asteroids'] = [];

		for (var i = 0; i < 7; i++){


			// A singel asteroids .. quickly
			var ast = Asteroid();
			ast.image = EXPD.images['images/asteroid1.jpg'];
			ast.width = 50;
			ast.height = 50;
			ast.rotation = 0;

			// randomize location
			ast.center = {
				x: Random.nextRange(ast.width, EXPD.canvas.width - ast.width), 
				y: Random.nextRange(ast.height, EXPD.canvas.height - ast.height)
			};
			
			// randomize speed
			ast.speed = Random.nextGaussian(50, 20);

			// randomize direction
			ast.direction = Vector2d.vectorFromAngle(Random.nextGaussian(Math.PI, Math.PI));
			
			ast.visible = true;
			ast.renderable = true;
			ast.name = 'ast';

			EXPD.velements['asteroids'].push(ast);
		}
	}());




	// COLLISIONS N EXPLOSIONS
	EXPD.velements['explosions'] = [];		// An array of explosions

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
		EXPD.velements['explosions'].push(exp);
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

		EXPD.velements['keyboard'].update(elapsedTime, canvasDim);
		EXPD.velements['ship'][0].update(elapsedTime, canvasDim);		// mmhh .. the pits of patching
		
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

	};


	EXPD.render = function(ctx){

		EXPD.velements['ship'][0].render(ctx);			// hack hack!

		for(var i = 0; i < EXPD.velements['asteroids'].length; i++){

			if ( EXPD.velements['asteroids'][i].visible) {

				EXPD.velements['asteroids'][i].render(ctx);				
			}
		}


		function renderExplosions(){

			for(var i = 0; i < EXPD.velements['explosions'].length; i++){

				if ( EXPD.velements['explosions'][i].visible) {

					EXPD.velements['explosions'][i].render();				
				}
			}
		}

		renderExplosions();

	};


	// There needs to be a function to do this with client requests.
	EXPD.velements['keyboard'].registerKey(KeyEvent.DOM_VK_E, EXPD.velements['ship'][0].thrustAction);
	EXPD.velements['keyboard'].registerKey(KeyEvent.DOM_VK_S, EXPD.velements['ship'][0].rotateLeft);
	EXPD.velements['keyboard'].registerKey(KeyEvent.DOM_VK_F, EXPD.velements['ship'][0].rotateRight);



	EXPD.elapsedTime = 0;
	EXPD.lastTimeStamp = performance.now();

	requestAnimationFrame(EXPD.EXPDLoop);

};
