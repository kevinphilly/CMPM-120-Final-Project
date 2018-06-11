//var nextTextID = Alarm;
var interactText;
var cutscene = false;
var lockMovement = false;
var speed;
var holdDrink = false;

Carla.prototype.preload = function(){
	this.game.load.atlas('carlaAtlas', 'assets/img/CAself.png', 'assets/img/CAself.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
}

function Carla(game, posX, posY, key, frame){
	Phaser.Sprite.call(this, game, posX, posY, key, frame);

	this.anchor.set(0.5);
	
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
//    this.body.checkCollision = {up: true, down: true, left:true, right: false};
	this.enableBody = true;
	this.body.setSize(120, 280, 80, 9);

	this.animations.add('walkLeft', [0, 1, 2, 3, 4], 25, true);
	this.animations.add('walkLeftDrink', [13, 14, 15, 16, 17], 25, true);
	this.animations.add('walkRight', [8, 9, 10, 11, 12], 25, true);
	this.animations.add('walkRightDrink', [21, 22, 23, 24, 25], 25, true);
	this.animations.add('idleLeft', [5], 80, true);
	this.animations.add('idleRight', [7], 80, true);


}

Carla.prototype = Object.create(Phaser.Sprite.prototype);
Carla.prototype.constructor = Carla;



Carla.prototype.update = function(){
	if(game.input.keyboard.isDown(Phaser.Keyboard.A) && cutscene == false){
		this.body.velocity.x = -(speed);
		lastMove = "left";
		if(holdDrink == true){
			this.animations.play('walkLeftDrink');
		}else{
			this.animations.play('walkLeft');
		}
	}else if(game.input.keyboard.isDown(Phaser.Keyboard.D) && cutscene == false){
		this.body.velocity.x = speed;
		lastMove = "right";
		if(holdDrink == true){
			this.animations.play('walkRightDrink');
		}else{
			this.animations.play('walkRight');
		}	
	}else if (lastMove === "left" && lockMovement == false){
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		if(holdDrink == true){
			this.frame = 18;
		}else{
			this.frame = 5;
		}
	}else if (lastMove === "right" && lockMovement == false){
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		if(holdDrink == true){
			this.frame = 20;
		}else{
			this.frame = 7;
		}
		
	}

}

function Interact(Interactable){
	currentDialogue(nextText);
}