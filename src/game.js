var GAME = (function() {

	var that = {};

	that.Keyboard
	that.inputManager = {};

	


	// Expose the initialization function, which launches the game.
	return {init : that.init};

}());



// Start the game on load
window.onload = function(){
	
	GAME.init();
};