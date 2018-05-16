var game = new Phaser.Game(1200, 800, Phaser.AUTO);

//Global Variables
var player;
var nextText;
var nextDialogue;
var door;
var lastChoice = 0;
var momScene = false;
var currentScript;
var breakfast = false;
var leaveMom = false;

var mainMenu = function(game){};
mainMenu.prototype = {
	preload: function(){
		game.load.spritesheet('button', 'assets/img/tempButton.png', 88, 67);

		
	},

	create: function(){
		playButton = game.add.button(600, 400, 'button', Play, this, 0);
	},

	update: function(){
		
	}
}

function Play(){
	game.state.start('opening');
}


var opening = function(game){};
opening.prototype = {
	preload: function(){
		console.log('opening scene: preload');

		//Preload assets for opening scene
		game.load.text('speech', 'js/z-opening.json');
		game.load.image('textBox', 'assets/img/floor.png');
		

		
	},

	create: function(){

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;


		//Parses the json file and stores it in dialogue as objects
		dialogue = JSON.parse(this.game.cache.getText('speech'));
		currentScript = dialogue;

//		ground = game.add.tileSprite(0, 600, 1200, 800, 'ground');
		game.world.setBounds(0, 0, 2400, 600);

		nextDialogue = 0;

		//Test: Set nextText to the first dialogue option
		nextText = dialogue[nextDialogue].Text;
		currentDialogue(nextText, dialogue);

		console.log('opening scene: create');

	},

	update: function(){

		if(lastChoice == 1){
			currentDialogue(nextText + " You're gonna be late!", dialogue);
			lastChoice = 0;
		}

		if(lastChoice == 2){
			game.time.events.add(Phaser.Timer.SECOND * 5, game.state.start('bedroom'), this);
			lastChoice = 0;
		}
	},
}

var bedroom = function(game){};
bedroom.prototype = {
	preload: function(){
		this.game.load.atlas('atlas', 'assets/img/DADraft.png', 'assets/img/DADraft.json');
		game.load.spritesheet('door', 'assets/img/door.png', 213, 442);
		this.game.load.image('bedroom1', 'assets/img/bedroom1.png');
		this.game.load.image('bedroom2', 'assets/img/bedroom2.png');

	},

	create: function(){

		nextDialogue = 2;
		nextText = dialogue[nextDialogue].Text;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'bedroom1');
		background = this.game.add.tileSprite(1200, 0, 2400, 600, 'bedroom2');

		currentDialogue(nextText, dialogue);

		console.log(dialogue); //Test

		//Allows the arrow keys to be used
		cursors = game.input.keyboard.createCursorKeys();

		//Adds the player character
		player = new DeAndre(game, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.14;

		//Test: Create an interactive item
		door = game.add.sprite(1942, 110, 'door');
		game.physics.enable(door);
		door.enableBody = true;
		door.immovable = true;

	},

	update: function(){

		game.world.bringToTop(player);

		//Player can interact with the door
		if(game.physics.arcade.overlap(player, door) && interactText == null){
			interactText = game.add.text(door.x, door.y - 50, 'E', {fill:"#facade"});
		}

		//Remove the text if the player steps away from the door
		if(game.physics.arcade.overlap(player, door) != true && interactText != null){
			interactText.destroy();
			text0.destroy();
			text1.destroy();
			text2.destroy();
			button1.destroy();
			button2.destroy();
			interactText = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, door)){
			nextDialogue = 3;
			
			nextText = dialogue[nextDialogue].Text;
			currentDialogue(nextText, dialogue);
		}

		//Go to the kitchen
		if(lastChoice == 1){
			game.state.start('kitchen');
			lastChoice = 0;
		}

		//Go to the living room
		if(lastChoice == 2){
			game.state.start('livingRoom');
			lastChoice = 0;
		}
	}
}

var kitchen = function(game){};
kitchen.prototype = {
	preload: function(){
		game.load.image('kitchen1', 'assets/img/kitchen1.png');
		game.load.spritesheet('fridge1', 'assets/img/fridge1.png', 259, 459);
		game.load.spritesheet('mom', 'assets/img/placeholder.png', 100, 300);
		game.load.text('kitchen', 'js/z-kitchen.json');
	},

	create: function(){
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'kitchen1');
		game.world.setBounds(0, 0, 1200, 600);
		dialogueKitchen = JSON.parse(this.game.cache.getText('kitchen'));
		currentScript = dialogueKitchen;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		nextDialogue = 2;
		nextText = dialogueKitchen[nextDialogue].Text;
		currentDialogue(nextText, dialogueKitchen);
		

		//Adds the player character
		player = new DeAndre(game, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.12;

		//Adds mom
		mother = game.add.sprite(350, 252, 'mom');
		game.physics.enable(mother);
		mother.enableBody = true;
		mother.immovable = true;


		//Create a fridge
		fridge1 = game.add.sprite(889, 93, 'fridge1');
		game.physics.enable(fridge1);
		fridge1.enableBody = true;
		fridge1.immovable = true;


	},

	update: function(){
		game.world.bringToTop(player);

		//Player can interact with mom
		if(game.physics.arcade.overlap(player, mother) && interactText == null){
			interactText = game.add.text(mother.x, mother.y - 50, 'E', {fill:"#facade"});
		}

		//Remove the text if the player steps away from the door
		if(game.physics.arcade.overlap(player, mother) != true && interactText != null){
			interactText.destroy();
			text0.destroy();
			text1.destroy();
			text2.destroy();
			button1.destroy();
			button2.destroy();
			interactText = null;
		}

		//Talking to mom during breakfast
		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, mother) && momScene == false){

			momScene = true;
			cutscene = true;

			console.log('initiate mom conversation');

			nextDialogue = 3;
			nextText = dialogueKitchen[nextDialogue].Text;
			currentDialogue(nextText, dialogueKitchen);


		}

		//Choice to make cereal
		if(breakfast == false && momScene == true && lastChoice == 1){
			lastChoice = 0;
			breakfast = true;

			nextDialogue = 5;
			nextText = dialogueKitchen[nextDialogue].Text;
			currentDialogue(nextText, dialogueKitchen);

			console.log('choice 1');
		}

		//Choice to eat mom's breakfast
		if(breakfast == false && momScene == true && lastChoice == 2){
			lastChoice = 0;
			breakfast = true;

			nextDialogue = 6;
			nextText = dialogueKitchen[nextDialogue].Text;
			currentDialogue(nextText, dialogueKitchen);

			console.log('choice 2');
		}

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		//Choice to hug and kiss mom
		if(breakfast == true && leaveMom == false && lastChoice == 1){
			lastChoice = 0;
			leaveMom = true;

			nextDialogue = 17;
			nextText = dialogueKitchen[nextDialogue].Text;
			currentDialogue(nextText, dialogueKitchen);

			console.log('choice 1');
		}

		//Choice to rush out the house
		if(breakfast == true && leaveMom == false && lastChoice == 2){
			lastChoice = 0;
			leaveMom = true;

			nextDialogue = 19;
			nextText = dialogueKitchen[nextDialogue].Text;
			currentDialogue(nextText, dialogueKitchen);

			console.log('choice 2');
		}	
	}
}

var livingRoom = function(game){};
livingRoom.prototype = {
	preload: function(){
		game.load.image('livingRoom1', 'assets/img/livingRoom1.png');
		game.load.image('livingRoom2', 'assets/img/livingRoom2.png');
		game.load.spritesheet('sister', 'assets/img/placeholderSister.png', 100, 300);
		game.load.spritesheet('tv', 'assets/img/livingRoomTV1.png', 383, 202, 2);
		game.load.spritesheet('door2', 'assets/img/door2.png', 213, 442);

	},

	create: function(){
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'livingRoom1');
		background = this.game.add.tileSprite(1200, 0, 2400, 600, 'livingRoom2');
		game.world.setBounds(0, 0, 2400, 600);

		//Adds the player character
		player = new DeAndre(game, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.12;

		//Adds sister
		sister = game.add.sprite(700, 252, 'sister');
		game.physics.enable(sister);
		sister.enableBody = true;
		sister.immovable = true;

		//Create a tv
		tv = game.add.sprite(415, 55, 'tv');
		game.physics.enable(tv);
		tv.enableBody = true;
		tv.immovable = true;
		tv.animations.add('flash', [0, 1], 2, true);
		tv.animations.play('flash');

		//Test: Create a door
		door2 = game.add.sprite(2148, 110, 'door2');
		game.physics.enable(door);
		door2.enableBody = true;
		door2.immovable = true;

	},

	update: function(){

		game.world.bringToTop(player);

	}
}

//Add game states to StateManager
game.state.add('mainMenu', mainMenu);
game.state.add('opening', opening);
game.state.add('bedroom', bedroom);
game.state.add('livingRoom', livingRoom);
game.state.add('kitchen', kitchen);
game.state.start("mainMenu");

// var livingRoom = function(game){};
// livingRoom.prototype = {
// 	preload: function(){
		
// 	},

// 	create: function(){
		
// 	},

// 	update: function(){
		
// 	}
// }
