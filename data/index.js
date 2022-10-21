const locations = require("./locations.json");
const fs = require("fs");
const { queryReverseGeocode } = require("./geo");
const { LocationClient } = require("@aws-sdk/client-location");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

async function main(locations) {
  // Extract unique geocodes
  const uniqueGeos = {};

  locations.forEach((location) => {
    uniqueGeos[JSON.stringify(location)] = location;
  });

  // Query each unique geocode
  const addressMap = {};
  const config = {
    region: "us-east-2",
    endpoint: "https://geo.us-east-2.amazonaws.com/",
    credentials: fromIni({ profile: "default" }),
  };

  const locationClient = new LocationClient(config);
  await Promise.all(
    Object.keys(uniqueGeos).map(async (geoString) => {
      const geo = uniqueGeos[geoString];
      const { lat, lng } = geo;
      const response = await queryReverseGeocode(locationClient, lat, lng);

      if (response != null) {
        const { display_name, address } = response;
        addressMap[geoString] = {
          address: display_name,
          ...address,
        };
      }
    })
  );
  return addressMap;
}

function retrieveLocations() {
  const result = [];
  for (const { lat, lng } of locations) {
    result.push({ lat, lng });
  }
  return result;
}

main(retrieveLocations()).then((data) => {
  fs.writeFileSync("./locationGeo.json", JSON.stringify(data));
});
