"use strict";

module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars

        var timers = game.entities.get(entity, "timers");
        if(timers.bring_in_film.running === true){

            game.context.fillStyle = "white";
            game.context.globalAlpha = 0.7;
            game.context.fillRect(0,0,game.canvas.width, game.canvas.height*(timers.bring_in_film.time/timers.bring_in_film.max));
            game.context.globalAlpha = 1;
        }else{
            game.context.fillStyle = "white";
            game.context.globalAlpha = 0.7;
            game.context.fillRect(0,0,game.canvas.width, game.canvas.height);
            game.context.globalAlpha = 1;
        }


    }, "camera");
}
