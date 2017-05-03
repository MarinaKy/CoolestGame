boil.cafeoutside = function(){};

var ptag, x, y, cafeoutside,collisions, map, furniture, text, textbox, ikea, idleFrame;
var upIdle = 0
var downIdle = 6
var sideIdle = 3

var selectedChoice = 1

boil.cafeoutside.prototype = {
    preload: function(){
        game.load.tilemap('cafeoutsideTilemap', 'Assets/Backgrounds/cafeoutsideTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('cafeoutsideTileset', 'Assets/Backgrounds/cafeoutsideTileset.png');
        game.load.image('bar', 'Assets/Backgrounds/bar.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',440,750);
        game.load.spritesheet('textbox','Assets/Spritesheets/textbox.png', 1500,470);
        game.load.image('arrow','Assets/Spritesheets/arrow.png');

    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1250,1250);
        game.stage.backgroundColor = '#000000';
        console.log('You are in the cafeoutside state');        
        map = game.add.tilemap('cafeoutsideTilemap');
        map.addTilesetImage('cafeoutsideTileset');

        cafeoutside = map.createLayer('cafeoutside');
        ptag = game.add.sprite(game.world.centerX+350,game.world.centerY+450, 'ptag');
        ptag.animations.add('walk',[3,4,5]);
        ptag.animations.add('walkd',[6,7,8]);
        ptag.animations.add('walku',[0,1,2]);
        
        game.physics.enable(ptag);
        ptag.body.collideWorldBounds=true;
        ptag.scale.setTo(-.3,.3);
        ptag.anchor.setTo(0.5);
        game.add.sprite(0,0,'bar');
        var collisiondata = map.layers[1].data; 
        for(var i=0;i<collisiondata.length;i++){
            for(var j=0;j<collisiondata[i].length;j++){
                var tile = collisiondata[i][j];
                if (tile.index != -1){
                    console.log(tile.index);
                    map.setCollision(tile.index,'cafeoutside')
                }

            }
            
        }
    
        
        furniture = {
            cafe: [
                [426,427],
                [428,429],
            ],
            01: [
                [177,178,179]
            ],
            02: [
                [183,184,185]
            ],
            03: [
                [189,190,191]
            ],
            04: [
                [195,196,197]
            ],
//            counter: [
//                [354,356],
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
             cafe:{
                 dialog: [
                     'Entering: Cafe',
                ],
                 sprite: null,
                 stateChange: 'cafe'
             },
             01:{
                 dialog: [
                     'Entering: Apartment 01',
                ],
                 sprite: null,
                 stateChange: 'sbedroom'
            },
             02:{
                 dialog: [
                     'Entering: Apartment 02',
                ],
                 sprite: null,
                 stateChange: 'pbedroom'
            },
             03:{
                 dialog: [
                     'Entering: Apartment 03',
                ],
                 sprite: null,
                 stateChange: 'cbedroom'
            },
             04:{
                 dialog: [
                     'Entering: Apartment 04',
                ],
                 sprite: null,
                 stateChange: 'pepbedroom'
            },
//            window:{
//                 dialog: [
//                     'Who is that ugly person?',
//                     'Oh wait',
//                     'It’s just your reflection',
//,
//                ],
//                 sprite: null,
//            },
//            stair:{
//                 dialog: [
//                    'These stairs go higher than your self esteem',
//                ],
//                 sprite: null,
//            },
//            couch:{
//                dialog:[
//                    'You found this couch on the sidewalk a few years ago.',
//                    'There are suspicious stains all over it...'
//                ],
//                sprite: null
//            },
            wedge: {
                dialog: [
                    'You find a packet of mushrooms wedged between the mattress and the frame of the bed.',
                    'They look old, but at this point you’re too hungry to care.',
                    'You eat the mushrooms'
                ],
                sprite: 'shrooms',
                //end: 'pop',
                stateChange: 'ocafeoutside'              
            }
            
        }
    },
    update: function(){
        var self = this;
            game.physics.arcade.collide(ptag, cafeoutside, function(obj1, obj2) { 
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
            ptag.scale.setTo(.3,.3);
            idleFrame = downIdle;
            ikea = null;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            ptag.body.velocity.y =-300;
            ptag.body.velocity.x=0;
            ptag.animations.play('walku',10,true);
            ptag.scale.setTo(.3,.3);
            idleFrame = upIdle;
            ikea = null;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            ptag.body.velocity.x=300;
            ptag.body.velocity.y=0;
            ptag.animations.play('walk',10, true);
            ptag.scale.setTo(-.3,.3);
            idleFrame = sideIdle;
            ikea = null;
       }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            ptag.body.velocity.x=-300;
            ptag.body.velocity.y=0;
            ptag.animations.play('walk', 10, true);
            ptag.scale.setTo(.3,.3);
            idleFrame = sideIdle;
            ikea = null;
       }
        else{
            ptag.animations.stop();        
            ptag.frame = idleFrame;
            ptag.body.velocity.x=0;
            ptag.body.velocity.y=0;
        }

        if (choice1Text && choice2Text) {
            console.log(selectedChoice)
            if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                
                if(selectedChoice===1){
                    selectedChoice=2
                }
                else{
                    selectedChoice=1
                }
                console.log(selectedChoice)
            }
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
                map.setCollision(tiles[0],tiles[1],'cafeoutside');
            }
        }
    }

    }







 function changeText(){
        console.log('ikea oooooo', ikea);
        if(textbox && ikea && wordIndex < text[ikea].dialog.length-1){
           wordIndex++ 
           
           var newText = text[ikea].dialog[wordIndex];
           dialogSplit = newText.split('|')
            
            if(dialogSplit.length===3){
               newText = dialogSplit[0]
               choice1Text.setText(dialogSplit[1])
               choice2Text.setText(dialogSplit[2])
            }
            else{
                choice1Text.setText('');
                choice2Text.setText('')
            }
           
//           var newText = text[ikea].dialog[wordIndex]
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
            choice1Text.destroy();
            choice2Text.destroy();
        }
    
        else if(ikea!== undefined){
//            textbox = game.add.sprite(0,0,'textbox');

        if(ikea !== null){
            var textX =10;
            var textY = 875;
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
            
            console.log('add text', ikea);
            
            wordIndex = 0
            words = game.add.text(textX+textMargin,textY+textMargin,text[ikea].dialog[wordIndex],style);
            
            var choiceVertOffset = 200
            var choiceBaseOffset = textX+textMargin+145
            
            choice1Text = game.add.text(choiceBaseOffset,textY+textMargin+choiceVertOffset,'',style)
            choice2Text = game.add.text(choiceBaseOffset + 300,textY+textMargin+choiceVertOffset,'',style)
            
            if(text[ikea].sprite !== null){
                talksprite = game.add.sprite(400,475,text[ikea].sprite);
                talksprite.scale.setTo(0.8,0.8);
                talksprite.animations.add('talk', [0,1,2,3,4,5,6,7]);
                talksprite.animations.play('talk',5,true);
            }
            //ikea = null;
         }
 }
}