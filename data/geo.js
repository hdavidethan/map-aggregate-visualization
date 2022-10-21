const {
  SearchPlaceIndexForPositionCommand,
} = require("@aws-sdk/client-location");

/**
 * Perform reverse geocoding on a latitude and longitude pair
 * @param {double} lat first part of the coordinate pair
 * @param {double} lon second part of the coordinate pair
 * @returns an object containing a display_name field with the human-readable address,
 * and an address object containing the address components in separate fields
 */
exports.queryReverseGeocode = async (locationClient, lat, lon) => {
  try {
    const command = new SearchPlaceIndexForPositionCommand({
      Position: [lon, lat],
      IndexName: "PlaceIndex",
    });
    const res = await locationClient.send(command);

    let place = res.Results[0];
    for (const result of res.Results) {
      if (result?.Place?.Street) {
        place = result.Place;
        break;
      }
    }
    const { Label: display_name, ...address } = place;
    return { display_name, address };
  } catch (err) {
    console.error(err);
    return null;
  }
};
