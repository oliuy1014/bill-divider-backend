// global variables
require("dotenv").config(); // secret values from .env file
const mongoose = require('mongoose');
const bill_routes = require('./routes/bills');
const buyer_routes = require('./routes/buyers');
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const cors = require('cors');

// initialize express app
const express = require('express');
const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);

// connect to db
mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("connected to mongoDB and listening on port", PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

app.use(express.json());
// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({ hello: "world" });
});

// routes
app.use("/api/bills", bill_routes);

app.use("/api/buyers", buyer_routes);
