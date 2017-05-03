boil.sbedroom = function(){};

var ptag, x, y, sbedroom,collisions, map, furniture, text, textbox, ikea, idleFrame;
var upIdle = 0
var downIdle = 6
var sideIdle = 3

boil.sbedroom.prototype = {
    preload: function(){
        game.load.tilemap('sbedroomTilemap', 'Assets/Backgrounds/sbedroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('sbedroomTileset', 'Assets/Backgrounds/sbedroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',440,750);
        game.load.spritesheet('textbox','Assets/Spritesheets/textbox.png', 1500,470);
//        game.load.spritesheet('talksammy','Assets/Spritesheets/talksammy.png', 874,500);
//        game.load.spritesheet('sammy','Assets/Spritesheets/sammy.png', 500,500);
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1250,1250);
        game.stage.backgroundColor = '#000000';
        console.log('You are in the sbedroom state');        
        map = game.add.tilemap('sbedroomTilemap');
        map.addTilesetImage('sbedroomTileset'); 
        sbedroom = map.createLayer('sbedroom');
        ptag = game.add.sprite(game.world.centerX+350,game.world.centerY+450, 'ptag');
        ptag.animations.add('walk',[3,4,5]);
        ptag.animations.add('walkd',[6,7,8]);
        ptag.animations.add('walku',[0,1,2]);
        
        game.physics.enable(ptag);
        ptag.body.collideWorldBounds=true;
        ptag.scale.setTo(-.33,.33);
        ptag.anchor.setTo(0.5);
        
        var collisiondata = map.layers[1].data; 
        for(var i=0;i<collisiondata.length;i++){
            for(var j=0;j<collisiondata[i].length;j++){
                var tile = collisiondata[i][j];
                if (tile.index != -1){
                    console.log(tile.index);
                    map.setCollision(tile.index,'sbedroom')
                }

            }
            
        }
    
        
        furniture = {
            shelf: [
                [86,87],
                [88,89,90]
            ],
            lamp: [
                [125,126,127]
            ],
////            plant: [
////                [36,39]
////            ],
            bed: [
                [155,180],
                [205,230],
                [255,280],
                [303,305],
                [305,306],
                [307,308],
                [309,310],
                [110,135],
                [160,185],
                [210,235],
                [260,285],
                
            ],
//            sammy: [
//                [120,124]
//            ],
//            counter: [
//                [354,355,],
//                [356,557],
//                [358,360]
//            ],
//            couch: [
//                [527,552],
//                [577,602]
//            ],
            
        };
//        
        this.setupFurniture();
//
        text = {
             
            shelf: {
                dialog: [
                   
                    'You wonder what kind of books she reads',
                    'Oh yea',
                    'You can’t read',
                ],
                sprite: null
            },
            lamp:{
                dialog: [
                    'This lamp costs more than your life',
                         ],
                sprite: null
            },
            bed:{
                dialog: [
                   'It looks more comfortable than yours',
                ],
                sprite: null
            }, 
            table: {
                dialog: [
                    'You did not know that you could stoop so low....'
                    '...oh wait...you cant...'
                ]
            },
          
//            wedge: {
//                dialog: [
//                    'You find a packet of mushrooms wedged between the mattress and the frame of the bed.',
//                    'They look old, but at this point you’re too hungry to care.',
//                    'You eat the mushrooms'
//                ],
//                sprite: 'shrooms',
//                //end: 'pop',
//                stateChange: 'osbedroom'              
//            }
//            
        }
    },
    update: function(){
        var self = this;
            game.physics.arcade.collide(ptag, sbedroom, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
                
     if (ptag.x>1161){
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
                map.setCollision(tiles[0],tiles[1],'sbedroom');
            }
        }
    }

    }









 function changeText(){
        console.log('ikeasss', ikea);
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