module.exports = function(data, ship){
    var module = {};
   
    var sound = document.getElementById("blaster");
    module.play = function(){
        if (data.atirando == true){    
            sound.currentTime = 0.07;
            sound.play();
        }
    }
    return module;
} 
