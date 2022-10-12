"use strict";
exports.__esModule = true;
var fs = require("fs");
function generateWordCloud() {
    var result = [];
    var words = ["cool", "awesome", "wow", "fun", "amazing", "rad"];
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        var randomNumber = Math.floor(Math.random() * 20);
        result.push({
            content_type: "trends: ".concat(word),
            content_value: randomNumber
        });
    }
    return result;
}
function writeToFile() {
    fs.writeFileSync("locations.json", JSON.stringify(generateWordCloud()));
}
writeToFile();
