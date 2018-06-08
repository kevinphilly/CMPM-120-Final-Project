var interactReggie;
var interactShawn;
var interactMelvin;
var talkFriends = false;

var afterSchool = function(game){};
afterSchool.prototype = {
	preload: function(){
		game.load.spritesheet('shawn', 'assets/img/shawn.png');
		game.load.spritesheet('reggie', 'assets/img/reggie.png');
		game.load.spritesheet('melvin', 'assets/img/melvin.png');
		game.load.image('ShawnPortrait', 'assets/img/shawnPortrait.png');
		game.load.image('ReggiePortrait', 'assets/img/reggiePortrait.png');
		game.load.text('afterSchoolScript', 'js/z-afterSchoolText.json');
	},

	create: function(){
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'school');
		game.world.setBounds(0, 0, 1200, 600);

		dialogueAfterSchool = JSON.parse(this.game.cache.getText('afterSchoolScript'));
		currentScript = dialogueAfterSchool;

		//Gates are 463x322

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		//Adds the player character
		player = new DeAndre(game, 500, 417, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);


		Reggie = game.add.sprite(10, 272, 'reggie');
		game.physics.enable(Reggie);	
		Reggie.enableBody = true;
		Reggie.immovable = true;

		Shawn = game.add.sprite(650, 272, 'shawn');
		game.physics.enable(Shawn);
		Shawn.enableBody = true;
		Shawn.immovable = true;

		Melvin = game.add.sprite(900, 292, 'melvin');
		game.physics.enable(Melvin);
		Melvin.enableBody = true;
		Melvin.immovable = true;
		Melvin.scale.y = 1.2
	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(game.physics.arcade.overlap(player, Reggie) == true && interactReggie == null && talkFriends == false){
			interactReggie = game.add.text(Reggie.x, Reggie.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, Reggie) != true && interactReggie != null){
			interactReggie.destroy();
			interactReggie = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, Reggie) == true && talkFriends == false){
			cutscene = true;
			
			currentScript[0].speaker = "Reggie";
			nextDialogue = 0;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			talkFriends = true;
		}

		if(game.physics.arcade.overlap(player, Shawn) == true && interactShawn == null){
			interactShawn = game.add.text(Shawn.x, Shawn.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, Shawn) != true && interactShawn != null){
			interactShawn.destroy();
			interactShawn = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, Shawn) == true && talkFriends == false){
			cutscene = true;
			
			currentScript[0].speaker = "Shawn";
			nextDialogue = 0;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			talkFriends = true;
		}

		if(game.physics.arcade.overlap(player, Melvin) == true && interactMelvin == null){
			interactMelvin = game.add.text(Melvin.x, Melvin.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, Melvin) != true && interactMelvin != null){
			interactMelvin.destroy();
			interactMelvin = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, Melvin) == true && talkFriends == false){
			cutscene = true;
			
			currentScript[0].speaker = "Melvin";
			nextDialogue = 0;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			talkFriends = true;
		}

		if(cutscene == false && talkFriends == true){
			game.camera.fade(0x000000, 4000);
			game.time.events.add(4000, goStore, this);
		}

		


	}
}

function goStore(){
	walkMusic.stop();
	game.state.start('insideStore');
	console.log('goStore');

	
}

var talkReggie = false;
var talkShawn = false;
var talkMelvin = false;
var clerkConflict = false;
var policeArrive = false;
var interactions = 0;

var insideStore = function(game){};
insideStore.prototype = {
	preload: function(){
		game.load.image('store1', 'assets/img/store1.png');
		game.load.image('store2', 'assets/img/store2.png');
		game.load.spritesheet('clerk', 'assets/img/clerk.png');
		game.load.text('storeScene', 'js/z-storeScene.json');
	},

	create: function(){
		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		background = this.game.add.tileSprite(0, 0, 1200, 600, 'store1');
		background = this.game.add.tileSprite(1200, 0, 1800, 600, 'store2');
		game.world.setBounds(0, 0, 1800, 600);

		storeDialogue = JSON.parse(this.game.cache.getText('storeScene'));
		currentScript = storeDialogue;

		//Adds the player character
		player = new DeAndre(game, 1333, 390, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.12;

		Reggie = game.add.sprite(1000, 272, 'reggie');
		game.physics.enable(Reggie);
		Reggie.enableBody = true;
		Reggie.immovable = true;

		Shawn = game.add.sprite(300, 272, 'shawn');
		game.physics.enable(Shawn);
		Shawn.enableBody = true;
		Shawn.immovable = true;

		Melvin = game.add.sprite(700, 281, 'melvin');
		game.physics.enable(Melvin);
		Melvin.enableBody = true;
		Melvin.immovable = true;
		Melvin.scale.y = 1.2

		//Adds the store clerk
		clerk = game.add.sprite(0, 272, 'clerk');
		game.physics.enable(clerk);
		clerk.enableBody = true;
		clerk.immovable = true;

	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(game.physics.arcade.overlap(player, Reggie) == true && interactReggie == null && talkReggie == false){
			interactReggie = game.add.text(Reggie.x, Reggie.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, Reggie) != true && interactReggie != null){
			interactReggie.destroy();
			interactReggie = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, Reggie) == true && talkReggie == false){
			cutscene = true;
			
			nextDialogue = 0;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			talkReggie = true;
			interactions++;
		}

		if(game.physics.arcade.overlap(player, Shawn) == true && interactShawn == null){
			interactShawn = game.add.text(Shawn.x, Shawn.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, Shawn) != true && interactShawn != null){
			interactShawn.destroy();
			interactShawn = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, Shawn) == true && talkShawn == false){
			cutscene = true;
			
			nextDialogue = 4;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			talkShawn = true;
			interactions++;
		}

		if(game.physics.arcade.overlap(player, Melvin) == true && interactMelvin == null){
			interactMelvin = game.add.text(Melvin.x, Melvin.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, Melvin) != true && interactMelvin != null){
			interactMelvin.destroy();
			interactMelvin = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, Melvin) == true && talkMelvin == false){
			cutscene = true;
			
			nextDialogue = 9;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			talkMelvin = true;
			interactions++;
		}

		if(interactions == 3 && cutscene == false && clerkConflict == false){
			cutscene = true;

			nextDialogue = 14;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			clerkConflict = true;
		}

		if(lastChoice == 1 && clerkConflict == true){
			lastChoice = 0;			

			nextDialogue = 26;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			policeArrive = true;
		}

		if(lastChoice == 2 && clerkConflict == true){
			lastChoice = 0;			

			nextDialogue = 37;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			policeArrive = true;
		}

		if(policeArrive == true && cutscene == false){
			game.camera.flash(0xff0000, 500);
			game.camera.flash(0x0000ff, 1000);

			game.camera.fade(0x000000, 2000);
			game.time.events.add(3000, exitStore, this);
		}

	}
}

function exitStore(){
	game.state.start('outsideStore');
	console.log('exitStore');

	
}
var kickedOut = false;
var gunDrawn = false;
var phoneRang = false;

var outsideStore = function(game){};
outsideStore.prototype = {
	preload: function(){
		game.load.image('storeExterior', 'assets/img/storeExterior.png');
		game.load.spritesheet('DAcop', 'assets/img/DAcop.png', 288, 288, 7);
	},

	create: function(){
		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'storeExterior');

		//Adds the player character
		player = new DeAndre(game, 360, 400, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.x = .75;
		player.scale.y = .9;
		speed = 1000;
		player.frame = 16;
		player.animations.add('deAndreDeath', [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 2, false);
		player.animations.add('phoneRings', [12, 13, 14, 15, 16, 12, 13, 14, 15, 16], 6, false);

		DAcop = game.add.sprite(600, 270, 'DAcop');
		DAcop.enableBody = true;
		game.physics.enable(DAcop);
		DAcop.scale.x = 0.8;
		DAcop.scale.y = 0.95;
		DAcop.frame = 3;
		DAcop.animations.add('drawGun', [3, 4, 5], 4, false);
		DAcop.animations.add('fireGun', [6], 1, false);

		cutscene = true;
		nextDialogue = 40;
		nextText = currentScript[nextDialogue].Text;
		currentDialogue(nextText, currentScript);
	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(cutscene == true && (nextDialogue == 50 || nextDialogue == 60) && gunDrawn == false){
			gunDrawn = true;
			DAcop.animations.play('drawGun');
		}

		if(cutscene == true && (nextDialogue == 48 || nextDialogue == 58) && phoneRang == false){
			phoneRang = true;
			player.animations.play('phoneRings');
		}

		if(lastChoice == 1 && kickedOut == false){
			lastChoice = 0;
			cutscene = true;
			kickedOut = true;

			nextDialogue = 41;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(lastChoice == 2 && kickedOut == false){
			lastChoice = 0;
			cutscene = true;
			kickedOut = true;

			nextDialogue = 52;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(cutscene == false && kickedOut == true){
			cutscene = true;
			currentArc = 'carla';
			game.time.events.add(1500, deAndreDie, this);
		}
	}
}

function deAndreDie(){
	game.camera.fade(0x000000, 7469);
			player.animations.play('deAndreDeath');
			DAcop.animations.play('fireGun');
			game.time.events.add(8000, backToMenu, this);
}

function backToMenu(){
	cutscene = false;
	game.state.start('mainMenu');

}

game.state.add('afterSchool', afterSchool);
game.state.add('insideStore', insideStore);
game.state.add('outsideStore', outsideStore);