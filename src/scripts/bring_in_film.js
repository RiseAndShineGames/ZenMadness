"use strict";

module.exports = function(entity, game) {
   var timers =game.entities.get(entity, "timers"); 
   timers.start_end.running = true;
}
