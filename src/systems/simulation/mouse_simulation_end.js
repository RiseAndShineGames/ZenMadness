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
            var film_timer = data.entities.get(0, "timers");
            film_timer.bring_in_film.time = 2999;
            film_timer.start_end.time = 999;
            for(var i = 0; i < entity_collisions.length; ++i) {
                if(data.entities.get(entity_collisions[i], "name") == "title") {
                    data.sounds.stop("main");
                    data.switchScene("title");
                }
                if(data.entities.get(entity_collisions[i], "name") == "try_again") {
                    data.sounds.stop("main");
                    data.switchScene("main", {"mode": "normal"});
                }
            }
            image.name = click_image;
            timers.cursor_click.time = 0;
            timers.cursor_click.running = true;
        }
    }, "cursor");
}