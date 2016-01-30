"use strict";

function normalize(x, y, pos) {

    var d = Math.sqrt((pos.x - x) * (pos.x - x) + (pos.y - y) * (pos.y - y)); 

    return {
        "x": (x-pos.x)/d,
        "y": (y-pos.y)/d
    };

}

function cast_to_edge(x, y, pos, data) {

    var uv = normalize(x, y, pos);

    do {
        x+=uv.x;
        y-=Math.abs(uv.y);
    } while( x >= 0 && x <= data.canvas.width && y >= 0 );

    return {"x": x, "y": y}

}

module.exports = function(entity, data) {

    var constants = data.entities.get(entity, "constants"); 
    var x = Math.floor(Math.random() * data.canvas.width);
    var y = Math.floor(Math.random() * data.canvas.height);

    var projectile = data.instantiatePrefab("projectile");

    var new_pos = cast_to_edge(x, y, constants.center, data);

    data.entities.set(projectile, "position", new_pos);

    var uv = normalize(new_pos.x, new_pos.y, constants.center);
    data.entities.set(projectile, "velocity", {"x": -uv.x * 0.2, "y": -uv.y * 0.2});

    var timers = data.entities.get(entity, "timers");
    timers.spawn_projectile.time = 0;
    timers.spawn_projectile.running = true;

}