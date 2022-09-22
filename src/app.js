
const express = require('express');
const app = express();
const sampleRoute = require("./router/customer");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

// 
mongoose.connect(process.env.MONGO_URL, {
    
})

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next();
})

app.use("/customer", sampleRoute);
// app.use(express.static("public"));
app.use(cors());
app.options("*", cors());

app.get("/", (req, res, next) => { 
    res.send("nothig")
 })

//  Error 404 message
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "public/404.html", ))
})

// 500 Error message
app.use((err, req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "public/500.html"))
})

app.listen(process.env.PORT || 9000, () => {
    console.log("server running");
})