const locations = require("./locations.json");
const wordCloudData = require("./searchTrends.json");
const fs = require("fs");

const locationMap = {};

for (const location of wordCloudData) {
  locationMap[`${location.lat},${location.lng}`] = location.queries;
}

const result = [];

for (const location of locations) {
  result.push({
    ...location,
    searchQueries: locationMap[`${location.lat},${location.lng}`],
  });
}

fs.writeFileSync("./locationsMerged.json", JSON.stringify(result));
