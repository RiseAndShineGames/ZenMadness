"use strict";

module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) {
        var entity_size = game.entities.get(entity, "size");
        var entity_position = game.entities.get(entity, "position");
        var image = game.entities.get(entity, "image");
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
        if(game.input.mouse.consumePressed(0)) {
            var film_timer = game.entities.get(0, "timers");
            film_timer.bring_in_film.time = 2999;
            film_timer.start_end.time = 999;
            for(var i = 0; i < entity_collisions.length; ++i) {
                if(game.entities.get(entity_collisions[i], "name") == "title") {
                    game.sounds.stop("main");
                    game.switchScene("title");
                }
                if(game.entities.get(entity_collisions[i], "name") == "try_again") {
                    game.sounds.stop("main");
                    game.switchScene("main", {"mode": "normal", "level": 1});
                }
            }
            image.name = click_image;
            timers.cursor_click.time = 0;
            timers.cursor_click.running = true;
        }
    }, "cursor");
}
