boil.street = function(){};

var ptag, street,collisions,x,y, map, furniture, text, textbox, ikea, idleFrame;
var upIdle = 0
var downIdle = 6
var sideIdle = 3

boil.street.prototype = {
    
    preload: function(){
        game.load.tilemap('streetTilemap', 'Assets/Backgrounds/streetTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('streetTileset', 'Assets/Backgrounds/streetTileset.png',1250,3750);
//        game.load.image('bar', 'Assets/Backgrounds/bar.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',440,750);
        game.load.spritesheet('textbox','Assets/Spritesheets/textbox.png', 1500,470);
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1250,3750);
        game.stage.backgroundColor = '#000000';
        console.log('You are in the street state');        
        map = game.add.tilemap('streetTilemap');
        map.addTilesetImage('streetTileset'); 
        street = map.createLayer('street');
        ptag = game.add.sprite(110,1065, 'ptag');
        ptag.animations.add('walk',[3,4,5]);
        ptag.animations.add('walkd',[6,7,8]);
        ptag.animations.add('walku',[0,1,2]);
        
        game.physics.enable(ptag);
        ptag.body.collideWorldBounds=true;
        ptag.scale.setTo(-.3,.3);
        ptag.anchor.setTo(0.5);
        game.camera.follow(ptag);
        var collisiondata = map.layers[1].data; 
        for(var i=0;i<collisiondata.length;i++){
            for(var j=0;j<collisiondata[i].length;j++){
                var tile = collisiondata[i][j];
                if (tile.index != -1){
                    console.log(tile.index);
                    map.setCollision(tile.index,'street')
                }

            }
            
        }
    
        
        furniture = {
//            shelf: [
//                [56,58],
//                [60,62],
//                [64,65]
//            ],
//            lamp: [
//                [66,68]
//            ],
//////            plant: [
//////                [36,39]
//////            ],
//            bed: [
//                [153,178],
//                [203,228],
//                [253,278]
//            ],
//            sammy: [
//                [120,124]
//            ]
        };
//        
        this.setupFurniture();
//
        text = {
//             sammy:{
//                 dialog: [
//                     'Hey there!',
//                ],
//                 sprite: 'talksammy'
//             },
//            shelf: {
//                dialog: [
//                    'just clothes',
//                ],
//                sprite: null
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
//            }
//            
        }
    },
    update: function(){
        var self = this;
            game.physics.arcade.collide(ptag, street, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
                
     if (ptag.y<124){
     changeState('cafeoutside');
     }
    
        if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
            ptag.body.velocity.y =300;
            ptag.body.velocity.x=0;
            ptag.animations.play('walkd', 10,true);
            ptag.scale.setTo(.33,.33);
            idleFrame = downIdle;
            ikea = null;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            ptag.body.velocity.y =-300;
            ptag.body.velocity.x=0;
            ptag.animations.play('walku',10,true);
            ptag.scale.setTo(.33,.33);
            idleFrame = upIdle;
            ikea = null;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            ptag.body.velocity.x=300;
            ptag.body.velocity.y=0;
            ptag.animations.play('walk',10, true);
            ptag.scale.setTo(-.33,.33);
            idleFrame = sideIdle;
            ikea = null;
       }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            ptag.body.velocity.x=-300;
            ptag.body.velocity.y=0;
            ptag.animations.play('walk', 10, true);
            ptag.scale.setTo(.33,.33);
            idleFrame = sideIdle;
            ikea = null;
       }
        else{
            ptag.animations.stop();        
            ptag.frame = idleFrame;
            ptag.body.velocity.x=0;
            ptag.body.velocity.y=0;
        }


     
},
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
         
     },
    setupFurniture: function(){
        var keylist = Object.keys(furniture);
        for(var i=0; i<keylist.length; i++){
            var key = keylist[i];
            for(var j=0; j<furniture[key].length;j++){
                var tiles = furniture[key][j];
                map.setCollision(tiles[0],tiles[1],'street');
            }
        }
    }

    }








 function changeText(){
        console.log('ikea ST', ikea);
        if(textbox && ikea && wordIndex < text[ikea].dialog.length-1){
           wordIndex++ 
           var newText = text[ikea].dialog[wordIndex]
           words.setText(newText)
        }
        else if(textbox && ikea && wordIndex == text[ikea].dialog.length-1 && text[ikea].stateChange){
                changeState(text[ikea].stateChange)
        }
       
        else if(textbox){
            textbox.destroy();
            textbox=null;
            words.destroy();
            talksprite.destroy();
        }
    
        else if(ikea!== undefined){
//            textbox = game.add.sprite(0,0,'textbox');

        if(ikea !== null){
            var textX =10;
            var textY = 900;
            var textMargin = 75;
            
            textbox = game.add.sprite(textX,textY,'textbox');
            textbox.scale.setTo(.8,.8);
            textbox.animations.add('float',[0,1,2,3,4,5]);
            textbox.animations.play('float',5,true);  
            
            var style = {
                fontSize: '40px',
                fill : 'white',
                wordWrap : true,
                wordWrapWidth : textbox.width-(2*textMargin)
            };
            
            wordIndex = 0
            words = game.add.text(textX+textMargin,textY+textMargin,text[ikea].dialog[wordIndex],style);
            
            if(text[ikea].sprite !== null){
                talksprite = game.add.sprite(400,550,text[ikea].sprite);
                talksprite.scale.setTo(0.8,0.8);
                talksprite.animations.add('talk', [0,1,2,3,4,5,6,7]);
                talksprite.animations.play('talk',5,true);
            }
            //ikea = null;
         }
 }
}