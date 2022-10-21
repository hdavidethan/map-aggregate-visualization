const locationGeos = require("./locationGeo.json");
const {
  DynamoDBClient,
  BatchWriteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const { v4: uuidv4 } = require("uuid");

function transformLocationData(location, data) {
  const { lat, lng } = JSON.parse(location);
  const result = {
    id: { S: uuidv4() },
    address: { S: JSON.stringify(data.Place) },
    addressLabel: { S: data.Place.Label },
    lat: { N: String(lat) },
    lng: { N: String(lng) },
    url: {
      S: "https://ioq3wrfdhl.execute-api.us-east-2.amazonaws.com/default",
    },
  };
  return result;
}

async function sendToDynamoDB(items) {
  const config = {
    region: "us-east-2",
    // endpoint: "https://geo.us-east-2.amazonaws.com/",
    credentials: fromIni({ profile: "default" }),
  };
  const client = new DynamoDBClient(config);

  const input = {
    RequestItems: {
      "parking-histogram": items.map((item) => {
        return {
          PutRequest: {
            Item: item,
          },
        };
      }),
    },
  };
  // console.log(JSON.stringify(input));
  const command = new BatchWriteItemCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(err);
  }
}

function main() {
  let items = [];
  for (const location in locationGeos) {
    const data = transformLocationData(location, locationGeos[location]);
    items.push(data);
    if (items.length === 25) {
      sendToDynamoDB(items).then((res) => console.log(res));
      items = [];
    }
  }
  if (items.length > 0) {
    sendToDynamoDB(items).then((res) => console.log(res));
  }
}

main();
