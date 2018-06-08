var readyDrinks = false;
var gotCoffee = false;
var coffee, interactCoffee;

var coffeeShop = function(game){};
coffeeShop.prototype = {
	preload: function(){
		this.game.load.atlas('carlaAtlas', 'assets/img/DADraft.png', 'assets/img/DADraft.json');
		game.load.image('coffeeShop', 'assets/img/coffeeShop.png');
		game.load.image('coffeeShop2', 'assets/img/coffeeShop2.png');
		game.load.image('coffee', 'assets/img/coffee.png');
		game.load.text('coffeeShopDialogue', 'js/z-coffeeShop.json');
	},

	create: function(){
		coffeeShopDialogue = JSON.parse(this.game.cache.getText('coffeeShopDialogue'));
		currentScript = coffeeShopDialogue;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		game.world.setBounds(0, 0, 2400, 600);
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'coffeeShop');
		background = this.game.add.tileSprite(1200, 0, 2400, 600, 'coffeeShop2');

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

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(nextDialogue == 12 && readyDrinks == false){
			readyDrinks == true;

			coffee = game.add.sprite(100, 250, 'coffee');
			game.physics.enable(coffee);
			coffee.enableBody = true;
			coffee.immovable = true;
		}

		if(coffee != undefined){
			if(game.physics.arcade.overlap(player, coffee) == true && interactCoffee == null){
				interactCoffee = game.add.text(coffee.x, coffee.y-50, 'E', {fill:"#facade"});
			}

			if(game.physics.arcade.overlap(player, coffee) != true && interactCoffee != null){
				interactCoffee.destroy();
				interactCoffee = null;
			}

			if(game.physics.arcade.overlap(player, coffee) == true){
				coffee.destroy();
				gotCoffee = true;

				game.state.start('carScene');
			}
		}


	}
}

var listenIn = false;

var carScene = function(game){};
carScene.prototype = {
	preload: function(){
		game.load.image('roadBackground', 'assets/img/roadBackground.png');
		game.load.image('car1', 'assets/img/car1.png');
		game.load.text('carSceneText', 'js/z-carScene.json');
	},

	create: function(){
		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		carSceneDialogue = JSON.parse(this.game.cache.getText('carSceneText'));
		currentScript = carSceneDialogue;

		road = game.add.tileSprite(0, 0, 1200, 600, 'roadBackground');

		car1 = game.add.sprite(400, 305, 'car1');
		game.physics.enable(car1);
		car1.enableBody = true;
		car1.immovable = true;

		cutscene = true;

		nextDialogue = 0;
		nextText = currentScript[nextDialogue].Text;
		currentDialogue(nextText, currentScript);
	},

	update: function(){
		road.tilePosition.x -= 5;

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
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

			nextDialogue = 18;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);
		}

		if(listenIn == true && cutscene == false){
			cutscene = true;
			game.camera.fade(0x000000, 4000);
			game.time.events.add(4000, goHouse, this);
		}
		
	}
}

function goHouse(){
	cutscene = false;
	game.state.start('carlaHouse');
}

game.state.add('coffeeShop', coffeeShop);
game.state.add('carScene', carScene);