boil.bedroom = function(){};

var ptag, bedroom, collisions, map, furniture, ikea, idleFrame;
var upIdle = 0
var downIdle = 6
var sideIdle = 3

boil.bedroom.prototype = {
    preload: function(){
        game.load.tilemap('bedroomTilemap', 'Assets/Backgrounds/bedroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bedroomTileset', 'Assets/Backgrounds/bedroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',440,750);
         
    },
    create: function(){
        var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACE);
        enter.onDown.add(changeText, this);
        
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
        ptag.body.collideWorldBounds=true;
        ptag.scale.setTo(-.5,.5);
        ptag.anchor.setTo(0.5);
        
        var collisiondata = map.layers[1].data; 
        for(var i=0;i<collisiondata.length;i++){
            for(var j=0;j<collisiondata[i].length;j++){
                var tile = collisiondata[i][j];
                if (tile.index != -1){
                    console.log(tile.index);
                    map.setCollision(tile.index,'bedroom')
                }

            }
            
        }
        
         furniture = {
//            desk: [
//                [136,137],
//                [151,155],
//                [166,170]
//            ],
//            dresser: [
//                [40,43]
//            ],
//            plant: [
//                [36,39]
//            ],
//            bed: [
//                [61,65],
//                [76,80],
//                [91,95],
//                [106,109]
//            ],
            sammy: [
                [119,121]
            ]
        };
        
        this.setupFurniture();

        text = {
             sammy:{
                 dialog: [
                     'Hey there!',
                ],
                 sprite: null
             },
//            dresser: {
//                dialog: [
//                    'just clothes',
//                ],
//                sprite: null     //'talkfrige'
//            },
//            plant:{
//                dialog: [
//                    'sometimes you look out your window, and see kids trying to throw rocks at your face.',
//                         ],
//                sprite: null
//            },
//            bed:{
//                dialog: [
//                    'This quilt was from your grandma for christmas.',
//                    'She died two weeks ago...',
//                    '...and you didn’t even show up to her funeral.',
//                    'You want to repress that memory',
//                    'You notice something at the foot of the bed.'
//                ],
//                sprite: null
//            }, 
//            wedge: {
//                dialog: [
//                    'You find a packet of mushrooms wedged between the mattress and the frame of the bed.',
//                    'They look old, but at this point you’re too hungry to care.',
//                    'You eat the mushrooms'
//                ],
//                sprite: 'shrooms',
//                //end: 'pop',
//                stateChange: 'oBedroom'
//                
//                
//                
//            }
            
        };

        
},
update: function(){
    var self = this;
            game.physics.arcade.collide(ptag, bedroom, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
        ptag.body.velocity.y =300;
        ptag.body.velocity.x=0;
        ptag.animations.play('walkd', 10,true);
        ptag.scale.setTo(.5,.5);
        idleFrame = downIdle;
        ikea = null;
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
        ptag.body.velocity.y =-300;
        ptag.body.velocity.x=0;
        ptag.animations.play('walku',10,true);
        ptag.scale.setTo(.5,.5);
        idleFrame = upIdle;
        ikea = null;
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
        ptag.body.velocity.x=300;
        ptag.body.velocity.y=0;
        ptag.animations.play('walk',10, true);
        ptag.scale.setTo(-.5,.5);
        idleFrame = sideIdle;
        ikea = null;
       }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
        ptag.body.velocity.x=-300;
        ptag.body.velocity.y=0;
        ptag.animations.play('walk', 10, true);
        ptag.scale.setTo(.5,.5);
        idleFrame = sideIdle;
        ikea = null;
       }
    else{
        ptag.animations.stop();        
        ptag.frame = idleFrame;
        ptag.body.velocity.x=0;
        ptag.body.velocity.y=0;
    }
}
    
setupFurniture: function() {
        var keylist = Object.keys(furniture);
        for(var i=0; i<keylist.length; i++){
            var key = keylist[i];
            for(var j=0; j<furniture[key].length;j++){
                var tiles = furniture[key][j];
                map.setCollisionBetween(tiles[0],tiles[1],'bedroom');
            }
        }
    }
    
     furnitureType: function(index){
         var keylist = Object.keys(furniture);
        for(var i=0; i<keylist.length; i++){
            var key = keylist[i];
            for(var j=0; j<furniture[key].length;j++){
                var tiles = furniture[key][j];
                if (index<=tiles[1] && index>=tiles[0]){
                    return key
                }
            }
        }
         
     }
    

                                    
    
//     if (ptag.x< 15){
//     changeState('street');
//     };
    };