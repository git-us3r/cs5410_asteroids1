
function Coin(_x, _y, _motionRate, coinDiameter, _img, _type) {

    // Da block
    var coin = {};

    // Members
    coin.size = coinDiameter || 50;
    coin.center = { x: _x, y: _y };
    coin.motionRate = _motionRate || 1;
    coin.visible = true;                         // if false this coin shouldn't be.
    //block.color = 'black';
    coin.image = _img;
    coin.type = _type;



    // Functions
    coin.moveDown = function (timeElapsed) {

        coin.center.y += Math.floor(coin.motionRate * (timeElapsed));
    

    };




    coin.updateCoin = function (elapsedTime) {

            coin.moveDown(elapsedTime);
        
    };




    coin.clickMatches = function (location) {
        var offset = 5;
        if (location.x >= coin.center.x - (coin.size / 2)
            && location.x <= coin.center.x + (coin.size / 2)
            && location.y >= coin.center.y - (coin.size / 2 + offset)
            && location.y <= coin.center.y + (coin.size / 2 - offset)) {

            // if click occurred anywhere within the box return true
            return true;
        }

        return false;
    }

    return coin;
}