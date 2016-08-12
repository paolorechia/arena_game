module.exports = function(data, camera, ctx_ship, sound){
    var module = {};
    module.Button = function(){;
        this.x = 0;
        this.y = 0;
        this.clicked = false;
        this.hover = false;
        this.color = "rgba(255, 255, 255, 1)";
        this.hover_color = "rgba(0, 0, 0, 1)";
        this.font = "30px Arial";
        this.text = "";
        this.height = 25;
    }
    module.Bar = function(){
        this.hover = false;
        this.color = "rgba(255, 255, 255, 1)";
        this.hover_color = "rgba(0, 0, 0, 1)";
        this.x = 0;
        this.y = 0;
        this.size = 100;
        this.width = 5;
        this.point = 0;
    }
    
    module.VolumeButton = function(){;
        this.x = 0;
        this.y = 0;
        this.clicked = false;
        this.hover = false;
        this.color = "rgba(255, 255, 255, 1)";
        this.hover_color = "rgba(255, 255, 255, 1)";
        this.font = "30px Arial";
        this.text = "unknown";
        this.value = 1.0;
        this.bar = new module.Bar();
    }

    module.volumeButtons = {};
    module.volumeButtons.sfx = new module.VolumeButton();
    module.volumeButtons.music= new module.VolumeButton();

    module.volumeTexts = ["SFX", "Music"];
    module.buttons={};
    module.buttons.back = new module.Button();
    module.buttons.volume= new module.Button();
    module.buttons.volume.hover_color = "rgba(255, 255, 255, 1)";
     
    module.texts = ["Back", "Sound"];

    module.initButton = function(button, i){
       var topOffset = camera.height/4;
       button.y = topOffset + (i * 100);
       button.text = module.texts[i];
       var text_width = ctx_ship.measureText(button.text).width;
       button.width = text_width;
       button.x = camera.width/2 - text_width;
        /*
       window.addEventListener('resize', function(event) {
           var topOffset = camera.height/4;
           button.y = topOffset + (i * 100);
           button.text = module.texts[i];
           var text_width = ctx_ship.measureText(button.text).width;
           button.x = camera.width/2 - text_width;
       });
        */
    }
    module.initBar = function(button){
        button.bar.x = camera.width/2 - button.bar.size/2;
        button.bar.y = button.y + button.bar.size/3;
        button.bar.point = button.bar.x  + button.value * 100;
    }
    module.initVolumeButton = function(button, i){
       var topOffset = module.buttons["volume"].y;
       button.y = topOffset + (i * 100);
       button.text = module.volumeTexts[i - 1];
       var text_width = ctx_ship.measureText(button.text).width;
       button.width = text_width;
       button.x = camera.width/2 - text_width * 3;
       module.initBar(button);
       console.log(button);
    }
    module.initVolButtons = function(){
        var i = 1;
        for (button in module.volumeButtons){
            module.initVolumeButton(module.volumeButtons[button], i);
            i++;
        }
    }
    module.initButtons = function(){
        
        var i = 0;
        for (button in module.buttons){
            module.initButton(module.buttons[button], i);
            i++;
        }
    }
    module.init = function (){
        module.initButtons();
        module.initVolButtons();
       window.addEventListener('resize', function(event) {
            module.initButtons();
            module.initVolButtons();
        });
    }
    module.checkBarHover = function(bar){
        var xboundary = bar.x + bar.size;
        var ybot= bar.y + bar.size/5;
        var ytop= bar.y - bar.size/5;
        if (data.coord.x > bar.x && data.coord.x < xboundary
        && data.coord.y > ytop && data.coord.y < ybot)
            {
//                console.log("hovering a bar...");
                bar.hover = true;
                if (data.atirou == true){
                    bar.point = data.coord.x;
//                    console.log("clicking a bar...");
                    var value = (bar.point - bar.x) / 100;
                    value = value.toFixed(1); 
                    console.log(value);
                    return value;
                }
            }
        else{ 
            bar.hover = false;
            return undefined;
        }
        
    }
    module.checkBarHovers = function(){
        for (button in module.volumeButtons){
            var value = module.checkBarHover(module.volumeButtons[button].bar);
            console.log(value);
            if (value != undefined){
                module.volumeButtons[button].value = value;
            } 
        }
    }

    module.checkHover= function(button){
        var xboundary = button.x + button.width * 3;
        var ybot= button.y + button.height/3;
        var ytop= button.y - button.height;
        if (data.coord.x > button.x && data.coord.x < xboundary
        && data.coord.y > ytop && data.coord.y < ybot)
            {
                button.hover = true;
                if (data.clicou == true){
                    button.clicked = true;
                }
            }
        else{ 
            button.hover = false;
            button.clicked = false;
        }
        
    }
    module.updateVolume = function(){
        for (button in module.volumeButtons){
            if (button == "sfx"){
                sound.setSFX(module.volumeButtons[button].value); 
            }
            else if (button == "music"){
                sound.music.volume = module.volumeButtons[button].value;
            }
        }
    }
    module.checkHovers = function(){
        for (button in module.buttons){
           module.checkHover(module.buttons[button]);
        }
    }
    module.checkClicks = function(){
        if (module.buttons.back.clicked == true){
            data.gameState = data.previousState;
        }
    }
    return module;
}
