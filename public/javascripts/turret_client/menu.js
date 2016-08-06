module.exports = function(draw){
    var module = {};
    module.Button = function(){;
        this.x = 0;
        this.y = 0;
        this.clicked = false;
        this.color = "rgb(127, 127, 127)";
        this.text = "";
    }
    module.buttons={};
    module.buttons.exit = new module.Button();
    module.loop = function(rodando){
       console.log("rodando o menu");
       if (module.buttons.exit.clicked == true){
            console.log("saindo do menu");
            rodando = false;
       }
       draw.menu();
    };
     
    return module;
}
