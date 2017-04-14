boil.bedroom = function(){};

var ptag, bedroom, collisions, map;

boil.bedroom.prototype = {
    preload: function(){
        game.load.tilemap('bedroomTilemap', 'Assets/Backgrounds/bedroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bedroomTileset', 'Assets/Backgrounds/bedroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',440,750);
         
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1250,1250);
        game.stage.backgroundColor = '#000000';
        console.log('You are in the bedroom state');        
        map = game.add.tilemap('bedroomTilemap');
        map.addTilesetImage('bedroomTileset'); 
        bedroom = map.createLayer('bedroom');
        ptag = game.add.sprite(game.world.centerX+300,game.world.centerY+300, 'ptag');
        ptag.animations.add('walk',[3,4,5]);
        ptag.animations.add('walkd',[6,7,8]);
        ptag.animations.add('walku',[0,1,2]);
        game.physics.enable(ptag);
        ptag.scale.setTo(-.5,.5);
        ptag.anchor.setTo(0.5);
        map.setCollisionByExclusion([0]);
        var collisiondata = map.layers[1].data; 
//        for(var i=0;i<collisiondata.length;i++){
//            for(var j=0;j<collisiondata[i].length;j++){
//                var tile = collisiondata[i][j];
//                if (tile.index != -1){
//                    console.log(tile.index);
//                    map.setCollision(tile.index,'bedroom')
//                }
////                console.log(collisiondata[i][j]);
//            }
//            
//        }

        
},
update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
        ptag.body.velocity.y =300;
        ptag.body.velocity.x=0;
        ptag.animations.play('walkd', 10,true);
        ptag.scale.setTo(.5,.5);
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
        ptag.body.velocity.y =-300;
        ptag.body.velocity.x=0;
        ptag.animations.play('walku',10,true);
        ptag.scale.setTo(.5,.5);
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
        ptag.body.velocity.x=300;
        ptag.body.velocity.y=0;
        ptag.animations.play('walk',10, true);
        ptag.scale.setTo(-.5,.5);
       }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
        ptag.body.velocity.x=-300;
        ptag.body.velocity.y=0;
        ptag.animations.play('walk', 10, true);
        ptag.scale.setTo(.5,.5);
       }
    else{
        ptag.animations.stop('walk');
        ptag.frame = 0;
        ptag.body.velocity.x=0;
        ptag.body.velocity.y=0;
    }
       }
    
//     if (ptag.x< 15){
//     changeState('street');
//     };
    };