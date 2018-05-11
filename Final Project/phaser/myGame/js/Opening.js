var game = new Phaser.Game(1200, 800, Phaser.AUTO);

//Global Variables
	var player;
	var currentText;
	var nextDialogue;
	var door;

var opening = function(game){};
opening.prototype = {
	preload: function(){
		console.log('opening scene: preload');

		//Preload assets for opening scene
		game.load.text('speech', 'js/dialogue-0.json');
		game.load.image('ground', 'assets/img/floor.png');
		game.load.spritesheet('button', 'assets/img/tempButton.png', 88, 67);

		
	},

	create: function(){

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

		if(nextDialogue == 2){
			game.time.events.add(Phaser.Timer.SECOND * 5, game.state.start('bedroom'), this);
			
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


	ground = game.add.tileSprite(0, 600, 1200, 800, 'ground');
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
	

	

	//Test: Create an interactive item
	door = game.add.sprite(1942, 110, 'door');
	game.physics.enable(door);
	door.enableBody = true;
	door.immovable = true;

	},

	update: function(){

	game.world.bringToTop(player);

	}
}

//Add game states to StateManager
game.state.add('opening', opening);
game.state.add('bedroom', bedroom);
game.state.start("opening");

