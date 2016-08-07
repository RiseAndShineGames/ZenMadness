"use strict";

module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars

        var pos_txt = "This is Positive Energy. It will bring your monk to zen";
        var neg_txt = "This is Negative Energy. It will ruin your monk's concentration.";
        var zengrenade_txt = "Press space to drop a zen grenade.";

        // Positive Projectile Position: {"x": game.canvas.width * 0.25, "y": game.canvas.height * 0.1}
        game.context.font = "20px Arial";
        game.context.fillStyle = "black";
        game.context.fillText(pos_txt, game.canvas.width * 0.25 - (game.context.measureText(pos_txt).width / 2), game.canvas.height * 0.2);
        game.context.fillText(neg_txt, game.canvas.width * 0.75 - (game.context.measureText(neg_txt).width / 2), game.canvas.height * 0.2);
        game.context.fillText(zengrenade_txt, game.canvas.width * 0.5 - (game.context.measureText(zengrenade_txt).width / 2), game.canvas.height * 0.85);

    }, "camera");
}
