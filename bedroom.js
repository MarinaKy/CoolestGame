boil.bedroom = function(){};

var ptag, x, y, bedroom,collisions, map,arrow1,arrow2, furniture, text,response1, response2, textbox, ikea, idleFrame,enter;
var upIdle = 0
var downIdle = 6
var sideIdle = 3

var selectedChoice = 1
var choice1Text, choice2Text

boil.bedroom.prototype = {
    
    toggleChoice: function() {
        
        if(choice1Text && choice2Text) {
            if(selectedChoice===1){
                selectedChoice=2
                arrow2 = game.add.sprite(160,1155,'arrow2')
                arrow1.destroy()
                // Move arrow to right choice   
            }
            else if(selectedChoice===2){
                selectedChoice=1
                arrow2.destroy()
                arrow1 = game.add.sprite(485,1155,'arrow1')
                                     
                // move arrow to left choice
            }
            console.log(selectedChoice) 
        }
        
        
       
    },
    
    preload: function(){
        game.load.tilemap('bedroomTilemap', 'Assets/Backgrounds/bedroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bedroomTileset', 'Assets/Backgrounds/bedroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',440,750);
        game.load.spritesheet('textbox','Assets/Spritesheets/textbox.png', 1500,470);
        game.load.spritesheet('talksammy','Assets/Spritesheets/talksammy.png', 874,500);
        game.load.spritesheet('sammy','Assets/Spritesheets/sammy.png', 500,500);
        game.load.image('arrow1','Assets/Spritesheets/arrow1.png');
        game.load.image('arrow2','Assets/Spritesheets/arrow2.png');
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        enter.onDown.add(changeText, this);

        var left = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        left.onDown.add(this.toggleChoice, this);
        
        var right = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        right.onDown.add(this.toggleChoice, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1250,1250);
        game.stage.backgroundColor = '#000000';
        console.log('You are in the bedroom state');        
        map = game.add.tilemap('bedroomTilemap');
        map.addTilesetImage('bedroomTileset'); 
        bedroom = map.createLayer('bedroom');
        ptag = game.add.sprite(game.world.centerX+350,game.world.centerY+450, 'ptag');
        sammy = game.add.sprite(game.world.centerX+410,game.world.centerY-510,'sammy');
        sammy.scale.setTo(.3,.3);
        sammy.animations.add('swim',[0,1]);
        sammy.animations.play('swim',3, true);
        ptag.animations.add('walk',[3,4,5]);
        ptag.animations.add('walkd',[6,7,8]);
        ptag.animations.add('walku',[0,1,2]);
        
        game.physics.enable(ptag);
        ptag.body.collideWorldBounds=true;
        ptag.scale.setTo(-.35,.35);
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
            shelf: [
                [56,58],
                [60,62],
                [64,65]
            ],
            lamp: [
                [66,68]
            ],
////            plant: [
////                [36,39]
////            ],
            bed: [
                [153,178],
                [203,228],
                [253,278]
            ],
            
            sammy: [
                [120,124]
            ],
            counter: [
                [354,355,],
                [356,557],
                [358,360]
            ],
            couch: [
                [477,502],
                [527,552],
                [577,602]
            ],
            
        };
//        
        this.setupFurniture();
//
        text = {
             sammy:{
                 dialog: [
                     'Oh!!! Hey there! I’m Sammy the Salmon. New to the game, huh??? Press SPACE to see what I have to say next!',
                     'Good job! (Amateur...)',
                     'Look at your keyboard. Now look at me. Now keep looking at me. Aren’t I just super amazing?',
                     '…',
                     'The answer is YES by the way. Use the ARROW KEYS to pick YES and SPACEBAR to confirm your choice.|Yes|No'
                ],
                 response1: 'Psh! I knew it!',
                 response2: 'Haha, what a funny joke. It was a joke...right?',
                 sprite: 'talksammy'
             },
            shelf: {
                dialog: [
                    'You burned almost all of the books last winter',
                    ' But it’s okay,',
                    'You’re illiterate anyway.',
                ],
                sprite: null
            },
            lamp:{
                dialog: [
                    'This lamp would have been the light of your life',
                    'if it worked',
                         ],
                sprite: null
            },
            bed:{
                dialog: [
                    'You’ve had this bed your whole life',
                    'You have to curl up into a ball to sleep on it, but you’ve never had enough money to buy another one.',
                ],
                sprite: null
            }, 
            counter:{
                dialog:[
                    'You own a single cup',
                    '(because you have no friends)',
                ],
                sprite: null
            },
            couch:{
                dialog:[
                    'You found this couch on the sidewalk a few years ago.',
                    'There are suspicious stains all over it...'
                ],
                sprite: null
            },
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
            game.physics.arcade.collide(ptag, bedroom, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
                
     if (ptag.x>1161){
     changeState('street');
     }
    
        if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
            ptag.body.velocity.y =300;
            ptag.body.velocity.x=0;
            ptag.animations.play('walkd', 10,true);
            ptag.scale.setTo(.35,.35);
            idleFrame = downIdle;
            ikea = null;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            ptag.body.velocity.y =-300;
            ptag.body.velocity.x=0;
            ptag.animations.play('walku',10,true);
            ptag.scale.setTo(.35,.35);
            idleFrame = upIdle;
            ikea = null;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            ptag.body.velocity.x=300;
            ptag.body.velocity.y=0;
            ptag.animations.play('walk',10, true);
            ptag.scale.setTo(-.35,.35);
            idleFrame = sideIdle;
            ikea = null;
       }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            ptag.body.velocity.x=-300;
            ptag.body.velocity.y=0;
            ptag.animations.play('walk', 10, true);
            ptag.scale.setTo(.35,.35);
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
                map.setCollision(tiles[0],tiles[1],'bedroom');
            }
        }
    }

    }









 function changeText(){
        
     
     
        console.log('ikea4444', ikea);
        if(textbox && ikea && wordIndex < text[ikea].dialog.length-1){
           wordIndex++ 
           console.log('first', ikea);
           var newText = text[ikea].dialog[wordIndex];
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
            
            dialogSplit = strsplit(text[ikea].dialog[wordIndex],'|');
            var newText = text[ikea].dialog[wordIndex];
            if(dialogSplit.length===3){
                console.log('second', ikea);
               newText = dialogSplit[0]
            }
            
            
            words = game.add.text(textX+textMargin,textY+textMargin,newText,style);
            
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