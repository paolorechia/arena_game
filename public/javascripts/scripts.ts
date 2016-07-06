import './turret/ts/main.ts';


class Greeter {
    greeting: string;
    constructor (message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

var g = new Greeter('asswit');
console.log(g.greet());
