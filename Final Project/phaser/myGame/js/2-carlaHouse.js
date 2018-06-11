var interactTextMama;
var interactMama = false;

var carlaHouse = function(game){};
carlaHouse.prototype = {
	preload: function(){
		game.load.image('carlaLivingRoom', 'assets/img/carlaLivingRoom.png');
		game.load.spritesheet('carlaMama', 'assets/img/carlaMama.png', 256, 256, 10);
		game.load.text('carlaHouseDialogue', 'js/z-carlaHouse.json');
	},

	create: function(){
		carlaHouseText = JSON.parse(this.game.cache.getText('carlaHouseDialogue'));
		currentScript = carlaHouseText;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		game.world.setBounds(0, 0, 1800, 800);
		background = this.game.add.tileSprite(0, 0, 1800, 600, 'carlaLivingRoom');


		player = new Carla(game, 1600, 424, 'carlaAtlas', 7);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.x = 1.2;
		player.scale.y = 1.2;

		isabel = game.add.sprite(600, 252, 'isabel');
		isabel.enableBody = true;
		game.physics.enable(isabel);
		isabel.scale.y = 1.2;
		isabel.body.setSize(100, 200, 80, 20);

		emma = game.add.sprite(816, 252, 'emma');
		emma.enableBody = true;
		game.physics.enable(emma);
		emma.scale.y = 1.2;

		carlaMama = game.add.sprite(150, 303, 'carlaMama');
		carlaMama.enableBody = true;
		game.physics.enable(carlaMama);
		carlaMama.body.setSize(70, 200, 80, 20);
		carlaMama.animations.add('crying', [6, 7, 8, 9], 4, true);
		carlaMama.animations.add('walking', [1, 2, 3, 4, 5], true);

		carlaMama.animations.play('crying');

	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(game.physics.arcade.overlap(player, carlaMama) == true && interactTextMama == null){
			interactTextMama = game.add.sprite((carlaMama.x+carlaMama.width/2) - 37.5, carlaMama.y - 75, 'eButton');
		}

		if(game.physics.arcade.overlap(player, carlaMama) != true && interactTextMama != null){
			interactTextMama.destroy();
			interactTextMama = null;
		}

		if(game.physics.arcade.overlap(player, carlaMama) == true && interactMama == false && game.input.keyboard.justPressed(Phaser.Keyboard.E)){
			cutscene = true;
			interactMama = true;

			nextDialogue = 0;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(interactMama == true && cutscene == false){
			game.camera.fade(0x000000, 4000);
			game.time.events.add(4000, goCarlaRoom, this);
		}
	}
}

function goCarlaRoom(){
	game.state.start('carlaRoom');
}

var prayer = false;
var sceneComplete = false;
var newDay = false;

var carlaRoom = function(game){};
carlaRoom.prototype = {
	preload: function(){
		game.load.image('carlaRoom', 'assets/img/carlaRoom.png');
		game.load.text('carlaRoomText', 'js/z-carlaRoom.json');
	},

	create: function(){
		dialogueCarlaRoom = JSON.parse(this.game.cache.getText('carlaRoomText'));
		currentScript = dialogueCarlaRoom;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		background = this.game.add.tileSprite(0, 0, 1800, 600, 'carlaRoom');
		game.world.setBounds(0, 0, 1800, 800);

		player = new Carla(game, 500, 328, 'carlaAtlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.x = 2;
		player.scale.y = 2;

		isabel = game.add.sprite(40, 42, 'isabel');
		isabel.enableBody = true;
		game.physics.enable(isabel);
		isabel.scale.x = 1.5;
		isabel.scale.y = 2;
		isabel.body.setSize(100, 200, 80, 20);

		cutscene = true;
		nextDialogue = 0;
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

		if(lastChoice == 1){
			lastChoice = 0;
			cutscene = true;
			prayer = true;

			nextDialogue = 6;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(lastChoice == 2){
			lastChoice = 0;
			cutscene = true;
			prayer = true;

			nextDialogue = 19;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}


		if(cutscene == false && prayer == true && newDay == false){
			cutscene = true;
			newDay = true;

			game.camera.fade(0x000000, 4000);
			game.time.events.add(4000, goNextMorning, this);
		}
	}
}

function goNextMorning(){
	game.camera.resetFX();
	cutscene = false;
	game.state.start('nextMorning');
}

var morningMama = false;

var nextMorning = function(game){};
nextMorning.prototype = {
	preload: function(){
		game.load.text('nextMorningText', 'js/z-nextMorning.json');
	},

	create: function(){
		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		dialogueNextMorning = JSON.parse(this.game.cache.getText('nextMorningText'));
		currentScript = dialogueNextMorning;

		game.world.setBounds(0, 0, 1800, 800);
		background = this.game.add.tileSprite(0, 0, 1800, 600, 'carlaLivingRoom');


		player = new Carla(game, 50, 447, 'carlaAtlas', 7);
		game.add.existing(player);
		game.camera.follow(player);

		carlaMama = game.add.sprite(1400, 304, 'carlaMama');
		carlaMama.enableBody = true;
		game.physics.enable(carlaMama);
	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(game.physics.arcade.overlap(player, carlaMama) == true && interactTextMama == null){
			interactTextMama = game.add.sprite((carlaMama.x+carlaMama.width/2) - 37.5, carlaMama.y - 75, 'eButton');
		}

		if(game.physics.arcade.overlap(player, carlaMama) != true && interactTextMama != null){
			interactTextMama.destroy();
			interactTextMama = null;
		}

		if(game.physics.arcade.overlap(player, carlaMama) == true && game.input.keyboard.justPressed(Phaser.Keyboard.E) && morningMama == false){
			cutscene = true;
			morningMama = true;


			nextDialogue = 0;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(morningMama == true && cutscene == false){
			game.state.start('goToMarket');
		}
	}
}

game.state.add('carlaHouse', carlaHouse);
game.state.add('carlaRoom', carlaRoom);
game.state.add('nextMorning', nextMorning);