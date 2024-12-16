const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const carsRoute = require("./routes/cars");
const customersRoute = require("./routes/customers");
const salesRoute = require("./routes/sales");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route Endpoints
app.use("/api/cars", carsRoute);
app.use("/api/customers", customersRoute);
app.use("/api/sales", salesRoute);

// Start Server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
