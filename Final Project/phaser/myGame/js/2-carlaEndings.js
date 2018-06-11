var finished = false;

var finalHouse = function(game){};
finalHouse.prototype = {
	preload: function(){
		
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

		carlaMama = game.add.sprite(200, 304, 'carlaMama');
		carlaMama.enableBody = true;
		game.physics.enable(carlaMama);

		if(ending === 'stayBehind'){
			cutscene = true;
			finished = true;

			nextDialogue = 45;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(ending === 'lie'){
			cutscene = true;
			finished = true;

			isabel = game.add.sprite(600, 252, 'isabel');
			isabel.enableBody = true;
			game.physics.enable(isabel);   
			isabel.scale.y = 1.2;
			isabel.body.setSize(100, 200, 80, 20);

			emma = game.add.sprite(816, 252, 'emma');
			emma.enableBody = true;
			game.physics.enable(emma);
			emma.scale.y = 1.2;

			nextDialogue = 76;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}
	},

	update: function(){
		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}
		
		if(finished == true && cutscene == false){
			game.camera.fade(0x000000, 2000);
			game.time.events.add(2000, goEnd, this);
		}
	}
}

var End = function(game){};
End.prototype = {
	preload: function(){
		game.load.image('mainMenuCarla', 'assets/img/mainMenuCarla.png');
		game.load.text('endingScene', 'js/z-endingScene.json');
	},

	create: function(){
		dialogueEnding= JSON.parse(this.game.cache.getText('endingScene'));
		currentScript = dialogueEnding;

		game.world.setBounds(0, 0, 120, 600);
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'mainMenuCarla');

		mainMenuTV = game.add.sprite(304, 100, 'mainMenuTV');
		mainMenuTV.animations.add('static', [1, 5, 6], 8, true);
		mainMenuTV.animations.play('static');
		mainMenuTV.animations.add('news', [0], 1, true);

		mainMenuTV.frame = 0;

		cutscene = true;

		nextDialogue = 0;
		nextText = currentScript[nextDialogue].Text;
		currentDialogue(nextText, currentScript);
	},

	update: function(){
		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(nextDialogue == 6){
			mainMenuTV.frame = 4;
		}

		if(nextDialogue == 11){
			mainMenuTV.frame = 9;
		}

		if(nextDialogue == 16){
			mainMenuTV.frame = 14;
		}

		if(nextDialogue == 19){
			mainMenuTV.frame = 19;
		}

		if(lastChoice == 1){
			lastChoice = 0;
			cutscene = true;

			nextDialogue = 19;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(lastChoice == 2){
			lastChoice = 0;
			cutscene = true;

			nextDialogue++;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}
	}
}

game.state.add('finalHouse', finalHouse);
game.state.add('End', End);