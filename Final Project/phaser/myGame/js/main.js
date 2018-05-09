var game = new Phaser.Game(800, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var currentText;
var dialogue;

function preload() {
	// preload assets

	this.game.load.text('speech', 'js/dialogue-0.json');
	this.game.load.atlas('atlas', 'assets/img/spritesheet.png', 'assets/img/textureAtlas.json');
}

function create() {
	// place your assets

	

	dialogue = JSON.parse(this.game.cache.getText('speech'));

	console.log(dialogue);

	//Allows the arrow keys to be used
	cursors = game.input.keyboard.createCursorKeys();

	player = new DeAndre(game, 'atlas', 6);
	game.add.existing(player);

	currentText = dialogue.Alarm[0].Text;
	
	// DeAndre.startConversation(alarm);

}

function update() {
	// run game loop

	 if(game.input.keyboard.justPressed(Phaser.Keyboard.R)){
	 	currentDialogue(currentText);
	 }
}