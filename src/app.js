require("dotenv").config();

const express = require("express");

const config = require("./config/config");
const logger = require("./middleware/logger");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: `${config.appName} is running`,
        environment: config.environment
    });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        data: null
    });
});

app.listen(config.port, () => {
    console.log(`${config.appName} running on port ${config.port}`);
});