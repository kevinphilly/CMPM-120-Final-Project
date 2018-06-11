var endStreet = false;
var whatsHappening = false;
var getCloser = false;
var runToCheckPoint = false;
var ending;

var goToMarket = function(game){};
goToMarket.prototype = {
	preload: function(){
		game.load.image('cityStreet1', 'assets/img/cityStreet.png');
		game.load.image('crowdF', 'assets/img/CrowdF.png');
		game.load.image('crowdM', 'assets/img/CrowdM.png');
		game.load.image('crowd', 'assets/img/crowd.png');
		game.load.image('papa', 'assets/img/Papa.png');
		game.load.image('rosa', 'assets/img/Rosa.png');
		game.load.image('PapaPortrait', 'assets/img/PapaPortrait.png');
		game.load.image('ICECopPortrait', 'assets/img/ICECopPortrait.png');
	},

	create: function(){
		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		dialogueNextMorning = JSON.parse(this.game.cache.getText('nextMorningText'));
		currentScript = dialogueNextMorning;

		game.world.setBounds(0, 0, 6000, 600);
		background = this.game.add.tileSprite(0, 0, 6000, 600, 'cityStreet1');


		player = new Carla(game, 200, 377, 'carlaAtlas', 7);
		game.add.existing(player);
		speed = 300;
		player.scale.x = 0.5;
		player.scale.y = 0.5;
		game.camera.follow(player);

		carlaMama = game.add.sprite(50, 305, 'carlaMama');
		carlaMama.enableBody = true;
		game.physics.enable(carlaMama);
		carlaMama.scale.x = .5;
		carlaMama.scale.y = .5;
		carlaMama.animations.add('crying', [6, 7, 8, 9], 4, true);
		carlaMama.animations.add('walking', [1, 2, 3, 4, 5], 20, true);

		rosa = game.add.sprite(4200, 330, 'rosa');
		rosa.scale.x = .4;
		rosa.scale.y = .4;


		block = game.add.sprite(4590, 380, '');
		block.enableBody = true;
		game.physics.enable(block);
		block.body.immovable = true;

		crowd = game.add.sprite(4400, 350, 'crowd');
		crowd.scale.x = .5;
		crowd.scale.y = .5;

		papa = game.add.sprite(4650, 390, 'papa');
		papa.scale.x = .4;
		papa.scale.y = .4;

		civ1 = game.add.sprite(5000, 450, 'crowdM');
		civ1.scale.x = .4;
		civ1.scale.y = .4;

		civ2 = game.add.sprite(4850, 400, 'crowdM');
		civ2.scale.x = .4;
		civ2.scale.y = .4;

		civ3 = game.add.sprite(4800, 435, 'crowdM');
		civ3.scale.x = .4;
		civ3.scale.y = .4;

		civ4 = game.add.sprite(4750, 440, 'crowdF');
		civ4.scale.x = .4;
		civ4.scale.y = .4;

		civ5 = game.add.sprite(4760, 350, 'crowdF');
		civ5.scale.x = .4;
		civ5.scale.y = .4;


		cutscene = true;
		player.animations.play('walkRight');

		nextDialogue = 10;
		nextText = currentScript[nextDialogue].Text;
		currentDialogue(nextText, currentScript);
	},

	update: function(){

		var hitBlock = game.physics.arcade.collide(player, block);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(endStreet == false){
			lockMovement = true;
			player.body.velocity.x = speed;
			player.animations.play('walkRight');

			carlaMama.animations.play('walking');

			carlaMama.position.x = player.position.x - 200;
		}

		//Carla and mama first encounter the crowd
		if(player.position.x >= 4065 && whatsHappening == false){
			endStreet = true;
			whatsHappening = true;
			lockMovement = false;
			carlaMama.animations.stop();

			nextDialogue = 23;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		//StayWithMama1
		if(lastChoice == 1 && nextDialogue == 23){
			lastChoice = 0;
			cutscene = true;


			nextDialogue = 24;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);


		}

		//Run to the checkpoint
		if(lastChoice == 1 && nextDialogue == 28){
			lastChoice = 0;
			runToCheckPoint = true;

			nextDialogue = 29;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		//Go to the checkpoint to talk to papa
		if(runToCheckPoint == true && player.position.x >=4500 && nextDialogue == 29){
			cutscene = true;

			nextDialogue = 30;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(nextDialogue == 40 && cutscene == false){
			game.camera.fade(0x000000, 2000);
			game.time.events.add(2000, goEnd, this);
		}

		//stay behind
		if(lastChoice == 2 && nextDialogue == 28){
			lastChoice = 0;
			cutscene = true;

			nextDialogue = 41;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		//end of stay behind/go to final house scene
		if(nextDialogue == 44 && cutscene == false){
			ending = 'stayBehind';

			game.camera.fade(0x000000, 2000);
			game.time.events.add(2000, goFinalHouse, this);
		}


		//Get closer to see
		if(lastChoice == 2 && nextDialogue == 23){
			lastChoice = 0;
			getCloser = true;
			cutscene = true;

			nextDialogue = 49;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

		}

		//See papa at the barricate after getting closer
		if(getCloser == true && player.position.x >=4500 && nextDialogue == 52){
			cutscene = true;

			nextDialogue = 53;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(nextDialogue == 62 && game.physics.arcade.overlap(player, carlaMama) == true && interactTextMama == null){
			interactTextMama = game.add.sprite((carlaMama.x+carlaMama.width/2) - 37.5,carlaMama.y - 75, 'eButton');
		}

		if(nextDialogue == 62 && game.physics.arcade.overlap(player, carlaMama) != true && interactTextMama != null){
			interactTextMama.destroy();
			interactTextMama = null;
		}

		if(nextDialogue == 62 && game.physics.arcade.overlap(player, carlaMama) == true && game.input.keyboard.justPressed(Phaser.Keyboard.E)){
			cutscene = true;

			nextDialogue = 63;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		//Tell her the truth
		if(lastChoice == 1 && nextDialogue == 64){
			lastChoice = 0;
			cutscene = true;

			nextDialogue = 65;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(cutscene == false && nextDialogue == 72){
			game.camera.fade(0x000000, 2000);
			game.time.events.add(2000, goEnd, this);
		}

		//Lie about seeing papa
		if(lastChoice == 2 && nextDialogue == 64){
			lastChoice = 0;
			cutscene = true;

			nextDialogue = 73;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		//Lie and they go back to the house
		if(cutscene == false && nextDialogue == 75){
			ending = 'lie';

			game.camera.fade(0x000000, 2000);
			game.time.events.add(2000, goFinalHouse, this);
		}

		//End of lie and go to end screen
		if(cutscene == false && nextDialogue == 87){
			game.camera.fade(0x000000, 2000);
			game.time.events.add(2000, goEnd, this);
		}

	}
}

function goFinalHouse(){
	game.state.start('finalHouse');
}

function goEnd(){
	game.state.start('End');
}


game.state.add('goToMarket', goToMarket);
