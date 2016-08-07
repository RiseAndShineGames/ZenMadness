"use strict";

module.exports = function(ecs, game) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars

        var cursor = 2;
        var name = game.entities.get(entity, "name");
        var timers = game.entities.get(cursor, "timers");
        var position = game.entities.get(entity, "position");
        var size = game.entities.get(entity, "size");
        
        if(name == "zengrenade") {
            if(timers.zen_cooldown.running) {
                var zen_percent = timers.zen_cooldown.time / timers.zen_cooldown.max;
                game.context.globalAlpha = 0.25;
                game.context.fillStyle = "black";
                game.context.fillRect(position.x + size.width * 0.15, position.y + size.height * 0.15, (size.width * 0.7) - ((size.width * 0.7) * zen_percent), size.height * 0.7);
                game.context.globalAlpha = 1;
            }
        }

    }, "ability_icon");
}
