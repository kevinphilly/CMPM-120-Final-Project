var coffeeShop = function(game){};
coffeeShop.prototype = {
	preload: function(){
		this.game.load.atlas('carlaAtlas', 'assets/img/DADraft.png', 'assets/img/DADraft.json');
		game.load.image('coffeeShop', 'assets/img/coffeeShop.png');

	},

	create: function(){
		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'coffeeShop');

		player = new Carla(game, 500, 420, 'carlaAtlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}
	}
}

game.state.add('coffeeShop', coffeeShop);