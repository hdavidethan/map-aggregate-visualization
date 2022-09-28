"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var fs = require("fs");
function convertMetersToDegrees(distance) {
    return distance / 111300;
}
function generateLocation() {
    var CENTER = { lat: 40.4511, lng: -79.9338 };
    var RADIUS = 1000;
    var u = Math.random();
    var v = Math.random();
    var radiusDegrees = convertMetersToDegrees(RADIUS);
    var w = radiusDegrees * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);
    var xPrime = x / Math.cos(CENTER.lat);
    return { lat: CENTER.lat + y, lng: CENTER.lng + xPrime };
}
function generateParkingData(periodMins) {
    var result = [];
    var n = (24 * 60) / periodMins;
    for (var i = 0; i < n; i++) {
        var u = Math.random();
        result.push(u > 0.5 ? 1 : 0);
    }
    return result;
}
function generateNLocations(n) {
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(__assign(__assign({}, generateLocation()), { parking: generateParkingData(30) }));
    }
    return result;
}
function writeToFile() {
    fs.writeFileSync("locations.json", JSON.stringify(generateNLocations(200)));
}
writeToFile();
