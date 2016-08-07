module.exports = function(data, camera, ctx_ship){
    var module = {};
    module.Button = function(){;
        this.x = 0;
        this.y = 0;
        this.clicked = false;
        this.color = "rgba(255, 255, 255, 1)";
        this.font = "30px Arial";
        this.text = "";
    }
    module.buttons={};
    module.buttons.back = new module.Button();
    module.buttons.settings = new module.Button();
    module.buttons.lobby = new module.Button();
    module.texts = ["Continue", "Settings", "Back to Lobby"];

    module.initButton = function(button, i){
       var topOffset = camera.height/4;
       button.y = topOffset + (i * 100);
       button.text = module.texts[i];
       var text_width = ctx_ship.measureText(button.text).width;
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
 
    return module;
}
