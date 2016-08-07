"use strict";

module.exports = function(entity, game) {

	var camera = 0;
	var constants = game.entities.get(camera, "constants");
	var player_pos = game.entities.get(entity, "position");
	var player_size = game.entities.get(entity, "size");
	var cam_timers = game.entities.get(camera, "timers");
    var timers = game.entities.get(entity, "timers");

	if( player_pos.y < constants.center.y - player_size.height / 2 ) {
		player_pos.y += 5;
		timers.dat_intro.time = 0;
		timers.dat_intro.running = true;
	} else {
		cam_timers.spawn_projectile.running = true;
		cam_timers.ramp_speed.running = true;
	}


}
