"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "size");
		var om_progress = game.entities.get(entity,"om_progress");
		if(om_progress.value <= om_progress.max){
			game.context.strokeStyle = "#82d1e1"
			game.context.lineWidth = size.width*0.05;
			game.context.globalAlpha = 1;
			game.context.beginPath();
			game.context.arc(position.x+size.width/2,position.y+size.height/2,size.width/2- size.width*0.02,0,Math.PI*2*om_progress.value/om_progress.max);
			game.context.stroke();
			game.context.globalAlpha = 1;
		}
	}, "om");
};
