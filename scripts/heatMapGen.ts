import * as fs from "fs";

function generateHeatMap(): number[][] {
  const MAP_SIZE = 20;

  const result: number[][] = [];
  for (let i = 0; i < MAP_SIZE; i++) {
    const row: number[] = [];
    for (let j = 0; j < MAP_SIZE; j++) {
      const value = Math.random();
      row.push(value);
    }
    result.push(row);
  }
  return result;
}

function writeToFile(): void {
  fs.writeFileSync("heatmap.json", JSON.stringify(generateHeatMap()));
}

writeToFile();
