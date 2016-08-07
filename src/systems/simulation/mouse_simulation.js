"use strict";

function handleZenGrenade(game, entity, cursor_position) {
    var grenade, grenade_timers;
    var timers = game.entities.get(entity, "timers");
    var entity_size = game.entities.get(entity, "size");
    var image = game.entities.get(entity, "image");
    if(game.inputs.button("zengrenade")) {
        // Show reticle
        game.entities.set(entity, "was_pressed", true);
        if(!timers.zen_cooldown.running) {
            image.name = "zengrenadereticle.png";
            image.destinationWidth = entity_size.width * 6;
            image.destinationHeight = entity_size.height * 6;
            image.destinationX = -image.destinationWidth / 2 + entity_size.width / 2;
            image.destinationY = -image.destinationHeight / 2 + entity_size.height / 2;
        }
    } else {
        if(game.entities.get(entity, "was_pressed")) {
            if(!timers.zen_cooldown.running) {
                grenade = game.instantiatePrefab("zengrenade");
                game.entities.set(entity, "image", {"name": "cursor.png"});
                game.entities.set(grenade, "position", { "x": cursor_position.x - entity_size.width / 2, "y": cursor_position.y - entity_size.height / 2});
                game.entities.set(grenade, "size", {"width": entity_size.width * 2, "height": entity_size.height * 2});
                timers.zen_cooldown.time = 0;
                timers.zen_cooldown.running = true;
            }
            game.entities.set(entity, "was_pressed", false);
        }
    }
}

function handleCollisionsMain(game, other) {
    if(game.entities.get(other, "name") == "play_button") {
        game.entities.set(other, "image", {"name": "playpressed.png"}); 
        game.switchScene("main", {"level": 1});
    }
    if(game.entities.get(other, "projectile")) {
        game.entities.destroy(other);
        return true;
    }
    return false;
}

function handleCollisionsTitle(game, other) {
    if(game.entities.get(other, "name") == "play") {
        game.entities.set(other, "image", {"name": "playpressed.png"}); 
        game.sounds.stop("title");
        game.switchScene("tutorial");
    }
    if(game.entities.get(other, "name") == "zenmode") {
        game.entities.set(other, "image", {"name": "zenmodeselectpressed.png"}); 
        game.sounds.stop("title");
        game.switchScene("main", {"mode": "zen", "level": 1});
    }
    if(game.entities.get(other, "name") == "credits") {
        game.entities.set(other, "image", {"name": "creditspressed.png"}); 
        game.switchScene("credits");
    }
}

function handleCollisionsEnd(game, other) {
    if(game.entities.get(other, "name") == "title") {
        game.sounds.stop("main");
        game.switchScene("title");
    }
    if(game.entities.get(other, "name") == "try_again") {
        game.sounds.stop("main");
        game.switchScene("main", {"mode": "normal", "level": 1});
    }
}

function handleCollisionsCredits(game, other) {
    if(game.entities.get(other, "name") == "back_title") {
        game.entities.set(other, "image", {"name": "backtotitlepressed.png"}); 
        game.sounds.stop("title");
        game.switchScene("title");
    }
    if(game.entities.get(other, "target_url").length > 0) {
        window.location = game.entities.get(other, "target_url");
    }
}

function move_cursor(game, entity) {
    var mod = game.entities.get(entity, "move_mod");
    var x = game.inputs.axis("x") * mod;
    var y = game.inputs.axis("y") * mod;
    var entity_size = game.entities.get(entity, "size");
    var entity_position = game.entities.get(entity, "position");
    var cursor_position = {
        "x": entity_position.x + x,
        "y": entity_position.y + y
    };
    if(cursor_position.x <= 0) {
        cursor_position.x = 0;
    }
    if(cursor_position.y <= 0) {
        cursor_position.y = 0;
    }
    if(cursor_position.x >= game.canvas.width - entity_size.width) {
        cursor_position.x = game.canvas.width - entity_size.width;
    }
    if(cursor_position.y >= game.canvas.height - entity_size.height) {
        cursor_position.y = game.canvas.height - entity_size.height;
    }
    game.entities.set(entity, "position", cursor_position);
    return cursor_position;
}

module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) {

        var image = game.entities.get(entity, "image");
        var click_image = game.entities.get(entity, "click_image");
        var timers = game.entities.get(entity, "timers");
        var entity_collisions = game.entities.get(entity, "collisions");


        var cursor_position = move_cursor(game, entity);

        if(game.inputs.button("action")) {
            game.entities.set(entity, "move_mod", 2);
            for(var i = 0; i < entity_collisions.length; ++i) {
                if (handleCollisionsMain(game, entity_collisions[i])) { continue; }
                if (handleCollisionsTitle(game, entity_collisions[i])) { continue; }
                if (handleCollisionsEnd(game, entity_collisions[i])) { continue; }
            }
            image.name = click_image;
        } else {
            image.name = "cursor.png";
            game.entities.set(entity, "move_mod", 4);
        }

        handleZenGrenade(game, entity, cursor_position);

    }, "cursor");
}
