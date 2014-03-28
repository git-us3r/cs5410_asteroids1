// The EXP variable exists since loader was executed.

EXP.EXPLoop = function(time){


	EXP.elapsedTime = time - EXP.lastTimeStamp;
	EXP.lastTimeStamp = time;

	EXP.update(EXP.elapsedTime / 1000, {x: EXP.canvas.width, y: EXP.canvas.height}); // cut the lines below ... TODO
	// EXP.keyboard.update(EXP.elapsedTime / 1000);
	// EXP.updateShip(EXP.elapsedTime / 1000, {x: EXP.canvas.width, y: EXP.canvas.height}); // elapsedTime is now in seconds.

	EXP.clear();
	EXP.render();

	requestAnimationFrame(EXP.EXPLoop);

};


EXP.initialize = function(){

	EXP.velements = {};
	EXP.canvas = document.getElementById('canvas');
	EXP.context = EXP.canvas.getContext('2d');

	// Graphics
	EXP.clear = function(){
	
		EXP.context.save();
		EXP.context.setTransform(1, 0, 0, 1, 0, 0);
		EXP.context.clearRect(0, 0, canvas.width, canvas.height);
		EXP.context.restore();
	};


	EXP.draw = function(spec) {
		
		EXP.context.save();
		
		EXP.context.translate(spec.center.x, spec.center.y);
		EXP.context.rotate(spec.rotation);
		EXP.context.translate(-spec.center.x, -spec.center.y);
		
		EXP.context.drawImage(
			spec.image, 
			spec.center.x - spec.width/2, 
			spec.center.y - spec.height/2,
			spec.width, spec.height);
		
		EXP.context.restore();
	};


	EXP.graphics = {

		clear : EXP.clear,
		drawImage : EXP.draw

	};

	// KeyBoard
	var kb = Keyboard(KeyEvent.DOM_VK_E);
	kb.renderable = false;

	EXP.velements['keyboard'] = kb;

	// There needs to be a function to do this with client requests.
	EXP.velements['keyboard'].registerKey(KeyEvent.DOM_VK_F, EXP.initializeExplosion);


	EXP.velements['explosions'] = [];
	EXP.initializeExplosion();


	// Set, ready, go!
	EXP.elapsedTime = 0;
	EXP.lastTimeStamp = performance.now();
	requestAnimationFrame(EXP.EXPLoop);

	
};



// Reusable-ish
EXP.initializeExplosion = function(arg){

	// say, base
	var imgs = ImageSet(

		EXP.images['img_exp/fire.png'],
		EXP.images['img_exp/smoke.png'],
		null,
		null,
		null,
		null,
		null
	)

	// Initialize the explosion and push to velement.
	// function(_ExplosionType, _ImageSet, _graphics, _duration, _center)
	var exp = ExplosionFactory(ExplosionType.baseExplosion, imgs, EXP.graphics, 4, {x:100, y:100});
	EXP.velements['explosions'].push(exp);
};

/*
EXP.initializeExplosion = function(arg){

	// Later ... explosion can be determined by arg (factory)	

	// for now

	// Create specs ... 
	var fire = Explosion.spec(

		EXP.images['img_exp/fire.png'], 
		20, 
		20, 
		{x:100, y:100},
		20, 
		8, 
		4, 
		1
	);


	var smoke = Explosion.spec(

		EXP.images['img_exp/smoke.png'], 
		20, 
		20, 
		{x:100, y:100},
		20, 
		8, 
		4, 
		1, 
		0,
		5
	);

	// Set explosionParameters
	var param = Explosion.explosionParameters([fire, smoke], EXP.graphics, 8);

	// Set explosion
	var exp = Explosion.setExplosion(param);


	// TODO: subroutine to check if there any dead explosions,
	// if so, replace, else append.
	////
	EXP.velements['explosions'].push(exp);	
		
};
*/



	
EXP.update = function(elapsedTime, canvasDim){

	EXP.velements['keyboard'].update(elapsedTime, canvasDim);

	// Here because they could be set inside collisionDetection
	for(var i = 0; i < EXP.velements['explosions'].length; i++){

		// an explosion should have a visible property (which is true as long as at least one of the particles is visible).
		if ( EXP.velements['explosions'][i].visible) {

			EXP.velements['explosions'][i].update(elapsedTime);				
		}
	}

};




EXP.render = function(){

	for(var i = 0; i < EXP.velements['explosions'].length; i++){

		if ( EXP.velements['explosions'][i].visible) {

			EXP.velements['explosions'][i].render();				
		}
	}

};
