var game = new Phaser.Game(1200, 800, Phaser.AUTO);

//Global Variables
var player;
var currentText;
var nextDialogue;
var door;
var lastChoice = 0;

var opening = function(game){};
opening.prototype = {
	preload: function(){
		console.log('opening scene: preload');

		//Preload assets for opening scene
		game.load.text('speech', 'js/z-opening.json');
		game.load.image('textBox', 'assets/img/floor.png');
		game.load.spritesheet('button', 'assets/img/tempButton.png', 88, 67);

		
	},

	create: function(){

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;


		//Parses the json file and stores it in dialogue as objects
		dialogue = JSON.parse(this.game.cache.getText('speech'));

//		ground = game.add.tileSprite(0, 600, 1200, 800, 'ground');
		game.world.setBounds(0, 0, 2400, 600);

		nextDialogue = 0;

		//Test: Set currentText to the first dialogue option
		currentText = dialogue[nextDialogue].Text;
		currentDialogue(currentText);

		console.log('opening scene: create');

	},

	update: function(){

		if(lastChoice == 1){
			currentDialogue(currentText + " You're gonna be late!");
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
		this.game.load.atlas('atlas', 'assets/img/spritesheet.png', 'assets/img/textureAtlas.json');
		game.load.spritesheet('door', 'assets/img/door.png', 213, 442);
		this.game.load.image('bedroom1', 'assets/img/bedroom1.png');
		this.game.load.image('bedroom2', 'assets/img/bedroom2.png');

	},

	create: function(){

		nextDialogue = 2;
		currentText = dialogue[nextDialogue].Text;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'bedroom1');
		background = this.game.add.tileSprite(1200, 0, 2400, 600, 'bedroom2');
		currentDialogue(currentText);

		console.log(dialogue); //Test

		//Allows the arrow keys to be used
		cursors = game.input.keyboard.createCursorKeys();

		//Adds the player character
		player = new DeAndre(game, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.setTo(2, 2);

	

	

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
			
			currentText = dialogue[nextDialogue].Text;
			currentDialogue(currentText);
		}

		if(lastChoice == 1){
			game.state.start('kitchen');
			lastChoice = 0;
		}

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
	},

	create: function(){
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'kitchen1');
		game.world.setBounds(0, 0, 1200, 600);

		//Adds the player character
		player = new DeAndre(game, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);

		//Create a fridge
		fridge1 = game.add.sprite(889, 93, 'fridge1');
		game.physics.enable(fridge1);
		fridge1.enableBody = true;
		fridge1.immovable = true;
	},

	update: function(){
		
	}
}

var livingRoom = function(game){};
livingRoom.prototype = {
	preload: function(){
		game.load.image('livingRoom1', 'assets/img/livingRoom1.png');

	},

	create: function(){
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'livingRoom1');
		game.world.setBounds(0, 0, 1200, 600);

		//Adds the player character
		player = new DeAndre(game, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);

	},

	update: function(){

	}
}

//Add game states to StateManager
game.state.add('opening', opening);
game.state.add('bedroom', bedroom);
game.state.add('livingRoom', livingRoom);
game.state.add('kitchen', kitchen);
game.state.start("opening");

// var livingRoom = function(game){};
// livingRoom.prototype = {
// 	preload: function(){
		
// 	},

// 	create: function(){
		
// 	},

// 	update: function(){
		
// 	}
// }
