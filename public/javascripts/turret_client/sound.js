module.exports = function(data, ship){
    var module = {};
   
    module.SFX = {};
    module.raiseVolume = function(sound){
       sound.volume += 0.1;
    }
    module.lowerVolume = function(sound){
        sound.volume -= 0.1;
    }
    module.setVolume = function(sound, value){
        sound.volume = value;
    }
    module.changeSFX = function(f){
        for (each in module.SFX){
            f(module.SFX[each]);
        }
    }
    module.setSFX = function(value){
        for (each in module.SFX){
            module.setVolume(module.SFX[each], value);
        }
    } 
    module.music = document.getElementById("music");
    module.music.addEventListener('ended', function(){
        this.currentTime = 0;
        this.play();
    }, false);
    
    module.music.volume = 1.0;

    module.SFX.laser = document.getElementById("laser");
    module.SFX.laser.volume = 1.0;
    module.SFX.blaster = document.getElementById("blaster");
    module.SFX.blaster.volume = 1.0;
    module.play = function(){
        if (data.atirando == true){    
//            console.log(ship.weapon);
            if (ship.weapon == 'laser'){
//                console.log(module.SFX.laser.currentTime);
                if (module.SFX.laser.currentTime == 0){
                    module.SFX.laser.play();
                }
                if (module.SFX.laser.currentTime > 0.2){
                    module.SFX.laser.currentTime = 0.02;
                    module.SFX.laser.play();
                }
            }
            else
                if (ship.weapon == 'blaster'){
                    if (module.SFX.blaster.currentTime == 0){
                        module.SFX.blaster.play();
                    }
                    if (module.SFX.blaster.currentTime > 0.15){
                        module.SFX.blaster.currentTime = 0.1;
                        module.SFX.blaster.play();
                }
            }
                
        }
    
        if (module.music.currentTime == 0){ 
            module.music.play();
        }
    }
    return module;
} 
