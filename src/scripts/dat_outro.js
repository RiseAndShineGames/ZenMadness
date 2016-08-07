"use strict";

module.exports = function(entity, game) {

	var player_pos = game.entities.get(entity, "position");
	var player_size = game.entities.get(entity, "size");
	var timers = game.entities.get(entity, "timers");
	var level = game.arguments.level;

	if(player_pos.y > -player_size.height) {
		player_pos.y -= 5;
		timers.dat_outro.time = 0;
		timers.dat_outro.running = true;
	} else {
		level++;
		game.switchScene("main", {"level": level, "mode": game.arguments.mode});
	}

}
