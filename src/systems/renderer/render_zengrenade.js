"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
        var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "size");
        game.context.globalAlpha = 0.6;
		game.context.fillStyle = "red"; 
        game.context.beginPath();
		game.context.arc(position.x + size.width/2, position.y+size.height/2, size.width/2, 0, Math.PI*2);
        game.context.closePath();
        game.context.fill();
        game.context.globalAlpha = 1;
    }, "zengrenade");
}
