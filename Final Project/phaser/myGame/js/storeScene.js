var interactFriend1;
var interactFriend2;
var interactFriend3;
var talkFriends = false;

var afterSchool = function(game){};
afterSchool.prototype = {
	preload: function(){
		game.load.spritesheet('friend', 'assets/img/friend.png');
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
		player = new DeAndre(game, 0, 390, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.12;

		friend1 = game.add.sprite(800, 300, 'friend');
		game.physics.enable(friend1);
		friend1.enableBody = true;
		friend1.immovable = true;

		friend2 = game.add.sprite(600, 300, 'friend');
		game.physics.enable(friend2);
		friend2.enableBody = true;
		friend2.immovable = true;

		friend3 = game.add.sprite(1000, 300, 'friend');
		game.physics.enable(friend3);
		friend3.enableBody = true;
		friend3.immovable = true;
	},

	update: function(){
		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			text3.destroy();

			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(game.physics.arcade.overlap(player, friend1) == true && interactFriend1 == null && talkFriends == false){
			interactFriend1 = game.add.text(friend1.x, friend1.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, friend1) != true && interactFriend1 != null){
			interactFriend1.destroy();
			interactFriend1 = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, friend1) == true && talkFriends == false){
			cutscene = true;
			
			currentScript[0].speaker = "Reggie";
			nextDialogue = 0;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			talkFriends = true;
		}

		if(game.physics.arcade.overlap(player, friend2) == true && interactFriend2 == null){
			interactFriend2 = game.add.text(friend2.x, friend2.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, friend2) != true && interactFriend2 != null){
			interactFriend2.destroy();
			interactFriend2 = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, friend2) == true && talkFriends == false){
			cutscene = true;
			
			currentScript[0].speaker = "Shawn";
			nextDialogue = 0;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

			talkFriends = true;
		}

		if(game.physics.arcade.overlap(player, friend3) == true && interactFriend3 == null){
			interactFriend3 = game.add.text(friend3.x, friend3.y-50, 'E', {fill:"#facade"});
		}

		if(game.physics.arcade.overlap(player, friend3) != true && interactFriend3 != null){
			interactFriend3.destroy();
			interactFriend3 = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, friend3) == true && talkFriends == false){
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
	game.state.start('insideStore');
	console.log('goStore');

	
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
		player = new DeAndre(game, 500, 420, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.x = .75;
		player.scale.y = .9;
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
		game.load.image('storeExterior', 'assets/img/storeExterior.png');
	},

	create: function(){
		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'storeExterior');

		//Adds the player character
		player = new DeAndre(game, 500, 420, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.x = .75;
		player.scale.y = .9;
		speed = 1000;
	},

	update: function(){
		
	}
}

game.state.add('afterSchool', afterSchool);
game.state.add('insideStore', insideStore);
game.state.add('outsideStore', outsideStore);