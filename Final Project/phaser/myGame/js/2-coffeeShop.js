var readyDrinks = false;
var gotCoffee = false;
var coffee, interactCoffee, interactIsabel;

var coffeeShop = function(game){};
coffeeShop.prototype = {
	preload: function(){
		this.game.load.atlas('carlaAtlas', 'assets/img/CAself.png', 'assets/img/CAself.json');
		game.load.spritesheet('isabel', 'assets/img/isabel.png', 256, 256, 2);
		game.load.spritesheet('emma', 'assets/img/emma.png', 256, 256);
		game.load.image('coffeeShop', 'assets/img/coffeeShop.png');
		game.load.image('coffeeShop2', 'assets/img/coffeeShop2.png');
		game.load.image('coffee', 'assets/img/coffee.png');
		game.load.image('CarlaPortrait', 'assets/img/CarlaPortrait.png');
		game.load.image('IsabelPortrait', 'assets/img/IsabelPortrait.png');
		game.load.image('EmmaPortrait', 'assets/img/EmmaPortrait.png');
		game.load.image('MamaPortrait', 'assets/img/MamaPortrait.png');
		game.load.image('RosaPortrait', 'assets/img/RosaPortrait.png');
		game.load.text('coffeeShopDialogue', 'js/z-coffeeShop.json');
        game.load.audio('coffeeMusic', 'assets/audio/coffeeShop.mp3');
	},

	create: function(){
		coffeeShopDialogue = JSON.parse(this.game.cache.getText('coffeeShopDialogue'));
		currentScript = coffeeShopDialogue;



		game.world.setBounds(0, 0, 2400, 800);
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'coffeeShop');
		background = this.game.add.tileSprite(1200, 0, 2400, 600, 'coffeeShop2');

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		player = new Carla(game, 1500, 391, 'carlaAtlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.x = 1.4;
		player.scale.y = 1.5;
		player.body.setSize(70, 200, 80, 20);
		speed = 600;

		isabel = game.add.sprite(1500, 201, 'isabel');
		isabel.enableBody = true;
		game.physics.enable(isabel);
		isabel.scale.x = 1.2;
		isabel.scale.y = 1.4;
		isabel.body.setSize(100, 200, 80, 20);

		emma = game.add.sprite(1700, 200, 'emma');
		emma.enableBody = true;
		game.physics.enable(emma);
		emma.scale.x = 1.1;
		emma.scale.y = 1.4;

		cutscene = true;

		nextDialogue = 0;
		nextText = currentScript[nextDialogue].Text;
		currentDialogue(nextText, currentScript);
        
        coffeeMusic = game.add.audio('coffeeMusic');
		coffeeMusic.play('', 0, 1, true);
	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(nextDialogue == 12 && readyDrinks == false){
			readyDrinks = true;

			coffee = game.add.sprite(275, 275, 'coffee');
			game.physics.enable(coffee);
			coffee.enableBody = true;
			coffee.immovable = true;
		}

		if(coffee != undefined){
			if(game.physics.arcade.overlap(player, coffee) == true && interactCoffee == null){
				interactCoffee = game.add.sprite((coffee.x+coffee.width/2) - 37.5, coffee.y - 75, 'eButton');
			}

			if(game.physics.arcade.overlap(player, coffee) != true && interactCoffee != null){
				interactCoffee.destroy();
				interactCoffee = null;

			}

			if(game.physics.arcade.overlap(player, coffee) == true && game.input.keyboard.justPressed(Phaser.Keyboard.E)){
				coffee.destroy();
				gotCoffee = true;
				holdDrink = true;
				//game.state.start('carScene');
			}
		}

		if(game.physics.arcade.overlap(player, isabel) == true && gotCoffee == true){
				interactIsabel = game.add.sprite((isabel.x+isabel.width/2) - 37.5, isabel.y - 75, 'eButton');
			}

		if(game.physics.arcade.overlap(player, isabel) != true && interactIsabel != null){
			interactIsabel.destroy();
			interactIsabel = null;
		}

		if(game.physics.arcade.overlap(player, isabel) == true && game.input.keyboard.justPressed(Phaser.Keyboard.E) && gotCoffee == true){
			gotCoffee = false;
			holdDrink = false;

			nextDialogue = 13;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			game.camera.fade(0x000000, 3000);
			game.time.events.add(3000, goCar, this);
			
		}

	},
}

function goCar(){
    coffeeMusic.stop();
	game.state.start('carScene');
}

var listenIn = false;

var carScene = function(game){};
carScene.prototype = {
	preload: function(){

		game.load.image('car1', 'assets/img/car1.png');
		game.load.image('car2', 'assets/img/car2.png');
		game.load.text('carSceneText', 'js/z-carScene.json');
	},

	create: function(){
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'car1');
		game.world.setBounds(0, 0, 1200, 600);

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		carSceneDialogue = JSON.parse(this.game.cache.getText('carSceneText'));
		currentScript = carSceneDialogue;

		

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

		if(lastChoice == 1 && listenIn == false){
			lastChoice = 0;
			listenIn = true;

			nextDialogue = 1;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(lastChoice == 2 && listenIn == false){
			lastChoice = 0;
			listenIn = true;

			background.destroy();
			background = this.game.add.tileSprite(0, 0, 1200, 600, 'car2');
			nextDialogue = 18;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(listenIn == true && cutscene == false){
			cutscene = true;
			game.camera.fade(0x000000, 5000);
			game.time.events.add(5000, goHouse, this);
		}
		
	}
}

function goHouse(){
	cutscene = false;
	game.state.start('carlaHouse');
}

game.state.add('coffeeShop', coffeeShop);
game.state.add('carScene', carScene);