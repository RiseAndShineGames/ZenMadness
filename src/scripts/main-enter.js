"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars

	var camera = 0;
	var camera_timers = game.entities.get(camera, "timers");
	var level = parseInt(game.arguments.level) % 3;

	var levels = [
		{
			"background": "background3.png",
		},
		{
			"background": "beach1.png",
		},
		{
			"background": "background2.png",
		}
	]
	
	if(level == 1) {
		camera_timers.spawn_clouds.running = true;
	}

	game.entities.set(camera, "image", { "name": levels[level]["background"] });
	
};
