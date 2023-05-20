const express = require("express");
const app = express();
require("dotenv").config();

// ... other middleware code ...
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// imporitng local routes
const mccRouter = require("./src/app/routes/microcontrollersRoute");

// Mount the reading under the '/api/read' prefix
app.use("/api/microcontrollers", mccRouter);
// ... other middleware and server setup code ...

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
