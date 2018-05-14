//var CurrentTextID = Alarm;
var interactText;

function DeAndre(game, key, frame){
	Phaser.Sprite.call(this, game, 0, 523, key, frame);

	this.anchor.set(0.5);
	
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
//    this.body.checkCollision = {up: true, down: true, left:true, right: false};
	this.enableBody = true;

}

DeAndre.prototype = Object.create(Phaser.Sprite.prototype);
DeAndre.prototype.constructor = DeAndre;



DeAndre.prototype.update = function(){
	if(cursors.left.isDown ){
		this.body.velocity.x = -1000;
	}else if(cursors.right.isDown ){
		this.body.velocity.x = 1000;
				
	}else{
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}


	

	// if(game.input.keyboard.justPressed(Phaser.Keyboard.R)){
	// 	this.startConversation("alarm");
	// }
			
}

function Interact(Interactable){
	currentDialogue(currentText);
}