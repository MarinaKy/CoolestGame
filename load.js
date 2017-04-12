var boil = {};

boil.load = function(){};

boil.load.prototype = {
    create: function(){
        console.log('You are in the load state');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
        game.time.events.add(100, function(){ changeState('bedroom') });
    }
};

function changeState(state){
//    console.log('x', x);
//    console.log('y', y);
    game.state.start(state);
}