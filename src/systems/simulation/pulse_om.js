module.exports = function(ecs, game) {
    ecs.addEach(function(entity, elapsed) {
    	if(game.entities.get(entity,"image")){
    		var half_bob_range = 1;
	        var time_incriment = 0.009;

	        var size = game.entities.get(entity, "size");
	        var base_size = game.entities.get(entity, "base_size");
	        var time = game.entities.get(entity,"time");
	        var position = game.entities.get(entity, "position");

	        size.width = (Math.sin(time.scale_time)*(1/12)+ 1) *base_size.width ;
	        size.height = (Math.sin(time.scale_time)*(1/12)+ 1) *base_size.height;
    		console.log(size);
	        time.scale_time += time_incriment; 
    	}
        
    }, "halo");
    ecs.addEach(function(entity, elapsed) {
    	if(game.entities.get(9,"image")){

    		var half_bob_range = 1;
	        var time_incriment = 0.009;

	        var size = game.entities.get(entity, "size");
	        var base_size = game.entities.get(entity, "base_size");
	        var time = game.entities.get(entity,"time");
	        var position = game.entities.get(entity, "position");

	        if(time.scale_time == 0){
	        	game.sounds.play("smallgong.mp3");
	        }
	        size.width = (Math.sin(time.scale_time)*(1/12)+ 1) *base_size.width ;
	        size.height = (Math.sin(time.scale_time)*(1/12)+ 1) *base_size.height;
    		console.log(size);
	        time.scale_time += time_incriment; 
    	}
        
    }, "om");
}
