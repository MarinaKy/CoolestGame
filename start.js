boil.start = function(){};
var start;

boil.start.prototype = {
    preload: function(){
        game.load.spritesheet('start', 'Assets/Spritesheets/startscreen.png',600,600);

    },
    create: function(){
        console.log('You are in the start state');
        //game.stage.backgroundColor = '#000000';
        var menu = game.add.sprite(150,150, 'start');
        var load = menu.animations.add('load');
        menu.animations.play('load', 7, true);
        menu.scale.setTo (2,2);
        game.input.keyboard.addKey(Phaser.Keyboard.SPACE).onDown.add(function(){
            game.state.start('bedroom');
        });
         
    },
    update: function(){
        
    }
};