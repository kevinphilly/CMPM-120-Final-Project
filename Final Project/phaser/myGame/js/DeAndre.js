//var CurrentTextID = Alarm;
var interactText;

function DeAndre(game, key, frame){
	Phaser.Sprite.call(this, game, 0, 550, key, frame);

	this.anchor.set(0.5);
	
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.enableBody = true;

}

DeAndre.prototype = Object.create(Phaser.Sprite.prototype);
DeAndre.prototype.constructor = DeAndre;



DeAndre.prototype.update = function(){
	if(cursors.left.isDown ){
		this.body.velocity.x = -150;
	}else if(cursors.right.isDown ){
		this.body.velocity.x = 150;
				
	}else{
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}

	if(game.physics.arcade.overlap(player, door)){
		interactText = game.add.text(door.x, door.y - 50, 'E', {fill:"#facade"});
		
	}

	if(game.physics.arcade.overlap(player, door) == false && interactText != null){
		interactText.destroy();
	}

	if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && game.physics.arcade.overlap(player, door)){
		nextDialogue = 3;
		
		currentText = dialogue[nextDialogue].Text;
		currentDialogue(currentText);
	}
	

	// if(game.input.keyboard.justPressed(Phaser.Keyboard.R)){
	// 	this.startConversation("alarm");
	// }
			
}

function Interact(Interactable){
	currentDialogue(currentText);
}