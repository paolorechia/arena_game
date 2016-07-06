/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	console.log("i'm the main");
	var asteroide_ts_1 = __webpack_require__(2);
	//Exemplo
	var asteroide1 = new asteroide_ts_1.Asteroide(3, 10, 10, 2, [3, 2]);
	console.log(asteroide1.show_position());


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=scripts.js.map