"use strict";
console.log("i'm the main");
var asteroide_ts_1 = require('./asteroide.ts');
var asteroide1 = new asteroide_ts_1.Asteroide(3, 10, 10, 2, [3, 2]);
console.log(asteroide1.show_position());
