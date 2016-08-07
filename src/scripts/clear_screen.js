"use strict";

module.exports = function(entity, game) {

    var size = game.entities.get(entity, "size");
    var pos = game.entities.get(entity, "position");
    var step = game.entities.get(entity, "size_step");
    var new_size = {
        "width": size.width + step,
        "height": size.height + step
    };
    game.entities.set(entity, "size", new_size);
    var new_pos = {
        "x": pos.x - step / 2,
        "y": pos.y - step / 2
    };
    game.entities.set(entity, "position", new_pos);

    var timers = game.entities.get(entity, "timers");
    timers.clear_screen.time = 0;
    timers.clear_screen.running = true;

};
