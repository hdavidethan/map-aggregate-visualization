"use strict";
exports.__esModule = true;
var fs = require("fs");
function generateHeatMap() {
    var MAP_SIZE = 20;
    var result = [];
    for (var i = 0; i < MAP_SIZE; i++) {
        var row = [];
        for (var j = 0; j < MAP_SIZE; j++) {
            var value = Math.random();
            row.push(value);
        }
        result.push(row);
    }
    return result;
}
function writeToFile() {
    fs.writeFileSync("locations.json", JSON.stringify(generateHeatMap()));
}
writeToFile();
