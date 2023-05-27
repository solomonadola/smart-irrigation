const fs = require("fs");

const filename = "combinations4.csv";
const combinations = [];

const col1Range = [12, 25]; // Range for column 1
const col2Range = [40, 70]; // Range for column 2
const col3Range = [50, 75]; // Range for column 3

for (let col1 = col1Range[0]; col1 <= col1Range[1]; col1++) {
  for (let col2 = col2Range[0]; col2 <= col2Range[1]; col2++) {
    for (let col3 = col3Range[0]; col3 <= col3Range[1]; col3++) {
      combinations.push([col1, col2, col3]);
    }
  }
}

const header = "Column 1,Column 2,Column 3\n";
const rows = combinations
  .map((combination) => combination.join(","))
  .join("\n");
const csvContent = header + rows;

fs.writeFile(filename, csvContent, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`CSV file '${filename}' has been generated.`);
  }
});
