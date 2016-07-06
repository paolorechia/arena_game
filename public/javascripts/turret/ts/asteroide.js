"use strict";
var Asteroide = (function () {
    function Asteroide(x_inicial, y_inicial, velocidade, tamanho, versor) {
        this.position = "X: " + x_inicial + ", Y: " + y_inicial;
    }
    Asteroide.prototype.show_position = function () {
        return "My initial position is " + this.position + "!";
    };
    return Asteroide;
}());
exports.Asteroide = Asteroide;
