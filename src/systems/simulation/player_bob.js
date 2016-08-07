"use strict";

module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) {
        var half_bob_range = 7;
        var time_incriment = 0.009;

        var image = game.entities.get(entity, "image");
        var time = game.entities.get(entity,"time");
        
        image.destinationY = Math.sin(time.bob_time)*half_bob_range;
        time.bob_time += time_incriment; 
    }, "player");
}
