module.exports = function(data, camera, ctx_ship){
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
    module.buttons={};
    module.buttons.back = new module.Button();
    module.buttons.volume= new module.Button();
    module.texts = ["Back", "Volume: "];

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
    module.initButtons = function(){
        
        var i = 0;
        for (button in module.buttons){
            module.initButton(module.buttons[button], i);
            i++;
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
