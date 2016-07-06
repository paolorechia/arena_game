"use strict";
require('./turret/ts/main.ts');
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var g = new Greeter('asswit');
console.log(g.greet());
