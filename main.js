var game = new Phaser.Game(1250, 1250, Phaser.AUTO);
game.state.add('load', boil.load);
game.state.add('cafe', boil.cafe);
game.state.add('cafeoutside', boil.cafeoutside);
game.state.add('start', boil.start);
game.state.add('street', boil.street);
game.state.add('building', boil.building);
game.state.add('bedroom', boil.bedroom);
game.state.add('pbedroom', boil.pbedroom);
game.state.add('pepbedroom', boil.pbedroom);
game.state.add('cbedroom', boil.pbedroom);
game.state.add('sbedroom', boil.pbedroom);


//game.state.add('livingR',boil.livingR);
//game.state.add('kitchen',boil.kitchen);
//game.state.add('oBathroom',boil.oBathroom);
//game.state.add('oBedroom',boil.oBedroom);
//game.state.add('oHallway',boil.oHallway);
//game.state.add('oLivingR',boil.oLivingR);
//game.state.add('oKitchen',boil.oKitchen);
//game.state.add('mBathroom',boil.mBathroom);
//game.state.add('mBedroom',boil.mBedroom);
//game.state.add('mHallway',boil.mHallway);
//game.state.add('mLivingR',boil.mLivingR);
//game.state.add('mKitchen',boil.mKitchen);
//game.state.add('GameOver', boil.GameOver);
game.state.start('load'); 