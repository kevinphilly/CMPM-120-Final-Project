var game = new Phaser.Game(1200, 800, Phaser.AUTO);

//Global Variables
var currentArc = 'deAndre';
var player;
var mainMenuMusic;
var nextText;
var nextDialogue;
var door;
var lastChoice = 0;
var momScene = false;
var currentScript;
var breakfast = false;
var leaveMom = false;
var showingInfo = false;



var mainMenu = function(game){};
mainMenu.prototype = {
	preload: function(){
		game.load.spritesheet('button1', 'assets/img/button1.png', 495, 67);
		game.load.spritesheet('button2', 'assets/img/button2.png', 590, 67);
		game.load.spritesheet('controlsButton', 'assets/img/controlsButton.png', 300, 150, 2);
		game.load.spritesheet('creditsButton', 'assets/img/creditsButton.png', 300, 150, 2);
		game.load.image('mainMenu', 'assets/img/mainMenu.png');
		game.load.image('mainMenuDA', 'assets/img/mainMenuDA.png');
		game.load.spritesheet('mainMenuTV', 'assets/img/mainMenuTV.png', 555, 336, 20);
		game.load.audio('mainMenuMusic', 'assets/audio/CrossroadOfStyle.MP3');
		game.load.image('DeAndrePortrait', 'assets/img/deAndrePortrait.png', 200, 200);
		game.load.image('momPortrait', 'assets/img/momPortrait.png', 200, 200);
		game.load.image('sisterPortrait', 'assets/img/sisterPortrait.png', 200, 200);
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		
	},

	create: function(){

		if(currentArc === 'carla'){
			menuBackground = this.game.add.tileSprite(0, 0, 1200, 600, 'mainMenuDA');
		}else{
			menuBackground = this.game.add.tileSprite(0, 0, 1200, 600, 'mainMenu');
		}
		
		playButton = game.add.button(304, 100, 'button1', showWarning, this, 0);
		playButton.scale.setTo(1.1, 4.61);

		controlsButton = game.add.button(200, 600, 'controlsButton', showControls, this, 0);

		creditsButton = game.add.button(700, 600, 'creditsButton', showCredits, this, 0);

		//Add tv to center of the screen
		mainMenuTV = game.add.sprite(304, 100, 'mainMenuTV');
		mainMenuTV.animations.add('static', [1, 5, 6], 8, true);
		mainMenuTV.animations.play('static');
		mainMenuTV.animations.add('news', [0], 1, true);
		mainMenuTV.animations.add('controls', [2, 3, 2, 3, 7, 8, 7, 8, 10, 11, 10, 11], 1, false);
		mainMenuTV.animations.add('credits', [12, 13, 15, 16, 17], .2, false);
		mainMenuTV.inputEnabled = true;

		mainMenuMusic = game.add.audio('mainMenuMusic');
		mainMenuMusic.play('', 0, 1, true);




	},

	update: function(){
		if(mainMenuTV.input.pointerOver() && showingInfo == false){
			mainMenuTV.animations.play('news');
			mainMenuTV.events.onInputDown.add(play, this);
			this.game.canvas.style.cursor="pointer";
		}else if(showingInfo == false){
			mainMenuTV.animations.play('static');
			this.game.canvas.style.cursor="AUTO";
		}

		if(controlsButton.input.pointerOver()){
			controlsButton.frame = 1;
		}else{
			controlsButton.frame = 0;
		}

		if(creditsButton.input.pointerOver()){
			creditsButton.frame = 1;
		}else{
			creditsButton.frame = 0;
		}
	
		
	}
}

function showWarning(){
    mainMenuTV.animations.stop();
    mainMenuTV.frame = 18;
    game.time.events.add(5000, play, this);
}

function play(){
	if(showingInfo == false){
		mainMenuMusic.stop();
		if(currentArc === 'deAndre'){
			game.state.start('opening');
		}
		if(currentArc === 'carla'){
			game.state.start('coffeeShop');
		}
	}
}

function showControls(){
	showingInfo = true;
	mainMenuTV.animations.play('controls');
	game.time.events.add(12000, resumeStatic, this);
}

function showCredits(){
	showingInfo = true;
	mainMenuTV.animations.play('credits');
	game.time.events.add(25000, resumeStatic, this);
}

function resumeStatic(){
	showingInfo = false;
}


var opening = function(game){};
opening.prototype = {
	preload: function(){
		console.log('opening scene: preload');

		//Preload assets for opening scene
		game.load.text('speech', 'js/z-opening.json');
		game.load.image('textBox', 'assets/img/floor.png');
		game.load.image('textBox2', 'assets/img/floor2.png');
		

		
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

var bedroomNews = false;
var interactTV, interactDoor, interactShelf;
var houseMusic, lastInteraction;

var bedroom = function(game){};
bedroom.prototype = {
	preload: function(){
		this.game.load.atlas('atlas', 'assets/img/DADraft.png', 'assets/img/DADraft.json');
		game.load.spritesheet('door', 'assets/img/door.png', 213, 442);
		this.game.load.image('bedroom1', 'assets/img/bedroom1.png');
		this.game.load.image('bedroom2', 'assets/img/bedroom2.png');
		game.load.spritesheet('tv', 'assets/img/livingRoomTV1.png', 383, 202, 2);
		game.load.audio('houseMusic', 'assets/audio/DanceOfLife.MP3');
	},

	create: function(){

		nextDialogue = 2;
		nextText = dialogue[nextDialogue].Text;

		houseMusic = game.add.audio('houseMusic');
		houseMusic.play('', 0, .3, true);


		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'bedroom1');
		background = this.game.add.tileSprite(1200, 0, 2400, 600, 'bedroom2');

		currentDialogue(nextText, dialogue);

		console.log(dialogue); //Test

		//Allows the arrow keys to be used
		cursors = game.input.keyboard.createCursorKeys();

		//Adds the player character
		player = new DeAndre(game, 0, 390, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.14;
		speed = 1000;

		//Add door to rest of the house
		door = game.add.sprite(1942, 110, 'door');
		game.physics.enable(door);
		door.enableBody = true;
		door.immovable = true;

		//Create interactive tv
		tv = game.add.sprite(895, 235, 'tv');
		game.physics.enable(tv);
		tv.enableBody = true;
		tv.scale.x = .5;
		tv.scale.y = .5;
		tv.animations.add('flash', [0, 1], 2, true);
		tv.animations.play('flash');
		tv.body.setSize(360, 200, 0, 0);

		shelf = game.add.sprite(600, 250, '');
		game.physics.enable(shelf);
		shelf.enableBody = true;
		shelf.body.setSize(150, 300, 20, 0);

	},

	update: function(){

		game.world.bringToTop(player);

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		//Player can interact with the door
		if(game.physics.arcade.overlap(player, door) && interactDoor == null){
			interactDoor = game.add.text(door.x, door.y - 50, 'E', {fill:"#00ff00"});
		}

		//Remove the text if the player steps away from the door
		if(game.physics.arcade.overlap(player, door) != true && interactDoor != null){
			interactDoor.destroy();
			interactDoor = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, door)){
			cutscene = true;
			nextDialogue = 3;
			lastInteraction = 'door';
			
			nextText = dialogue[nextDialogue].Text;
			currentDialogue(nextText, dialogue);
		}

		//Interact with the tv in the room
		if(game.physics.arcade.overlap(player, tv) && interactTV == null && bedroomNews == false){
			interactTV = game.add.text(tv.x, tv.y - 50, 'E', {fill:"#00ff00"});
		}

		//Remove the text if the player steps away from the tv
		if(game.physics.arcade.overlap(player, tv) != true && interactTV != null){
			interactTV.destroy();
			interactTV = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, tv) && bedroomNews == false){
			cutscene = true;
			nextDialogue = 9;
			
			bedroomNews = true;
			nextText = dialogue[nextDialogue].Text;
			currentDialogue(nextText, dialogue);
		}

		//Code to interact with shelf
		if(game.physics.arcade.overlap(player, shelf) && interactShelf == null && bedroomNews == false){
			interactShelf = game.add.text(shelf.x, shelf.y - 50, 'E', {fill:"#00ff00"});
		}

		//Remove the text if the player steps away from the shelf
		if(game.physics.arcade.overlap(player, shelf) != true && interactShelf != null){
			interactShelf.destroy();
			interactShelf = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, shelf)){
			cutscene = true;
			nextDialogue = 6;
			lastInteraction = 'shelf';
			
			nextText = dialogue[nextDialogue].Text;
			currentDialogue(nextText, dialogue);
		}

		//Go to the kitchen
		if(lastChoice == 1 && lastInteraction === 'shelf'){
			cutscene = false;
			lastChoice = 0;

			nextDialogue = 7;
			nextText = dialogue[nextDialogue].Text;
			currentDialogue(nextText, dialogue);

		}

		//Go to the living room
		if(lastChoice == 2 && lastInteraction === 'shelf'){
			cutscene = false;
			lastChoice = 0;

			nextDialogue = 8;
			nextText = dialogue[nextDialogue].Text;
			currentDialogue(nextText, dialogue);
		}

		//Go to the kitchen
		if(lastChoice == 1 && lastInteraction === 'door'){
			cutscene = false;
			game.state.start('kitchen');
			lastChoice = 0;

		}

		//Go to the living room
		if(lastChoice == 2 && lastInteraction === 'door'){
			cutscene = false;
			game.state.start('livingRoom');
			lastChoice = 0;
		}
	},

	
}


var kitchenDoor, interactKitchenDoor;

var kitchen = function(game){};
kitchen.prototype = {
	preload: function(){
		game.load.image('kitchen1', 'assets/img/kitchen1.png');
		game.load.image('kitchen2', 'assets/img/kitchen2.png');
		game.load.spritesheet('fridge1', 'assets/img/fridge1.png', 259, 459);
		game.load.spritesheet('mom', 'assets/img/deAndreMom.png', 256, 256, 3);
		game.load.spritesheet('kitchenDoor', 'assets/img/kitchenDoor.png', 213, 442);
		game.load.text('kitchen', 'js/z-kitchen.json');
	},

	create: function(){
		background = this.game.add.tileSprite(0, 0, 1200, 600, 'kitchen1');
		background = this.game.add.tileSprite(1200, 0, 2000, 600, 'kitchen2');
		game.world.setBounds(0, 0, 2000, 600);
		dialogueKitchen = JSON.parse(this.game.cache.getText('kitchen'));
		currentScript = dialogueKitchen;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		nextDialogue = 2;
		nextText = dialogueKitchen[nextDialogue].Text;
		currentDialogue(nextText, dialogueKitchen);
		

		//Adds the player character
		player = new DeAndre(game, 0, 390, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.12;

		//Adds door to living room
		kitchenDoor = game.add.sprite(1775, 110, 'kitchenDoor');
		game.physics.enable(kitchenDoor);
		kitchenDoor.enableBody = true;
		kitchenDoor.immovable = true;

		//Adds mom
		mother = game.add.sprite(350, 258, 'mom');
		game.physics.enable(mother);
		mother.enableBody = true;
		mother.immovable = true;
		mother.scale.y = 1.15;
		mother.body.setSize(150, 250, 70, 0);


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
			interactText = game.add.text(mother.x, mother.y - 50, 'E', {fill:"#00ff00"});
		}

		//Remove the text if the player steps away from mother
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

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
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

		//Player can interact with the door
		if(game.physics.arcade.overlap(player, kitchenDoor) && interactKitchenDoor == null){
			interactKitchenDoor = game.add.text(kitchenDoor.x, kitchenDoor.y - 50, 'E', {fill:"#00ff00"});
		}

		//Remove the text if the player steps away from the door
		if(game.physics.arcade.overlap(player, kitchenDoor) != true && interactKitchenDoor != null){
			interactKitchenDoor.destroy();
			interactKitchenDoor = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, kitchenDoor)){
				game.state.start('livingRoom');
		}


	},

	render: function() {

    // Sprite debug info

//    	game.debug.body(mother);

	}
}

var sisterTease = false;
var news1 = false;
var interactTextTV, interactDoor2;

var livingRoom = function(game){};
livingRoom.prototype = {
	preload: function(){
		game.load.image('livingRoom1', 'assets/img/livingRoom1.png');
		game.load.image('livingRoom2', 'assets/img/livingRoom2.png');
		game.load.spritesheet('sister', 'assets/img/sisterSofa.png', 512, 512, 3);
		game.load.spritesheet('door2', 'assets/img/door2.png', 213, 442);
		game.load.text('livingRoom', 'js/z-livingRoom.json');

	},

	create: function(){
		dialogueLivingRoom = JSON.parse(this.game.cache.getText('livingRoom'));
		currentScript = dialogueLivingRoom;

		textBox = game.add.tileSprite(0, 600, 1200, 800, 'textBox');
		textBox.fixedToCamera = true;

		background = this.game.add.tileSprite(0, 0, 1450, 600, 'livingRoom1');
		background = this.game.add.tileSprite(1450, 0, 2650, 600, 'livingRoom2');
		game.world.setBounds(0, 0, 2650, 600);

		//Adds the player character
		player = new DeAndre(game, 0, 390, 'atlas', 6);
		game.add.existing(player);
		game.camera.follow(player);
		player.scale.y = 1.12;

		

		//Create a tv
		tv = game.add.sprite(665, 65, 'tv');
		game.physics.enable(tv);
		tv.enableBody = true;
		tv.immovable = true;
		tv.animations.add('flash', [0, 1], 2, true);
		tv.animations.play('flash');
		tv.body.setSize(200, 202, 0, 0);

		//Adds sister
		sister = game.add.sprite(595, 40, 'sister');
		game.physics.enable(sister);
		sister.enableBody = true;
		sister.immovable = true;
		sister.body.setSize(200, 256, 400, 256);
		// sister.frame = 1;


		//Create a door
		door2 = game.add.sprite(2398, 110, 'door2');
		game.physics.enable(door2);
		door2.enableBody = true;
		door2.immovable = true;

		//Create a door
		livingRoomDoor = game.add.sprite(32, 110, 'door2');
		game.physics.enable(livingRoomDoor);
		livingRoomDoor.enableBody = true;
		livingRoomDoor.immovable = true;

	},

	update: function(){

		game.world.bringToTop(player);



		if(game.physics.arcade.overlap(player, tv) == true && interactTextTV == null){
			interactTextTV = game.add.text(tv.x, tv.y-50, 'E', {fill:"#00ff00"});
		}

		if(game.physics.arcade.overlap(player, tv) != true && interactTextTV != null){
			interactTextTV.destroy();
			interactTextTV = null;
		}

		if(game.physics.arcade.overlap(player, tv) && news1 == false && game.input.keyboard.justPressed(Phaser.Keyboard.E)){
			cutscene = true;
			news1 = true;

			nextDialogue = 8;
			nextText = currentScript[nextDialogue].Text;
			currentDialogue(nextText, currentScript);

		}

		if(game.physics.arcade.overlap(player, sister) && interactText == null){
			interactText = game.add.text(sister.body.x + 100, sister.body.y - 70, 'E', {fill:"#00ff00"});
		}

		if(game.physics.arcade.overlap(player, sister) != true && interactText != null){
			interactText.destroy();
			interactText = null;
		}

		if(cutscene == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && wordLock == false){
			console.log('spacePressed');
			currentDialogue(nextText, currentScript);
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, sister) && sisterTease == false){

			sister.frame = 2;

			cutscene = true;
			sisterTease = true;

			nextDialogue = 0;
			nextText = dialogueLivingRoom[nextDialogue].Text;
			currentDialogue(nextText, dialogueLivingRoom);
		}

		if(sisterTease == true && cutscene == false){
			sister.frame = 1;
		}


		//Player can interact with the door
		if(game.physics.arcade.overlap(player, door2) && interactDoor2 == null){
			interactDoor2 = game.add.text(door2.x, door2.y - 50, 'E', {fill:"#00ff00"});
		}

		//Remove the text if the player steps away from the door
		if(game.physics.arcade.overlap(player, door2) != true && interactDoor2 != null){
			interactDoor2.destroy();
			interactDoor2 = null;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, door2)){
				houseMusic.stop();
				game.state.start('walkToSchool');
		}

	},

	
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
