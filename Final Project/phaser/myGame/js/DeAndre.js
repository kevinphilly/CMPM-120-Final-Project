//var nextTextID = Alarm;
var interactText;
var cutscene = false;

DeAndre.prototype.preload = function(){
	this.game.load.atlas('DeAndreAtlas', 'assets/img/DADraft.png', 'assets/img/DADraft.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
}

function DeAndre(game, key, frame){
	Phaser.Sprite.call(this, game, 0, 390, key, frame);

	this.anchor.set(0.5);
	
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
//    this.body.checkCollision = {up: true, down: true, left:true, right: false};
	this.enableBody = true;

	this.animations.add('walkLeft', [0, 1, 2, 3, 4], 25, true);
	this.animations.add('walkRight', [6, 7, 8, 9, 10], 25, true);
	this.animations.add('idle', [5], 80, true);


}

DeAndre.prototype = Object.create(Phaser.Sprite.prototype);
DeAndre.prototype.constructor = DeAndre;



DeAndre.prototype.update = function(){
	if(game.input.keyboard.isDown(Phaser.Keyboard.A) && cutscene == false){
		this.body.velocity.x = -1000;
		this.animations.play('walkLeft');
	}else if(game.input.keyboard.isDown(Phaser.Keyboard.D) && cutscene == false){
		this.body.velocity.x = 1000;
		this.animations.play('walkRight');
				
	}else{
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.animations.play('idle');
	}




	

	// if(game.input.keyboard.justPressed(Phaser.Keyboard.R)){
	// 	this.startConversation("alarm");
	// }
			
}

function Interact(Interactable){
	currentDialogue(nextText);
}