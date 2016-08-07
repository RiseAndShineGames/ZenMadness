"use strict";

module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) {

        var player = 1;
        var player_timers = game.entities.get(player, "timers");

        var progress_meter = 7;
        var increment_progress =1;
        var progress = game.entities.get(progress_meter,"progress");

        var clear_halo = 10;
        var clear_timers = game.entities.get(clear_halo, "timers");
        var om_meter = 3;
        var om_progress = game.entities.get(om_meter, "om_progress");

        if(game.inputs.button("start") && om_progress.zen) {
            game.sounds.play("deepgong.mp3");
            game.entities.set(clear_halo, "image", {"name": "halo.png"});
            clear_timers.clear_screen.running = true;
            player_timers.dat_outro.running = true;
        }
    }, "cursor");
}
