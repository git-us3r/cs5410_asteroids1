// ExplosionFactory.js


// rank should correspond the number of images intended
// Usage: create an array of image-rank associations.
// then pass the array as parameter to the ExplosionFactoryImageSet
// 



// kind of an enum
var ImageType = function(){

	fire : 'FIRE',
	smoke : 'SMOKE',
	plasma : 'PLASMA',
	debryBase : 'DEBRY_BASE',
	debryMissiles : 'DEBRY_MISSILES',
	debryEnemyShip : 'DEBRY_ENEMY_SHIP',
	debryShip : 'DEBRY_SHIP'
};




var ImageFactory = function(_ImageType, _image, _center){


	////////////////////////// TEMPLATES ////////////////////
	function fire(_image, _center){

		return {
			image : _image,
			width : 20,
			height : 20,
			center : _center,
			speed_std : 20,
			speed_mean : 8,
			lifetime_mean : 4,
			lifetime_std : 1,
		};
	}



	function smoke(_image, _center){

		return {
			image : _image,
			width : 20,
			height : 20,
			center : _center,
			speed_std : 20,
			speed_mean : 8,
			lifetime_mean : 4,
			lifetime_std : 1,
		};
	}



	function plasma(_image, _center){

		return {
			image : _image,
			width : 20,
			height : 20,
			center : _center,
			speed_std : 6,
			speed_mean : 2,
			lifetime_mean : 2,
			lifetime_std : 1,
		};
	}



	function debryBase(_image, _center){

		return {
			image : _image,
			width : 30,
			height : 30,
			center : _center,
			speed_std : 30,
			speed_mean : 3,
			lifetime_mean : 2,
			lifetime_std : 1,
		};
	}


	function debryFlash(_image, _center){

		return {
			image : _image,
			width : 30,
			height : 30,
			center : _center,
			speed_std : 30,
			speed_mean : 3,
			lifetime_mean : 2,
			lifetime_std : 1,
		};
	}


	function debryShip(_image, _center){

		return {
			image : _image,
			width : 30,
			height : 30,
			center : _center,
			speed_std : 30,
			speed_mean : 3,
			lifetime_mean : 2,
			lifetime_std : 1,
		};
	}


	function debryMissiles(_image, _center){

		return {
			image : _image,
			width : 30,
			height : 30,
			center : _center,
			speed_std : 30,
			speed_mean : 3,
			lifetime_mean : 2,
			lifetime_std : 1,
		};
	}

	function debryEnemyShip(_image, _center){

		return {
			image : _image,
			width : 30,
			height : 30,
			center : _center,
			speed_std : 30,
			speed_mean : 3,
			lifetime_mean : 2,
			lifetime_std : 1,
		};
	}

	////////////////////////// END TEMPLATES ////////////////////

	switch(_ImageType){
		case ImageType.fire:
			return fire(_image, _center);
			break;
		case ImageType.smoke:
			return smoke(_image, _center)
			break;
		case ImageType.plasma:
			return plasma(_image, _center);
			break;
		case ImageType.debryBase:
			return debryBase(_image, _center);
			break;
		case ImageType.debryShip:
			return debryShip(_image, _center);
			break;
		case ImageType.debryMissiles:
			return debryMissiles(_image, _center);
			break;	
			
		case ImageType.debryEnemyShip:
			return debryEnemyShip(_image, _center);
			break;


	}
};




// Another enum ... kindda
var ExplosionType = function (){

	return {

		baseExplosion : 'BASE_EXPLOSION',
		friendlyShipExplosion : 'FRIENDLY_SHIP_EXPLOSION',
		enemyShipExplosion : 'ENEMY_SHIP_EXPLOSION',
		enemyMissileExplosion : 'ENEMY_MISSILE_EXPLOSION'
	};
};



// Uses ImageType
var ImageSet = function(_fire, _smoke, _plasma, _debryBase, _debryShip, _debryEnemyShip, _debryMissile){

	return {
		ImageType.fire : _fire,
		ImageType.smoke : _smoke,
		ImageType.plasma : _plasma,
		ImageType.debryBase : _debryBase,
		ImageType.debryShip : _debryShip,
		ImageType.debryEnemyShip : _debryEnemyShip,
		ImageType.debryMissiles : _debryMissiles
	};
};



var ExplosionFactory = function(_ExplosionType, _ImageSet, _graphics, _duration, _center){	

	function baseImageSet(){

		return [

			ImageFactory(ImageType.fire, _ImageSet[ImageType.fire], _center),
			ImageFactory(ImageType.smoke, _ImageSet[ImageType.smoke], _center),
			ImageFactory(ImageType.plasma, _ImageSet[ImageType.plasma], _center),
			ImageFactory(ImageType.debryBase, _ImageSet[ImageType.debryBase], _center)
		];
	}



	//////////////////////////// EXPLOSION PROTOTYPES //////////////////////////
	//
	// There are four types of explosions:
	// friendlyShip vs whatever : FS
	// friendlyMissile vs Asteroid: BE (base)
	// friendlyMissile vs EnemyShip: ES
	// friendlyMissile vs EnemyMissile EM
	///
	function BE()
	{
		// get the basic elements
		that = {};

		that.pics = baseImageSet();
		
		that.xparam = Explosion.explosionParameters(that.pics, _graphics, _durations);
		that.exp = Explosion.setExplosion(that.xparam);


		return that.exp;
	}




	function FS(){

		that = {};

		that.pics = baseImageSet();
		that.pics.push(ImageFactory(ImageType.debryShip, _ImageSet[ImageType.debryShip], _center);
		that.pics.push(ImageFactory(ImageType.debryMissiles, _ImageSet[ImageType.debryMissiles], _center);

		that.xparam = Explosion.explosionParameters(that.pics, _graphics, _durations);
		that.exp = Explosion.setExplosion(that.xparam);


		return that.exp;
	}

	

	function ES(){

		that = {};

		that.pics = baseImageSet();
		that.pics.push(ImageFactory(ImageType.debryMissiles, _ImageSet[ImageType.debryMissiles], _center);

		that.xparam = Explosion.explosionParameters(that.pics, _graphics, _durations);
		that.exp = Explosion.setExplosion(that.xparam);


		return that.exp;
	}
	


	function EM(){

		that = {};

		that.pics = baseImageSet();
		that.pics.push(ImageFactory(ImageType.debryMissiles, _ImageSet[ImageType.debryMissiles], _center);

		that.xparam = Explosion.explosionParameters(that.pics, _graphics, _durations);
		that.exp = Explosion.setExplosion(that.xparam);


		return that.exp;
	}

	//////////////////////////// END EXPLOSION PROTOTYPES //////////////////////////


	// Production
	switch(_ExplosionType){

		case ExplosionType.baseExplosion:
			return BE();
			break;


		case ExplosionType.friendlyShipExplosion:
			return FS();
			break;

		case ExplosionType.enemyShipExplosion:
			return ES();
			break;

		case ExplosionType.enemyMissileExplosion:
			return EM();
			break;
	}
};
