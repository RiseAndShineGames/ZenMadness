"use strict";

module.exports = function(ecs, game) {
    ecs.addEach(function rotate_projectiles(entity, elapsed) {
        var rotation = game.entities.get(entity, "rotation");
        var image = game.entities.get(entity, "image");
        var dx = game.entities.get(entity, "velocity").x;
        var mod = game.entities.get(entity, "mod");
        if(dx > 0) {
            game.entities.set(entity, "rotation", {"angle": (rotation.angle + mod)});
        } else {
            game.entities.set(entity, "rotation", {"angle": (rotation.angle - mod)});
        }
    }, "projectile");
}
