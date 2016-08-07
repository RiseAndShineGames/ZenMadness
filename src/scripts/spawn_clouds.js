"use strict";

module.exports = function(entity, game) {

    var cloud = game.instantiatePrefab("cloud");
    var image = game.entities.get(cloud, "image");
    var pos = {
        "x": Math.floor(Math.random() * ((game.canvas.width - 200) - 1)) + 1,
        "y": Math.floor(Math.random() * (205 - 15)) + 15,
        "z": 0
    };
    game.entities.set(cloud, "position", pos);

    var black_cloud = Math.floor(Math.random() * (9 - 1)) + 1;
    var cloud_num, cloud_name;

    if( black_cloud > 3 ) {
        cloud_num = Math.floor(Math.random() * (3 - 1)) + 1;
        cloud_name = "darkclouds" + cloud_num.toString() + ".png";
        switch(cloud_num) {
            case 3:
                game.entities.set(cloud, "size", {"width": 200, "height": 95});
                break;
            case 2:
                game.entities.set(cloud, "size", {"width": 200, "height": 89});
                break;
            case 1:
                game.entities.set(cloud, "size", {"width": 200, "height": 91});
                break;
            default:
                game.entities.set(cloud, "size", {"width": 0, "height": 0});
                break;
        }
    } else {
        cloud_num = Math.floor(Math.random() * (5 - 1)) + 1;
        cloud_name = "clouds" + cloud_num.toString() + ".png";
        switch(cloud_num) {
            case 5:
                game.entities.set(cloud, "size", {"width": 200, "height": 79});
                break;
            case 4:
                game.entities.set(cloud, "size", {"width": 200, "height": 62});
                break;
            case 3:
                game.entities.set(cloud, "size", {"width": 200, "height": 71});
                break;
            case 2:
                game.entities.set(cloud, "size", {"width": 200, "height": 102});
                break;
            case 1:
                game.entities.set(cloud, "size", {"width": 200, "height": 86});
                break;
            default:
                game.entities.set(cloud, "size", {"width": 0, "height": 0});
                break;
        }
    }

    image.name = cloud_name;
    game.entities.set(cloud, "image", image);
    var mod = Math.random() * (0.08 + 0.08) - 0.08;
    game.entities.set(cloud, "velocity", {"x": mod, "y": 0});

    var timers = game.entities.get(entity, "timers");
    timers.spawn_clouds.time = 0;
    timers.spawn_clouds.max = 2000;
    timers.spawn_clouds.running = true;

}
