// Rendering manager

function RenderingManager( _canvas, _textures, _elements ){
	
	var that = {};

	that.textures = _textures || [];
	that.elements = _elements || [];
	that.canvas = _canvas || null;
	that.context = _canvas.getContext('2d');


	////
	// FUNCTIONS
	/////
	

	// This is implemented in the loader file.
	//that.initializeTextures = function(){};


	(function initializeElements(){

		// Hard coded for testing only
		for(var i = 0; i < 10; i++) {

			var r = Controllable();
			r.image = that.textures['images/asteroid1.jpg'];
			r.width = 50;
			r.height = 50;
			r.center = {x:100, y:100};
			r.direction = {x:1, y:1};
			r.rotation = 0;
			r.rotateRate = 0;
			r.speed = 20;
			r.lifespan = -1;		// means infinite
			r.age = 0;

			that.elements.push(r);
		}

	}());



	that.renderElement = function(spec) {

			that.context.save();
			
			that.context.translate(spec.center.x, spec.center.y);
			that.context.rotate(spec.rotation);
			that.context.translate(-spec.center.x, -spec.center.y);
			
			that.context.drawImage(
				spec.image, 
				spec.center.x - spec.width/2, 
				spec.center.y - spec.height/2,
				spec.width, spec.height);
			
			that.context.restore();
	};


	that.renderElements = function(){

		that.elements.forEach(function(element, index, array){

			that.renderElement(element);
		});
	};




	return that;
}