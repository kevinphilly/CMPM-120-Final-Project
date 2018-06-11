var melvinText = false;
var runIntoPolice = false;

var walkToSchool = function(game){};
walkToSchool.prototype = {
	preload: function(){
		game.load.text('walkToSchool', 'js/z-walkToSchool.json');
		game.load.image('street1', 'assets/img/street1.png');
		game.load.spritesheet('police1', 'assets/img/police1.png', 256, 256, 2);
		game.load.image('MelvinPortrait', 'assets/img/melvinPortrait.png');
		game.load.image('DavidWhitePortrait', 'assets/img/policePortrait.png', 200, 200);
		game.load.audio('walking', 'assets/audio/MusicOfMagic.MP3');
	},

	create: function(){
		game.world.setBounds(0, 0, 4800, 600);
		streetBackground = this.game.add.tileSprite(0, 0, 4800, 600, 'street1');
		dialogueWalk = JSON.parse(this.game.cache.getText('walkToSchool'));
		currentScript = dialogueWalk;

		walkMusic = game.add.audio('walking');
		walkMusic.play('', 0, 1, true);

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		//Adds the player character
		player = new DeAndre(game, 0, 480, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.x = .6;
		player.scale.y = .7;
		speed = 300;
		player.animations.add('phoneRings', [12, 13, 14, 15, 16, 12, 13, 14, 15, 16], 6, false);

		//Adds a police officer
		police1 = game.add.sprite(3000, 400, 'police1');
		game.physics.enable(police1);
		police1.enableBody = true;
		police1.immovable = true;
		police1.scale.x = .7;
		police1.scale.y = .7;

	
		game.time.events.add(5000, getText, this);

	},

	


	update: function(){

		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);


		}

		if(melvinText == false && lastChoice == 1){
			melvinText = true;
			lastChoice = 0;
			cutscene = false;
		}

		if(melvinText == false && lastChoice == 2){
			melvinText = true;
			lastChoice = 0;
			cutscene = false;

			speed = 800;
		}

		if(game.physics.arcade.overlap(player, police1) && speed == 800 && cutscene == false && runIntoPolice == false){

			runIntoPolice = true;
			nextDialogue = 2;
			cutscene = true;
			police1.frame = 1;
			
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			
			console.log('bump police');

			
		}

		if(runIntoPolice == true && lastChoice == 1){
			lastChoice = 0;
			nextDialogue = 3;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			speed = 500;
		}

		if(runIntoPolice == true && lastChoice == 2){
			lastChoice = 0;
			nextDialogue = 9;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			speed = 500;
		}

		if(player.x >= 4700){
			game.state.start('outsideSchool');
		}


	},
}

function getText(){
	nextDialogue = 0;
	cutscene = true;
	player.animations.play('phoneRings');
	nextText = currentScript[nextDialogue].Text;
	currentDialogue(nextText, currentScript);

	
}

var outsideSchool = function(game){};
outsideSchool.prototype = {
	preload: function(){
		game.load.image('school', 'assets/img/school.png');
        game.load.image('schoolCopPortrait', 'assets/img/schoolCopPortrait.png');
	},

	create: function(){
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'school');
		game.world.setBounds(0, 0, 1200, 600);

		//Gates are 463x322

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		//Adds the player character
		player = new DeAndre(game, 0, 400, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.12;

		//Adds a police officer
		police1 = game.add.sprite(600, 266, 'police1');
		game.physics.enable(police1);
		police1.enableBody = true;
		police1.immovable = true;
		police1.scale.y = 1.15;
	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(game.physics.arcade.overlap(player, police1) && runIntoPolice == false && cutscene == false){

			cutscene = true;
			runIntoPolice = true;
			nextDialogue = 16;			
			
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
			
			console.log('school police');

			
		}

		if(game.physics.arcade.overlap(player, police1) && runIntoPolice == true && cutscene == false){

			cutscene = true;
			nextDialogue = 26
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			cutscene = true;
			game.camera.fade(0x000000, 4000);
			game.time.events.add(2500, goSchool, this);

		}

		if(lastChoice == 1){
			lastChoice = 0;

			nextDialogue = 20;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);


		}

		if(lastChoice == 2){
			lastChoice = 0;

			nextDialogue = 23;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		// if(runIntoPolice == true && cutscene == false){
		// 	game.camera.fade(0x000000, 4000);
		// 	game.time.events.add(4000, goStore, this);
		// }
	}
}

function goSchool(){
	cutscene = false;
	game.state.start('afterSchool');
	console.log('goSchool');

}
	

game.state.add('walkToSchool', walkToSchool);
game.state.add('outsideSchool', outsideSchool);