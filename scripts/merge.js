const locations = require("./locations.json");
const noiseData = require("./noise.json");
// const wordCloudData = require("./searchTrends.json");
const fs = require("fs");

const locationMap = {};

for (const location of noiseData) {
  locationMap[`${location.lat},${location.lng}`] = location.noiseLevel;
}

const result = [];

for (const location of locations) {
  result.push({
    ...location,
    noise: locationMap[`${location.lat},${location.lng}`],
  });
}

fs.writeFileSync("./locationsMerged.json", JSON.stringify(result));
