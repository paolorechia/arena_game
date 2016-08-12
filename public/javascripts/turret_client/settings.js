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
    module.volumeButton = function(){;
        this.x = 0;
        this.y = 0;
        this.clicked = false;
        this.hover = false;
        this.color = "rgba(255, 255, 255, 1)";
        this.hover_color = "rgba(0, 0, 0, 1)";
        this.font = "30px Arial";
        this.text = "unknown";
        this.height = 25;
        this.value = 1.0;
    }

    module.volumeButtons = {};
    module.volumeButtons.sfx = new module.volumeButton();
    module.volumeButtons.music= new module.volumeButton();

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
       window.addEventListener('resize', function(event) {
           var topOffset = camera.height/4;
           button.y = topOffset + (i * 100);
           button.text = module.texts[i];
           var text_width = ctx_ship.measureText(button.text).width;
           button.x = camera.width/2 - text_width;
       });
    }
    module.initVolumeButton = function(button, i){
       var topOffset = module.buttons["volume"].y;
       button.y = topOffset + (i * 100);
       button.text = module.volumeTexts[i - 1];
       var text_width = ctx_ship.measureText(button.text).width;
       button.width = text_width;
       button.x = camera.width/2 - text_width * 3;
       window.addEventListener('resize', function(event) {
           var topOffset = module.volumeButtons["volume"];
           button.y = topOffset + (i * 100);
           button.text = module.volumeTexts[i - 1];
           var text_width = ctx_ship.measureText(button.text).width;
           button.width = text_width;
           button.x = camera.width/2 - text_width * 3;
       });
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
