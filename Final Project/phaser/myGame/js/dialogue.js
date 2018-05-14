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
	text0 = game.add.text(0, 0, key, style);
	text0.fixedToCamera = true;
	text0.setTextBounds(0, 600, 800, 100);

	if(dialogue[nextDialogue].Branch == true){
		button1 = game.add.button(100, 700, 'button', choice1, this, 0);
		button1.fixedToCamera = true;
		text1 = game.add.text(100, 700, dialogue[nextDialogue + 1].id);
		text1.fixedToCamera = true;
		button2 = game.add.button(700, 700, 'button', choice2, this, 0);
		button2.fixedToCamera = true;
		text2 = game.add.text(700, 700, dialogue[nextDialogue + 2].id);
		text2.fixedToCamera = true;
	}else{
		game.time.events.add(Phaser.Timer.SECOND * 5, destroyText, this);
	}
}

function choice1(){
	//nextDialogue = nextDialogue + 1;
	//currentText = dialogue[nextDialogue].Text;
	button1.destroy();
	button2.destroy();
	text0.destroy();
	text1.destroy();
	text2.destroy();

	lastChoice = 1;

	//currentDialogue(currentText);
}

function choice2(){
	//nextDialogue = nextDialogue + 2;
	//currentText = dialogue[nextDialogue].Text;
	button1.destroy();
	button2.destroy();
	text0.destroy();
	text1.destroy();
	text2.destroy();

	lastChoice = 2;

	//currentDialogue(currentText);
}

function destroyText(){
	text0.destroy();
}

