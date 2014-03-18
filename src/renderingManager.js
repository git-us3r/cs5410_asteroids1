// Rendering manager

function RenderingManager( _canvas, _textures, _elements ){
	
	var that = {};

	that.textures = _textures || [];
	that.elements = _elements || [];
	that.canvas = _canvas || null;


	////
	// FUNCTIONS
	/////


	// TODO
	
	that.initializeTextures = function(){};
	that.initializeRenderingElements = function(){};
	that.render = function(){};




	return that;
}