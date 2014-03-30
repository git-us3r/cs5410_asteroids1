// A simple asteroid.
var Spec = (function(){

	var that = {};

	that.create = function(_image, _width, _height, _center, _rotation){
	
		var spec = {};
		spec.image = _image;
		spec.width = _width;
		spec.height = _height;
		spec.center = _center;
		spec.rotation = _rotation;


		spec.update = function(elapsedTime, canvasDim){

			// Implement this.
		};


		return spec;
	};
	// END Spec.create


	return that;
	
}());