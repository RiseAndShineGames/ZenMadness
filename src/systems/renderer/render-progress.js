"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("search", ["progress", "progress_meter"]);
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "size");
		var progress = game.entities.get(entity, "progress");
		game.context.globalAlpha = 0.65;
		var prog= progress.value/progress.max > 1? 1:progress.value/progress.max ;

		for(var i = 0;i < progress.blocks.length;i++){
			var match =game.entities.get(progress.blocks[i],"match");
			var block_size = game.entities.get(progress.blocks[i],"size");
			var colors = game.entities.get(progress.blocks[i],"colors");
			var color = Math.floor(progress.value/progress.pill_value)>=i?colors.full:colors.empty;  
			game.context.fillStyle = color;

			game.context.fillRect(position.x, position.y + match.offsetY, block_size.width, block_size.height);

		}
        game.context.globalAlpha = 1;

	}, "search");
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "size");
		var image = game.entities.get(entity,"image");
		game.context.globalAlpha = 0.5;
		game.context.drawImage(game.images.get(image.name),position.x,position.y,size.width,size.height);
		game.context.globalAlpha = 1;
	}, "lotus");
};
