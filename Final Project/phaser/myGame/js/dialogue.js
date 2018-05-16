var text0;

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
function currentDialogue(key, script){

	//Destroys existing text
	if(text0 != null){
		button1.destroy();
		button2.destroy();
		text0.destroy();
		text1.destroy();
		text2.destroy();

	}

	//Print out current text
	text0 = game.add.text(0, 0, key, style);
	text0.fixedToCamera = true;
	text0.setTextBounds(0, 600, 800, 100);

	

	//If the dialogue requires choices, print out next 2 chunks
	if(script[nextDialogue].Branch == true){
		button1 = game.add.button(100, 700, 'button', choice1, this, 0); //first choice
		button1.fixedToCamera = true;
		text1 = game.add.text(100, 700, script[nextDialogue].Choices[0]);
		text1.fixedToCamera = true;

		button2 = game.add.button(700, 700, 'button', choice2, this, 0); //second choice
		button2.fixedToCamera = true;
		text2 = game.add.text(700, 700, script[nextDialogue].Choices[1]);
		text2.fixedToCamera = true;

	}

	if(script[nextDialogue].continue == true){
		if(cutscene == true && script[nextDialogue].Branch == false){
			text3 = game.add.text(400, 750, 'Spacebar to continue');
		}else{
			text3.destroy();
		}

		nextLine(script);

		console.log('continue');	
	}else if(cutscene == true && script[nextDialogue].Branch == false){
		cutscene = false;
	}


	
}


function choice1(){

	button1.destroy();
	button2.destroy();
	text0.destroy();
	text1.destroy();
	text2.destroy();


	lastChoice = 1;


}

function choice2(){
	//nextDialogue = nextDialogue + 2;
	//nextText = dialogue[nextDialogue].Text;
	button1.destroy();
	button2.destroy();
	text0.destroy();
	text1.destroy();
	text2.destroy();



	lastChoice = 2;



	//currentDialogue(nextText);
}

//Loads the next line 
function nextLine(script){
	if(script[nextDialogue].goto === undefined){
		nextDialogue = nextDialogue + 1;
	}else{
		nextDialogue = script[nextDialogue].goto;	
	}

	nextText = script[nextDialogue].Text;

	console.log('nextLine()');
}


function destroyText(){
	text0.destroy();
}

