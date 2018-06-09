var text0;
var text3;
var button1;
var button2;
var portrait;
var textbox2;

var wordLock;
var line = [];
var wordIndex = 0;
var wordDelay = 0;

WebFontConfig = {
	active: function(){
		game.time.events.add(Phaser.Timer.SECOND, createText, this);
	},
	google:{
		families: ['VT323']
	}
};

//Style the text in the dialogue boxes
var style = {
	fill: "#fff",
	boundsAlignH: "center", 
	boundsAlignV: "top",
	wordWrap: true,
	wordWrapWidth: 800,
	fontSize: 30,
	font: 'VT323'
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

	// //Print out current text
	// text0 = game.add.text(0, 0, key, style);
	// text0.fixedToCamera = true;
	// text0.setTextBounds(200, 605, 800, 100);

	//Print out current text
	text0 = game.add.text(0, 0, '', style);
	game.world.bringToTop(text0);
	text0.fixedToCamera = true;
	text0.setTextBounds(200, 605, 800, 100);
	printText(key);



	//Print out correct portrait
	if(portrait != null){
		portrait.destroy();
	}

	if(textbox2 != null){
		textbox2.destroy();
	}

	if(script[nextDialogue].speaker != undefined){
		textbox2 = game.add.sprite(0, 600, 'textBox2');
		game.world.sendToBack(textbox2);
		game.world.moveUp(textbox2);
		game.world.moveUp(textbox2);
		game.world.moveUp(textbox2);
		textbox2.fixedToCamera = true;
		portrait = game.add.sprite(0, 600, script[nextDialogue].speaker+'Portrait');
		portrait.fixedToCamera = true;
		text0.setTextBounds(200, 605, 1000, 100);

	}
	

	//If the dialogue requires choices, print out next 2 chunks
	if(script[nextDialogue].Branch == true && script[nextDialogue].speaker == undefined ){
		button1 = game.add.button(10, 724, 'button2', choice1, this, 0); //first choice
		button1.fixedToCamera = true;
		text1 = game.add.text(0, 0, script[nextDialogue].Choices[0], style);
		text1.setTextBounds(10, 724, 590, 200);
		text1.fixedToCamera = true;

		button2 = game.add.button(600, 724, 'button2', choice2, this, 0); //second choice
		button2.fixedToCamera = true;
		text2 = game.add.text(0, 0, script[nextDialogue].Choices[1], style);
		text2.setTextBounds(610, 724, 590, 200);
		text2.fixedToCamera = true;

	}else if(script[nextDialogue].Branch == true && script[nextDialogue].speaker != undefined){
		button1 = game.add.button(210, 724, 'button1', choice1, this, 0); //first choice
		button1.fixedToCamera = true;
		text1 = game.add.text(0, 0, script[nextDialogue].Choices[0], style);
		text1.setTextBounds(210, 724, 490, 200);
		text1.fixedToCamera = true;

		button2 = game.add.button(700, 724, 'button1', choice2, this, 0); //second choice
		button2.fixedToCamera = true;
		text2 = game.add.text(0, 0, script[nextDialogue].Choices[1], style);
		text2.setTextBounds(700, 724, 490, 200);
		text2.fixedToCamera = true;
	}

	if(script[nextDialogue].continue == true){
		if(cutscene == true && script[nextDialogue].Branch == false){
			if(text3 != null){
				text3.destroy();
			}
			text3 = game.add.text(450, 750, 'Spacebar to continue', style);
			text3.fixedToCamera = true;
		}else if(text3 != null){
			text3.destroy();
		}

		nextLine(script);

		console.log('continue');	
	}else if(cutscene == true && script[nextDialogue].Branch == false){
		cutscene = false;
		if(portrait != undefined){
			portrait.destroy();
			textbox2.destroy();
		}
		if(text3 != null){
			text3.destroy();
		}
		game.time.events.add(5000, destroyText, this);
	}else if(cutscene == true && script[nextDialogue].Branch == true){
		if(text3 != null){
			text3.destroy();
		}
	}else if(cutscene == false){
		if(text3 != null){
			text3.destroy();
		}
		
		//destroyTextTimer = game.time.events.add(5000, destroyText, this);
	}


	
}

function printText(key){

	line = key.split(' ');

	wordLock = true;
	wordIndex = 0;

	game.time.events.repeat(wordDelay, line.length, nextWord, this);
}

function nextWord(){
	text0.text = text0.text.concat(line[wordIndex] + " ");
	game.world.bringToTop(text0);
	wordIndex++;
	if(wordIndex === line.length){
		wordLock = false;
		return;
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
	if(cutscene == false){
		text0.destroy();
		console.log('destroyText()');
	}
}

