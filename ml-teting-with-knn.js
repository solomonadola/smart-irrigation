const fs = require("fs");
const csv = require("csv-parser");
const KNNRegression = require("ml-knn");

const features = [];
const labels = [];

// Load the dataset from CSV file
fs.createReadStream("dataset.csv")
  .pipe(csv())
  .on("data", (row) => {
    // Process each row of the CSV data
    const moisture = parseFloat(row.moisture);
    const temperature = parseFloat(row.temperature);
    const humidity = parseFloat(row.humidity);
    const label = parseFloat(row.label);

    // Add the values to the features and labels arrays
    features.push([moisture, temperature, humidity]);
    labels.push(label);
  })
  .on("end", () => {
    // Create and train the kNN regression model
    const k = 5; // Number of nearest neighbors to consider
    const knnModel = new KNNRegression(features, labels, { k });

    // Predict new data
    const newData = [
      [0.35, 25, 60],
      [0.28, 24, 58],
      [0.45, 26, 62],
      [0.33, 26, 58],
    ];
    const predictions = newData.map((data) => knnModel.predict(data));

    // Output the predictions
    console.log("Predictions:");
    predictions.forEach((prediction, index) => {
      console.log(`Data ${index + 1}: ${prediction}`);
    });
  });
