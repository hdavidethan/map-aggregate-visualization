import * as fs from "fs";

interface Payload {
  contentType: string;
  contentValue: number;
}

function generateWordCloud(): Payload[] {
  const result: Payload[] = [];
  const words = ["cool", "awesome", "wow", "fun", "amazing", "rad"];
  for (const word of words) {
    const randomNumber = Math.floor(Math.random() * 20);
    result.push({
      contentType: `trends: ${word}`,
      contentValue: randomNumber,
    });
  }
  return result;
}

function writeToFile(): void {
  fs.writeFileSync("wordcloud.json", JSON.stringify(generateWordCloud()));
}

writeToFile();
