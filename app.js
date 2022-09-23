
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
app.use(cookieParser());

const moviesRouter = require("./movies");

app.use("/movies", moviesRouter);

// app.use((err, req, res, next) => { 
//     if(err) {
//         res.send("server error")
//     }
//     next();
//  })

// app.use((req, res, next) => {
//     res.send("Not Found")
//     next();
// })

app.listen(3000);

