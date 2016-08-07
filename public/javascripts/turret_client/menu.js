module.exports = function(data, camera){
    var module = {};
    module.Button = function(){;
        this.x = 0;
        this.y = 0;
        this.clicked = false;
        this.color = "rgba(255, 255, 255, 1)";
        this.font = "30px Arial";
        this.text = "";
    }
    module.topOffset = 50;
    module.buttons={};
    module.buttons.back = new module.Button();
    module.buttons.settings = new module.Button();
    module.buttons.lobby = new module.Button();
    module.buttons.texts = ["Continue", "Settings", "Back to Lobby"];

    module.initButton = function(button, i){
       button.x = camera.width/3;
       button.y = module.topOffset + 100;
       button.text = module.buttons.texts[i];
    }
    module.initButtons = function(){
        
        var i = 0;
        for (button in module.buttons){
            module.initButton(button, i);
            i++;
        }
    }
 
    return module;
}
