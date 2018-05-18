var afterSchool = function(game){};
afterSchool.prototype = {
	preload: function(){
	
	},

	create: function(){

	},

	update: function(){
		
	}
}

var insideStore = function(game){};
insideStore.prototype = {
	preload: function(){
		game.load.image('store1', 'assets/img/store1.png');
		game.load.spritesheet('clerk', 'assets/img/clerk.png');
		game.load.spritesheet('friend', 'assets/img/friend.png');
	},

	create: function(){
		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'store1');

		//Adds the player character
		player = new DeAndre(game, 500, 440, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.14;
		speed = 1000;

		//Adds the store clerk
		clerk = game.add.sprite(0, 300, 'clerk');
		game.physics.enable(clerk);
		clerk.enableBody = true;
		clerk.immovable = true;

		friend1 = game.add.sprite(800, 300, 'friend');

		friend2 = game.add.sprite(600, 300, 'friend');
		
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

var outsideStore = function(game){};
outsideStore.prototype = {
	preload: function(){
		
	},

	create: function(){
		
	},

	update: function(){
		
	}
}

game.state.add('afterSchool', afterSchool);
game.state.add('insideStore', insideStore);
game.state.add('outsideStore', outsideStore);