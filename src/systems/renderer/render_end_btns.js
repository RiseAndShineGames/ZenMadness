"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("search", ["btn"]);
	game.entities.registerSearch("cursor", ["cursor"]);
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "size");
		game.context.globalAlpha = 1;
		var image = game.entities.get(entity,"image");
		game.context.drawImage(game.images.get(image.name),position.x,position.y,size.width,size.height);

	}, "search");
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "size");
		game.context.globalAlpha = 1;
		var image = game.entities.get(entity,"image");
		game.context.drawImage(game.images.get(image.name),position.x,position.y,size.width,size.height);

	}, "cursor");
};
