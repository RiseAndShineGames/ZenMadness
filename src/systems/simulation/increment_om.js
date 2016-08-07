"use strict";

module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) {
        var player = 1;
        var player_image = game.entities.get(player,"image");
        var progress_meter = 7;
        var progress = game.entities.get(progress_meter,"progress");
        var om_progress = game.entities.get(entity,"om_progress");
		var halo = 9;
        if(progress.value === progress.max){
        	om_progress.value += om_progress.increment;
        	player_image.name = "monkzenmode.png";
        } else if(progress.value <= 30) {
            player_image.name = "pissedmonk.png";
        } else {
            player_image.name = player_image.name == "monkzenmode.png" ? "player_image.png" : player_image.name;
        }
		if(om_progress.value >= om_progress.max) {
			om_progress.value = om_progress.max;
		}
        if(om_progress.value == om_progress.max){
			game.entities.set(halo, "image", {"name": "halo.png"});
        	om_progress.zen = true;
        }
    }, "om");
}
