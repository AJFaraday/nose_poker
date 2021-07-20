const Game = require('./../src/models/game.js');

var started = new Date();
new Game();
var finished = new Date();
var diff = finished - started;
console.log(`Finished in ${diff}ms`)
