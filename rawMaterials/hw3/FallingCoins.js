// Miguel Lopez : A01210482
// This file contains all the game logic, data, and graphics
// External dependencies: particle-system.js, random.js, coin.js
//
// The game objects and its members can be viewed in sections:
//
// 

GAME = {};

// GAME STATE
GAME.started = false;
GAME.over = false;



// MENU ELEMENTS

GAME.Menu = {};
GAME.Menu.startButton = {};
GAME.Menu.highScoresButton = {};
GAME.Menu.creditsButton = {};
GAME.Menu.particlesButton = {};         // for sorry ;)


GAME.Menu.bind2Buttons = function () {

    GAME.Menu.startButton = document.getElementById('startGameButton');
    GAME.Menu.highScoresButton = document.getElementById('highScoresButton');
    GAME.Menu.creditsButton = document.getElementById('creditsButton');
    GAME.Menu.particlesButton = document.getElementById('particles');

    
    // New Game behavior
    GAME.Menu.startButton.onclick = function(){


        if (GAME.over) {

            window.location.reload();
            GAME.initialize();
        }

        GAME.over = false;
        
        GAME.Score.newLevel = true;
        GAME.Data.newLevelAnimationTime_lastTimeStamp = performance.now();
        GAME.Data.newLevelAnimationTime = 0;

        // Set up new level message
        GAME.Data.newLevelMsg.font = 'bold 60px Arial';
        GAME.Data.newLevelMsg.txt = 'Level 1';
        GAME.Data.newLevelMsg.location.x = 150;
        GAME.Data.newLevelMsg.location.y = 200;

        GAME.started = true;


        GAME.initialize();
    };



    // High Scores behavior
    GAME.Menu.highScoresButton.onclick = function(){

        var hs = GAME.Percistence.loadGameState();
        alert(hs.highScores);
    };



    // Credits button behavior
    GAME.Menu.creditsButton.onclick = function(){

        alert('Credits\nFalling Coins (minigame).\nMiguel Lopez\nCS5410 Spr2014');
    };


    GAME.Menu.particlesButton.onclick = function(){

        window.open('file:///home/us3r/Documents/Git/cs5410_miniGame_coins/cs5410_coins/cs5410_coins/explodingCoins/particles.html');
    };
};






// DOM members
GAME.graphics = {};           // Graphics object to interface with particle-system
GAME.images = {};             // Conntains images (fire, smoke, coins, etc).
GAME.explosions = [];         // Contains active and past explosions.
GAME.canvas = {};
GAME.context = {};




// CLIENT PERSISTENCE ELEMENTS
GAME.Percistence = {};
GAME.Percistence.highScores = '';


GAME.Percistence.init = function () {

    GAME.Percistence.html_level = document.getElementById('html_level');
    GAME.Percistence.html_levelScore = document.getElementById('html_levelScore');
    GAME.Percistence.html_totalScore = document.getElementById('html_totalScore');
    
    // The first innerHTML element represents the number of highscores within.
    GAME.Percistence.html_highScores = document.getElementById('html_highScores');


    // initialize all but highscores
    GAME.Percistence.html_level.innerHTML = '1';
    GAME.Percistence.html_levelScore.innerHTML = '0';
    GAME.Percistence.html_totalScore.innerHTML = '0';

};


GAME.Percistence.loadGameState = function (){

    // loading clears the html element
    // Only one game state is preserved.
    // GAME.Score.currentLevel = Number.parseInt(GAME.Percistence.html_level.value);    // probably needs parsing
    // GAME.Score.levelScore = Number.parseInt(GAME.Percistence.html_levelScore.value);
    // GAME.Score.totalScore = Number.parseInt(GAME.Percistence.html_totalScore.value);

    var lvl = Number(GAME.Percistence.html_level.innerHTML);    // probably needs parsing
    var ls = Number(GAME.Percistence.html_levelScore.innerHTML);
    var ts = Number(GAME.Percistence.html_totalScore.innerHTML);
    var hs = GAME.Percistence.html_highScores.innerHTML;        // probably some long string.
    

    if (lvl === 0) {

        lvl = 1;
    }

    return {

        level : lvl,
        levelScore : ls,
        totalScore : ts,
        highScores : hs
    };

};



GAME.Percistence.saveLevelScore = function (score) {

    // Write is overwrite
    GAME.Percistence.html_levelScore.innerHTML = '';
    GAME.Percistence.html_levelScore.innerHTML = score;
};



GAME.Percistence.saveTotalScore = function (score) {

    // Write is overwrite
    GAME.Percistence.html_totalScore.innerHTML = '';
    GAME.Percistence.html_totalScore.innerHTML = score;

};


GAME.Percistence.saveLevel = function (level) {

    // Write is overwrite
    GAME.Percistence.html_level.innerHTML = '';
    GAME.Percistence.html_level.innerHTML = level;
};



GAME.Percistence.saveHighScores = function (){

    // get totalScore
    var state = GAME.Percistence.loadGameState();

    // set
    GAME.Percistence.html_highScores.innerHTML +=',' + state.totalScore;
};





//---------------------------------
// Scoring Data and Functions
//----------------------------------

GAME.Score = {};
GAME.Score.coinValueUS = 10;
GAME.Score.coinValueRM = 50;
GAME.Score.coinValueCN = 0;
GAME.Score.levelScore  = 0;
GAME.Score.totalScore = 0;
GAME.Score.AdvanceScore = 100;
GAME.Score.newLevel = true;
GAME.Score.clockClicked = false;
//GAME.Score.newLevelOfficial = false;
GAME.Score.currentLevel = 1;
GAME.Score.scoreBoard = {

    location : {x : 450, y : 50}
    // growth?
};


GAME.Score.ProcessCoin = function (imgSrc) {

    var partialScore = 0;
    switch(imgSrc){

        case 'CN':
        partialScore = -1;
        break;

        case 'US':
        partialScore = GAME.Score.coinValueUS;
        break;

        case 'RM':
        partialScore = GAME.Score.coinValueRM;
        break;

        case 'Clock':
        GAME.Score.clockClicked = true;         // see updateCoins
    }

    // Get previous scores
    var state = GAME.Percistence.loadGameState();

    if(partialScore === -1) {

        state.levelScore = 0;
    }
    else {

        state.levelScore += partialScore;
    }

    state.totalScore += partialScore;


    // Client persistence.
    GAME.Percistence.saveLevelScore(state.levelScore);
    GAME.Percistence.saveTotalScore(state.totalScore);
    GAME.Percistence.saveLevel(state.level);

};



GAME.Score.drawScore = function () {

    var state = GAME.Percistence.loadGameState();

    GAME.context.save();
    GAME.context.translate(GAME.Score.scoreBoard.location.x, GAME.Score.scoreBoard.location.y);
    GAME.context.font = 'bold 30px Arial';

    // Draw Piggy ... TODO
    GAME.context.drawImage(GAME.images.pic_Pig, 40, -20, 100, 100);
    GAME.context.fillText('Level: ' + state.level, 30, 100);
    
    GAME.context.fillStyle = 'red';
    GAME.context.fillText('Score', 30, 150);

    GAME.context.fillStyle = 'black';
    GAME.context.font = 'bold 60px Arial';
    GAME.context.fillText(state.levelScore, 30, 200);
    

    GAME.context.fillStyle = 'red';
    GAME.context.font = 'bold 30px Arial';
    GAME.context.fillText('Total', 30, 250);
    

    GAME.context.fillStyle = 'black';
    GAME.context.font = 'bold 60px Arial';
    GAME.context.fillText(state.totalScore, 30, 300);


    //GAME.context.fillText(GAME.Score.levelScore, 0, 0);
    //GAME.context.fillText(GAME.Score.totalScore, 0, 50);
    GAME.context.restore();
};





//---------------------------------
// Logic and Spec parameters.
//---------------------------------

GAME.Data = {};

// Returns the number of coins for the given level.
GAME.Data.numberOfCoins = function (level) {
    switch (level) {

        case 1:
            return 18;
        case 2:
            return 29;
        case 3:
            return 37;
    }
};



// Coin data
GAME.Data.coins = [];
GAME.Data.oldTime = 0;
GAME.Data.elapsedTime = 0;
GAME.Data.coinDiameter = 50;
GAME.Data.oldTime = 0;
GAME.Data.menuBoundaryX = 500;                          // x = 500 is where the menu area begins.
GAME.Data.coinSizeUS = '50';
GAME.Data.coinSizeCN = '80';
GAME.Data.coinSizeRM = '30';
GAME.Data.clock = 'clock';
GAME.Data.canvasMean = 200;
GAME.Data.canvaStd = 190;
GAME.Data.newLevelAnimationTime_max = 3;
GAME.Data.newLevelAnimationTime = 0;
GAME.Data.newLevelAnimationTime_lastTimeStamp = 0;
GAME.Data.newLevelMsg = {

    location: {x: 0, y: 0},
    font : 'empty',
    txt : 'empty'
};                               



// Returns a bounded gaussian horizontal location.
GAME.Data.getGaussianX = function() {

    var xPosition = Random.nextGaussian(GAME.Data.canvasMean, GAME.Data.canvaStd);

    // Adjust small and negative numbers
    //xPosition = Math.min(xPosition, GAME.Graphics.canvas.width - 100);          // OJO this is important for menus.
    if (xPosition < GAME.Data.coinDiameter) {


        var horizontalOffset = GAME.Data.coinDiameter;
        var lengthFactor = 3;

        // Place the coin somewhere within 3 times its diameter from the left.
        xPosition = Math.floor(Math.random() * GAME.Data.coinDiameter * lengthFactor + horizontalOffset);
    }
    else if (xPosition > GAME.Data.menuBoundaryX - GAME.Data.coinDiameter) {


        var horizontalOffset = 150;
        var lengthFactor = 3;
        // Place the coin somewhere within 3 times its diameter from the right.
        xPosition = Math.floor(Math.random() * GAME.Data.coinDiameter * lengthFactor + horizontalOffset);
    }

    return xPosition;
};




// Returns the size of a given coin.
GAME.Data.getCoinSize = function(coinType) {

    switch (coinType) {

        case 'RM':
        return GAME.Data.coinSizeRM;

        case 'US':
        return GAME.Data.coinSizeUS;

        case 'CN':
        return GAME.Data.coinSizeCN;
    }
};





// Particles
GAME.explosion = function (_maxDuration, _particles) {

    var that = {};
    that.maxDuration = _maxDuration || 2;
    that.duration = 0;
    that.active = false;
    that.particles = _particles;

    return that;
};



// Sets the coin stack for level.
GAME.coinSet = function (level) {

    var r = [];
    var numUSCoins = 0;
    var numCNCoins = 0;
    var numRMCoins = 0;
    // clock.. TODO

    // Set up the coin distribution
    switch (level) {

        case 1:
            numUSCoins = 10;
            numCNCoins = 5;
            numRMCoins = 3;
            // clock.. TODO
            break;
        case 2:
            numUSCoins = 15;
            numCNCoins = 4;
            numRMCoins = 10;
            // clock.. TODO
            break;
        case 3:
            numUSCoins = 20;
            numCNCoins = 5;
            numRMCoins = 12;
            // clock.. TODO
            break;
    }




    // Three for loops (one for each coin type)
    for (var i = 0; i < numUSCoins; i++) {

        r.push(GAME.images.pic_coinUS);
    }

    for (var i = 0; i < numCNCoins; i++) {

        r.push(GAME.images.pic_coinCN);
    }

    for (var i = 0; i < numRMCoins; i++) {

        r.push(GAME.images.pic_coinRM);
    }


    // r is used to initialize the coins in GAME.initializeRandomCoins.
    return r;
};




// Creates a stack of normally distributed coins
GAME.initializeRandomCoins = function (level) {

    // Reset blocks.
    GAME.Data.coins.length = 0;


    level = level || 1;                         // To avoid to many changes on this iteration.
    var coinSet = GAME.coinSet(level);
    var coinNum = GAME.Data.numberOfCoins(level);
    // images


    for (var i = 0; i < coinNum; ++i) {

        
        var xPosition = GAME.Data.getGaussianX();   // This returns a Gaussian position within bounds.


        // Get temptative motion rate.
        var meanSpeed = 120;
        var speedStd = 50;
        var speed = Random.nextGaussian(meanSpeed, speedStd);


        // Adjust negative  or annoyingly small speeds
        var minSpeed = 80;

        if (speed < minSpeed) {

            // Bump up the speed:
            // Set the speed to something between the mean speed and the minSpeed
            speed = Math.floor(Math.random() * meanSpeed + minSpeed);
        }
            
        var img = coinSet[i];
        var size = GAME.Data.getCoinSize(img.coinType);
        GAME.Data.coins.push(Coin(xPosition, 0, speed, size, img, img.coinType));

    }

    // push the clock
    var clk = GAME.images.pic_clock;
    GAME.Data.coins.push(Coin(xPosition, 0, speed, GAME.Data.coinSizeUS, clk, clk.coinType));
}




// Creates and sets the appropriate extra coins on coin array
// based on level.
GAME.pushClockCoins = function () {

    var r = [];

    var state = GAME.Percistence.loadGameState();

    var numUSCoins = 0;
    var numCNCoins = 0;
    var numRMCoins = 0;
    // clock.. TODO

    // Set up the coin distribution
    switch (state.level) {

        case 1:
            numUSCoins = 5;
            numCNCoins = 1;
            numRMCoins = 1;
            // clock.. TODO
            break;
        case 2:
            numUSCoins = 8;
            numCNCoins = 3;
            numRMCoins = 2;
            // clock.. TODO
            break;
        case 3:
            numUSCoins = 12;
            numCNCoins = 4;
            numRMCoins = 3;
            // clock.. TODO
            break;
    }




    // Three for loops (one for each coin type)
    for (var i = 0; i < numUSCoins; i++) {

        r.push(GAME.images.pic_coinUS);
    }

    for (var i = 0; i < numCNCoins; i++) {

        r.push(GAME.images.pic_coinCN);
    }

    for (var i = 0; i < numRMCoins; i++) {

        r.push(GAME.images.pic_coinRM);
    }



    // Subroutine from initalizeRandomCoins .. consider encapsulating.
    // Push the coins onto GAME.Data.coins
    ////
    for (var i = 0; i < r.length; ++i) {

        
        var xPosition = GAME.Data.getGaussianX();   // This returns a Gaussian position within bounds.



        // GAME.getGaussianSpeed() ... TODO
        // Get temptative motion rate.
        var meanSpeed = 120;
        var speedStd = 50;
        var speed = Random.nextGaussian(meanSpeed, speedStd);


        // Adjust negative  or annoyingly small speeds
        var minSpeed = 80;

        if (speed < minSpeed) {

            // Bump up the speed:
            // Set the speed to something between the mean speed and the minSpeed
            speed = Math.floor(Math.random() * meanSpeed + minSpeed);
        }
        // end of GAME.getGaussianSpeed()


            
        var img = r[i];
        var size = GAME.Data.getCoinSize(img.coinType);
        GAME.Data.coins.push(Coin(xPosition, 0, speed, size, img, img.coinType));

    }

};




// Updates the coins states for animation.
GAME.updateCoins = function (elapsedTime) {

    GAME.Data.coins.forEach(function (element, index, array) {

        element.updateCoin(elapsedTime);

    });


    var droppedCoins = 0;
    var doneCoins = 0;
    for (var i = 0; i < GAME.Data.coins.length; i++) {

        if (GAME.Data.coins[i].center.y > GAME.canvas.height + (GAME.Data.coinDiameter / 2)) {

            droppedCoins++;
        }

        if (!GAME.Data.coins[i].visible) {

            doneCoins++;
        }
    }


    var state = GAME.Percistence.loadGameState();

    if (state.levelScore >= GAME.Score.AdvanceScore) {

        //state.totalScore += state.levelScore;
        state.levelScore = 0;
        state.level++;
        if ( state.level == 4) {

            GAME.over = true;
        }        

        GAME.Score.newLevel = true;
        GAME.Data.newLevelAnimationTime_lastTimeStamp = performance.now();
        GAME.Data.newLevelAnimationTime = 0;

        // Set up new level message
        GAME.Data.newLevelMsg.font = 'bold 60px Arial';
        GAME.Data.newLevelMsg.txt = 'Level ' + state.level;
        GAME.Data.newLevelMsg.location.x = 150;
        GAME.Data.newLevelMsg.location.y = 200;

        GAME.initializeRandomCoins(state.level);

        GAME.Percistence.saveLevel(state.level);
        GAME.Percistence.saveLevelScore(state.levelScore);
        GAME.Percistence.saveTotalScore(state.totalScore);


    }
    else if (droppedCoins === GAME.Data.coins.length) {

        if (GAME.Score.clockClicked) {

            GAME.pushClockCoins();
            GAME.Score.clockClicked = false;
        }
        GAME.reRunSet();
    }


};


// re-run current coin set if the max score hasn't been reached and all the coins fell.
GAME.reRunSet = function () {

    // reset the height of all the coins to 0.
    // Invisible coins will not be display so... its cool.
    GAME.Data.coins.forEach(function (element, index, array) {

        element.center.y = 0;
        element.center.x = GAME.Data.getGaussianX();

    });
};





// Render coins
GAME.drawCoins = function () {

    GAME.graphics.clear();

    GAME.Data.coins.forEach(function (element, index, array) {

        if (element.visible) {

            //console.log('drawing at: (' + element.center.x + ', ' + element.center.y + ')');

            //element.drawCoin(GAME.graphics);
            GAME.graphics.drawImage(element);

        }
    });
};






// Initializes graphics members.
GAME.graphicsInit = function () {

    GAME.canvas = document.getElementById('canvas-main');
    GAME.context = GAME.canvas.getContext('2d');


    //
    // Consider making this a function,
    // since there are more images. .... TODO
    //
    // Load up images

    var imgBG = new Image();
    imgBG.src = 'textures/Background.png';
    GAME.images.pic_bg = imgBG;

    var imgCoinCN = new Image();
    imgCoinCN.coinType = 'CN';
    imgCoinCN.src = 'Assign3_Images/Coin-Canadian-Dollar.png';
    //GAME.Graphics.images.push(img1);
    GAME.images.pic_coinCN = imgCoinCN;

    var imgCoinUS = new Image();
    imgCoinUS.coinType = 'US';
    imgCoinUS.src = 'Assign3_Images/Coin-US-Dollary.png';
    //GAME.Graphics.images.push(img2);
    GAME.images.pic_coinUS = imgCoinUS;

    var imgCoinRM = new Image();
    imgCoinRM.coinType = 'RM';
    imgCoinRM.src = 'Assign3_Images/Coin-Roman.png';
    //GAME.Graphics.images.push(img3);
    GAME.images.pic_coinRM = imgCoinRM;


    var imgClock = new Image();
    imgClock.coinType = 'Clock';
    imgClock.src = 'Assign3_Images/Clock.png';
    //GAME.Graphics.images.push(img3);
    GAME.images.pic_clock = imgClock;


    var imgPig = new Image();
    imgPig.coinType = 'Pig';
    imgPig.src = 'Assign3_Images/Piggy-Bank.png';
    //GAME.Graphics.images.push(img3);
    GAME.images.pic_Pig = imgPig;




    // Mouse handling
    GAME.canvas.onmousedown = function (e) {

        // Replace the body with a function call and write it outside.
        var location = {
            x: e.x,
            y: e.y
        };

        // GAME.setParticles(location);
        GAME.Data.coins.forEach(function(element, index, array){

            if( element.clickMatches(location)){

                element.visible = false;
                GAME.Score.ProcessCoin(element.type);   // This is really img.coinType
            }
        });
    };


    //// 
    // Expose clear function
    // Copied from Dr. Mathias : USU 5410 Spr2014
    ///
    GAME.context.clear = function () {

        GAME.context.save();
        GAME.context.setTransform(1, 0, 0, 1, 0, 0);
        //GAME.context.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);
        GAME.context.drawImage(GAME.images.pic_bg, 0, 0, GAME.canvas.width, GAME.canvas.height);
        GAME.context.restore();
    };



    //////
    // Expose an ability to draw an image/texture on the canvas.
    // Copied from Dr. Mathias : USU 5410 Spr2014
    ////
    function drawImage(spec) {
        GAME.context.save();

        GAME.context.translate(spec.center.x, spec.center.y);
        GAME.context.rotate(spec.rotation);
        GAME.context.translate(-spec.center.x, -spec.center.y);

        GAME.context.drawImage(
            spec.image,
            spec.center.x - spec.size / 2,
            spec.center.y - spec.size / 2,
            spec.size, spec.size);

        GAME.context.restore();
    }


    // Return graphics public interface (clear and drawImage functions).
    return {
        clear: GAME.context.clear,
        drawImage: drawImage
    };
};



// Update scores and animations
GAME.update = function (elapsedTime) {
    

    if (GAME.Score.newLevel) {

        GAME.updateNewLevelAnimation(elapsedTime);

    }
    else {    


        // Coins don't get updated during interlude.
        GAME.updateCoins(elapsedTime);
    }

    // other updates.
    // TODO:
    // Here is where clicks are verified and explosions setup ... eventually.
};




// Updates new-level animation elements' states.
GAME.updateNewLevelAnimation = function (elapsedTime) {

    GAME.Data.newLevelAnimationTime += elapsedTime;

    if ( GAME.Data.newLevelAnimationTime < 1) {

        // Do nothing msg is set in update coins.
    }
    else if (GAME.Data.newLevelAnimationTime > 1 && GAME.Data.newLevelAnimationTime < 2) {

        GAME.Data.newLevelMsg.font = 'bold 60px Arial';
        GAME.Data.newLevelMsg.txt = 'GET READY!';
        GAME.Data.newLevelMsg.location.x = 100;
        GAME.Data.newLevelMsg.location.y = 200;
    }
    else if (GAME.Data.newLevelAnimationTime > 2 && GAME.Data.newLevelAnimationTime < 3) {

        GAME.Data.newLevelMsg.font = 'bold 90px Arial';
        GAME.Data.newLevelMsg.txt = '3';
        GAME.Data.newLevelMsg.location.x = 250;
        GAME.Data.newLevelMsg.location.y = 300;
    }
    else if (GAME.Data.newLevelAnimationTime > 3 && GAME.Data.newLevelAnimationTime < 4) {

        GAME.Data.newLevelMsg.font = 'bold 90px Arial';
        GAME.Data.newLevelMsg.txt = '2';
        GAME.Data.newLevelMsg.location.x = 250;
        GAME.Data.newLevelMsg.location.y = 300;
    }
    else if (GAME.Data.newLevelAnimationTime > 4 && GAME.Data.newLevelAnimationTime < 5) {

        GAME.Data.newLevelMsg.font = 'bold 90px Arial';
        GAME.Data.newLevelMsg.txt = '1';
        GAME.Data.newLevelMsg.location.x = 250;
        GAME.Data.newLevelMsg.location.y = 300;
    }
    else if (GAME.Data.newLevelAnimationTime > 5 && GAME.Data.newLevelAnimationTime < 6) {

        GAME.Data.newLevelMsg.font = 'bold 90px Arial';
        GAME.Data.newLevelMsg.txt = '0';
        GAME.Data.newLevelMsg.location.x = 250;
        GAME.Data.newLevelMsg.location.y = 300;
    }
    else {

        GAME.Score.newLevel = false;
    }
};




// Render the new-level elements.
GAME.newLevelAnimation = function (){    

    GAME.graphics.clear();

    // Draw
    GAME.context.translate(GAME.Data.newLevelMsg.location.x, GAME.Data.newLevelMsg.location.y);
    GAME.context.font = GAME.Data.newLevelMsg.font;

    // Draw Piggy ... TODO
    GAME.context.fillText(GAME.Data.newLevelMsg.txt, 0, 0);

    GAME.context.translate(-GAME.Data.newLevelMsg.location.x, -GAME.Data.newLevelMsg.location.y);
    //GAME.context.fillText(GAME.Score.levelScore, 0, 0);
    //GAME.context.fillText(GAME.Score.totalScore, 0, 50);
    GAME.context.restore();

};




GAME.finalAnimation = function () {

    GAME.graphics.clear();

    GAME.context.save();
    // Draw
    GAME.context.translate(50, 200);
    GAME.context.font = 'bold 80px Arial'

    // Draw Piggy ... TODO
    GAME.context.fillText('SUCCESS!', 0, 0);

    GAME.context.fillStyle = 'green';
    GAME.context.font = 'bold 50px Arial'
    GAME.context.fillText('Student Gets an A', 0, 100);

    GAME.context.translate(-50, -200);
    //GAME.context.fillText(GAME.Score.levelScore, 0, 0);
    //GAME.context.fillText(GAME.Score.totalScore, 0, 50);
    GAME.context.restore();

};




//
// Rendering: calls all the drawing functions.
//
GAME.render = function(){

    if (GAME.started) {

        if(GAME.over) {

        GAME.Percistence.saveHighScores();
        GAME.finalAnimation();
        GAME.over = false;
        GAME.started = false;
        
        }
        else if ( GAME.Score.newLevel) {

            GAME.newLevelAnimation();
        }
        else {

            GAME.drawCoins();
            GAME.Score.drawScore();
        }
    }
};






//------------------------------------------------------------------
//
// This is the Game Loop function!
//
//------------------------------------------------------------------
GAME.gameLoop = function (time) {

    if (GAME.started) {

        GAME.graphics.clear();

        //
        // Compute elapsed time in seconds
        var elapsedTime = (time - GAME.lastTimeStamp) / 1000;
        GAME.lastTimeStamp = time;
        
        GAME.update(elapsedTime);

        GAME.render();
        

        requestAnimationFrame(GAME.gameLoop);
    }
};




//------------------------------------------------------------------
//
// This function performs the one-time game initialization.
//
//------------------------------------------------------------------
GAME.initialize = function initialize() {

    //console.log('game initializing...');
    

    // Initialize components

    GAME.graphics = GAME.graphicsInit();
    GAME.Menu.bind2Buttons();
    GAME.Percistence.init();
    GAME.initializeRandomCoins();

    // Set the initial time stamp.
    GAME.lastTimeStamp = performance.now()
;
    // Begin annimation loop.
    requestAnimationFrame(GAME.gameLoop);
};


window.onload = function () {

    GAME.initialize();
};