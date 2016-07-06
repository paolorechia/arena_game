console.log("i'm the main");

import { Asteroide } from './asteroide.ts' ;

//Exemplo (x, y, vel, tam, versor)
var asteroide1 = new Asteroide(3,10,10,2,[3,2]);
console.log(asteroide1.show_position());
