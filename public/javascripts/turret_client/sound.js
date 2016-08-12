module.exports = function(data, ship){
    var module = {};
   
    var SFX = {};
    module.raiseVolume = function(sound){
       sound.volume += 0.1;
    }
    module.lowerVolume = function(sound){
        sound.volume -= 0.1;
    }
    module.changeSFX = function(f){
        for (each in SFX){
            f(SFX[each]);
        }
    }
    var music = document.getElementById("music");
    music.addEventListener('ended', function(){
        this.currentTime = 0;
        this.play();
    }, false);
    
    music.volume = 1.0;

    SFX.laser = document.getElementById("laser");
    SFX.laser.volume = 0.5;
    SFX.blaster = document.getElementById("blaster");
    SFX.blaster.volume = 0.5;
    module.play = function(){
        if (data.atirando == true){    
//            console.log(ship.weapon);
            if (ship.weapon == 'laser'){
//                console.log(SFX.laser.currentTime);
                if (SFX.laser.currentTime == 0){
                    SFX.laser.play();
                }
                if (SFX.laser.currentTime > 0.2){
                    SFX.laser.currentTime = 0.02;
                    SFX.laser.play();
                }
            }
            else
                if (ship.weapon == 'blaster'){
                    if (SFX.blaster.currentTime == 0){
                        SFX.blaster.play();
                    }
                    if (SFX.blaster.currentTime > 0.15){
                        SFX.blaster.currentTime = 0.1;
                        SFX.blaster.play();
                }
            }
                
        }
    
        if (music.currentTime == 0){ 
            music.play();
        }
    }
    return module;
} 
