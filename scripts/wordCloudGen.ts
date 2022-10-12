import * as fs from "fs";

interface Payload {
  content_type: string;
  content_value: number;
}

function generateWordCloud(): Payload[] {
  const result: Payload[] = [];
  const words = ["cool", "awesome", "wow", "fun", "amazing", "rad"];
  for (const word of words) {
    const randomNumber = Math.floor(Math.random() * 20);
    result.push({
      content_type: `trends: ${word}`,
      content_value: randomNumber,
    });
  }
  return result;
}

function writeToFile(): void {
  fs.writeFileSync("wordcloud.json", JSON.stringify(generateWordCloud()));
}

writeToFile();
