var interactTextMama;
var interactMama = false;

var carlaHouse = function(game){};
carlaHouse.prototype = {
	preload: function(){
		game.load.image('carlaLivingRoom', 'assets/img/carlaLivingRoom.png');
		game.load.spritesheet('carlaMama', 'assets/img/carlaMama.png', 120, 250);
		game.load.text('carlaHouseDialogue', 'js/z-carlaHouse.json');
	},

	create: function(){
		carlaHouseText = JSON.parse(this.game.cache.getText('carlaHouseDialogue'));
		currentScript = carlaHouseText;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		game.world.setBounds(0, 0, 1800, 600);
		background = this.game.add.tileSprite(0, 0, 1800, 600, 'carlaLivingRoom');


		player = new Carla(game, 500, 415, 'carlaAtlas', 7);
		game.add.existing(player);
		game.camera.follow(player);

		carlaMama = game.add.sprite(50, 350, 'carlaMama');
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
			interactTextMama = game.add.text(carlaMama.x, carlaMama.y-50, 'E', {fill:"#facade"});
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
			game.camera.fade(0x000000, 2000);
			game.time.events.add(3000, goCarlaRoom, this);
		}
	}
}

function goCarlaRoom(){
	game.state.start('carlaRoom');
}

var prayer = false;
var sceneComplete = false;
var nextMorning = true;

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
		game.world.setBounds(0, 0, 1800, 600);

		player = new Carla(game, 500, 420, 'carlaAtlas', 6);
		game.add.existing(player);
		game.camera.follow(player);

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
			prayer = true;

			nextDialogue = 6;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(lastChoice == 2){
			lastChoice = 0;
			prayer = true;

			nextDialogue = 19;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}


		if(cutscene == false && nextDialogue == 18 && nextMorning == false){
			cutscene = true;
			game.camera.fade(0x000000, 2000);
			game.time.events.add(3000, goNextMorning, this);
		}
	}
}

function goNextMorning(){
	game.camera.resetFX();
	nextMorning = true;
	cutscene = false;
}

game.state.add('carlaHouse', carlaHouse);
game.state.add('carlaRoom', carlaRoom);