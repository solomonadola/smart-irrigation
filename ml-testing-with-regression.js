const fs = require("fs");
const csv = require("csv-parser");
const tf = require("@tensorflow/tfjs");

async function run() {
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
      // Calculate mean and standard deviation
      const featureMeans = features.reduce(
        (acc, curr) => acc.map((v, i) => v + curr[i]),
        Array(3).fill(0)
      );
      featureMeans.forEach((sum, i) => {
        featureMeans[i] = sum / features.length;
      });

      const featureStdevs = features.reduce(
        (acc, curr) =>
          acc.map((v, i) => v + Math.pow(curr[i] - featureMeans[i], 2)),
        Array(3).fill(0)
      );
      featureStdevs.forEach((sum, i) => {
        featureStdevs[i] = Math.sqrt(sum / (features.length - 1));
      });

      // Normalize the features
      const normalizedFeatures = features.map((feature) =>
        feature.map((value, i) => (value - featureMeans[i]) / featureStdevs[i])
      );

      // Convert features and labels arrays to TensorFlow tensors
      const x = tf.tensor2d(normalizedFeatures);
      const y = tf.tensor1d(labels);

      // Create and train the linear regression model
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [3] }));
      const optimizer = tf.train.sgd(0.1); // Adjust the learning rate as needed
      model.compile({ loss: "meanSquaredError", optimizer });
      model.fit(x, y, { epochs: 230 });

      // Predict new data
      const newData = tf.tensor2d([
        [0.33, 26, 58],
        [0.4, 24, 59],
        [0.27, 25, 57],
      ]);
      const normalizedNewData = newData
        .sub(tf.tensor(featureMeans).expandDims(0))
        .div(tf.tensor(featureStdevs).expandDims(0));
      const predictions = model.predict(normalizedNewData);

      // Convert TensorFlow tensor to JavaScript array
      const predictionsArray = Array.from(predictions.dataSync());

      // Output the predictions
      console.log("Predictions:");
      predictionsArray.forEach((prediction, index) => {
        console.log(`Data ${index + 1}: ${prediction}`);
      });
    });
}

run().catch(console.error);
