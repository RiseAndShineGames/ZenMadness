"use strict";

module.exports = function(ecs, data) {
    ecs.addEach(function(entity, elapsed) {
        var entity_size = data.entities.get(entity, "size");
        var entity_position = data.entities.get(entity, "position");
        var image = data.entities.get(entity, "image");
        var click_image = data.entities.get(entity, "click_image");
        var cursor_position = {
            "x": data.input.mouse.x - entity_size.width / 2,
            "y": data.input.mouse.y - entity_size.height / 2
        };
        data.entities.set(entity, "position", cursor_position);

        var timers = data.entities.get(entity, "timers");
        var entity_collisions = data.entities.get(entity, "collisions");
        if(data.input.mouse.consumePressed(0)) {
            for(var i = 0; i < entity_collisions.length; ++i) {
                if(data.entities.get(entity_collisions[i], "name") == "play") {
                    data.entities.set(entity_collisions[i], "image", {"name": "play_pressed"}); 
                    data.sounds.stop("title");
                    data.switchScene("main", {"mode": "tutorial"});
                }
                if(data.entities.get(entity_collisions[i], "name") == "zenmode") {
                    data.entities.set(entity_collisions[i], "image", {"name": "zenmode_pressed"}); 
                    data.sounds.stop("title");
                    data.switchScene("main", {"mode": "zen"});
                }
                if(data.entities.get(entity_collisions[i], "name") == "credits") {
                    data.entities.set(entity_collisions[i], "image", {"name": "credits_pressed"}); 
                    data.switchScene("credits");
                }
            }
            image.name = click_image;
            timers.cursor_click.time = 0;
            timers.cursor_click.running = true;
        }

    }, "cursor");
}
