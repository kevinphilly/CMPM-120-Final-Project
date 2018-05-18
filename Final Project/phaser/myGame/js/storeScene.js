var afterSchool = function(game){};
afterSchool.prototype = {
	preload: function(){
	
	},

	create: function(){

	},

	update: function(){
		
	}
}

var insideStore = function(game){};
insideStore.prototype = {
	preload: function(){
		
	},

	create: function(){
		
	},

	update: function(){
		
	}
}

var outsideStore = function(game){};
outsideStore.prototype = {
	preload: function(){
		
	},

	create: function(){
		
	},

	update: function(){
		
	}
}

game.state.add('afterSchool', afterSchool);
game.state.add('insideStore', insideStore);
game.state.add('outsideStore', outsideStore);