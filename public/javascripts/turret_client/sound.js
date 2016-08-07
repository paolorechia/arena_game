module.exports = function(data, ship){
    var module = {};
   
    var sound_laser = document.getElementById("laser");
    var sound_blaster = document.getElementById("blaster");
    module.play = function(){
        if (data.atirando == true){    
            console.log(ship.weapon);
            if (ship.weapon == 'laser'){
                console.log(sound_laser.currentTime);
                if (sound_laser.currentTime == 0){
                    sound_laser.play();
                }
                if (sound_laser.currentTime > 0.2){
                    sound_laser.currentTime = 0.02;
                    sound_laser.play();
                }
            }
            else
                if (ship.weapon == 'blaster'){
                    if (sound_blaster.currentTime == 0){
                        sound_blaster.play();
                    }
                    if (sound_blaster.currentTime > 0.15){
                        sound_blaster.currentTime = 0.1;
                        sound_blaster.play();
                }
            }
                
        }
    }
    return module;
} 
