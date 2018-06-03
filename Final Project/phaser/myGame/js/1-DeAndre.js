//var nextTextID = Alarm;
var interactText;
var cutscene = false;
var speed;
var lastMove = "right";

DeAndre.prototype.preload = function(){
	this.game.load.atlas('DeAndreAtlas', 'assets/img/DADraft.png', 'assets/img/DADraft.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
}

function DeAndre(game, posX, posY, key, frame, ){
	Phaser.Sprite.call(this, game, posX, posY, key, frame);

	this.anchor.set(0.5);
	
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
//    this.body.checkCollision = {up: true, down: true, left:true, right: false};
	this.enableBody = true;
	this.body.setSize(120, 280, 80, 9);

	this.animations.add('walkLeft', [0, 1, 2, 3, 4], 25, true);
	this.animations.add('walkRight', [7, 8, 9, 10, 11], 25, true);
	this.animations.add('idleLeft', [5], 80, true);
	this.animations.add('idleRight', [6], 80, true);


}

DeAndre.prototype = Object.create(Phaser.Sprite.prototype);
DeAndre.prototype.constructor = DeAndre;



DeAndre.prototype.update = function(){
	if(game.input.keyboard.isDown(Phaser.Keyboard.A) && cutscene == false){
		this.body.velocity.x = -(speed);
		this.animations.play('walkLeft');
		lastMove = "left";
	}else if(game.input.keyboard.isDown(Phaser.Keyboard.D) && cutscene == false){
		this.body.velocity.x = speed;
		this.animations.play('walkRight');
		lastMove = "right"		
	}else if (lastMove === "left" && kickedOut != true){
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.animations.play('idleLeft');
	}else if (lastMove === "right" && kickedOut != true){
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.animations.play('idleRight');
	}




	

	// if(game.input.keyboard.justPressed(Phaser.Keyboard.R)){
	// 	this.startConversation("alarm");
	// }
			
}

function Interact(Interactable){
	currentDialogue(nextText);
}