//var CurrentTextID = Alarm;

function DeAndre(game, key, frame){
	Phaser.Sprite.call(this, game, 0, 400, key, frame);

	this.anchor.set(0.5);
	
	game.physics.enable(this);
	this.body.collideWorldBounds = true;

}

DeAndre.prototype = Object.create(Phaser.Sprite.prototype);
DeAndre.prototype.constructor = DeAndre;

// DeAndre.prototype.startConversation = function(convoKey){
// 	var speech = this.game.cache.getJSON('speech');
	
// 	this.game.paused = true;
	
// //	var text = game.add.text(100, 100, speech.CurrentTextID, {fill: '#facade'});
// };

// DeAndre.prototype.stopConversation = function(){
// 	this.activeConversation = null;
// 	this.activeConversationState = null;
// 	this.game.paused = false;
// };

// DeAndre.prototype.updateConversationState = function(stateId){
// 	this.activeConversationState = stateId;
// 	$showConversationState(this.activeConversation, stateId);
// };

DeAndre.prototype.update = function(){
	if(cursors.left.isDown ){
		this.body.velocity.x = -150;
	}else if(cursors.right.isDown ){
		this.body.velocity.x = 150;
				
			
	}else if(cursors.up.isDown){
		this.body.velocity.y = -150;
			
	}else if(cursors.down.isDown){
		this.body.velocity.y = 150;
	}else{
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}

	// if(game.input.keyboard.justPressed(Phaser.Keyboard.R)){
	// 	this.startConversation("alarm");
	// }
			
}