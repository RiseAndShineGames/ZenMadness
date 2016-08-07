"use strict";

module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) {
        var progress_meter = 7;
        var increment_progress =1;
        var progress = game.entities.get(progress_meter,"progress");

		var player = 1;
		var om_meter = 3;
		var clear_halo = 10;
		var clear_timers = game.entities.get(clear_halo, "timers");
		var player_timers = game.entities.get(player, "timers");
        var entity_size = game.entities.get(entity, "size");
        var entity_position = game.entities.get(entity, "position");
        var image = game.entities.get(entity, "image");
        var timers = game.entities.get(entity, "timers");
        var click_image = game.entities.get(entity, "click_image");

		var mod = game.entities.get(entity, "move_mod");
		var x = game.inputs.axis("x") * mod;
		var y = game.inputs.axis("y") * mod;
        var cursor_position = {
            "x": entity_position.x + x,
            "y": entity_position.y + y
        };
		if(cursor_position.x <= 0) {
			cursor_position.x = 0;
		}
		if(cursor_position.y <= 0) {
			cursor_position.y = 0;
		}
		if(cursor_position.x >= game.canvas.width - entity_size.width) {
			cursor_position.x = game.canvas.width - entity_size.width;
		}
		if(cursor_position.y >= game.canvas.height - entity_size.height) {
			cursor_position.y = game.canvas.height - entity_size.height;
		}
        game.entities.set(entity, "position", cursor_position);

        var timers = game.entities.get(entity, "timers");
        var entity_collisions = game.entities.get(entity, "collisions");
        var om_progress = game.entities.get(om_meter, "om_progress");
        if(game.inputs.button("action")) {
			game.entities.set(entity, "move_mod", 2);
            for(var i = 0; i < entity_collisions.length; ++i) {
                if(game.entities.get(entity_collisions[i], "name") == "play_button") {
                    game.entities.set(entity_collisions[i], "image", {"name": "playpressed.png"}); 
                    game.switchScene("main", {"level": 1});
                }
				if(game.entities.get(entity_collisions[i], "name") == "om" && om_progress.zen) {
					game.entities.set(clear_halo, "image", {"name": "halo.png"});
					clear_timers.clear_screen.running = true;
					player_timers.dat_outro.running = true;
				}
                if(game.entities.get(entity_collisions[i], "projectile")) {
                    game.entities.destroy(entity_collisions[i--]);
                }
            }
            image.name = click_image;
        } else {
			image.name = "cursor.png";
			game.entities.set(entity, "move_mod", 4);
		}

		if(game.inputs.button("start") && om_progress.zen) {
			game.sounds.play("deepgong.mp3");
			game.entities.set(clear_halo, "image", {"name": "halo.png"});
			clear_timers.clear_screen.running = true;
			player_timers.dat_outro.running = true;
		}

        var grenade, grenade_timers;

        if(game.inputs.button("zengrenade")) {
            // Show reticle
			game.entities.set(entity, "was_pressed", true);
            if(!timers.zen_cooldown.running) {
                image.name = "zengrenadereticle.png";
                image.destinationWidth = entity_size.width * 6;
                image.destinationHeight = entity_size.height * 6;
                image.destinationX = -image.destinationWidth / 2 + entity_size.width / 2;
                image.destinationY = -image.destinationHeight / 2 + entity_size.height / 2;
            }
        } else {
			if(game.entities.get(entity, "was_pressed")) {
				if(!timers.zen_cooldown.running) {
					grenade = game.instantiatePrefab("zengrenade");
					game.entities.set(entity, "image", {"name": "cursor.png"});
					game.entities.set(grenade, "position", { "x": cursor_position.x - entity_size.width / 2, "y": cursor_position.y - entity_size.height / 2});
					game.entities.set(grenade, "size", {"width": entity_size.width * 2, "height": entity_size.height * 2});
					timers.zen_cooldown.time = 0;
					timers.zen_cooldown.running = true;
				}
				game.entities.set(entity, "was_pressed", false);
			}
        }

    }, "cursor");
}
