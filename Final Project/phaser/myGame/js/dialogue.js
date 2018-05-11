var text;
var button1;
var button2;

//Style the text in the dialogue boxes
var style = {
	fill: "#fff",
	boundsAlignH: "center", 
	boundsAlignV: "middle",
	wordWrap: true,
	wordWrapWidth: 600
};

//Function to print out the current dialogue
function currentDialogue(key){

	//Destroys existing text
	if(text != null){
		text.destroy();
	}
	text = game.add.text(0, 0, key, style);
	text.setTextBounds(0, 600, 800, 100);

	if(dialogue[nextDialogue].Branch == true){
		button1 = game.add.button(100, 700, 'button', choice1, this, 0);
		text = game.add.text(100, 700, dialogue[nextDialogue + 1].id);
		button2 = game.add.button(600, 700, 'button', choice2, this, 0);
		text = game.add.text(600, 700, dialogue[nextDialogue + 2].id);
	}else{
		game.time.events.add(Phaser.Timer.SECOND * 5, destroyText, this);
	}
}

function choice1(){
	nextDialogue = nextDialogue + 1;
	currentText = dialogue[nextDialogue].Text;
	button1.destroy();
	button2.destroy();
	currentDialogue(currentText);
}

function choice2(){
	nextDialogue = nextDialogue + 2;
	currentText = dialogue[nextDialogue].Text;
	button1.destroy();
	button2.destroy();
	currentDialogue(currentText);
}

function destroyText(){
	text.destroy();
}

