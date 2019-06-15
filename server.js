var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/galaxy", { useNewUrlParser: true });

/* db.SolarSystem.create({coord: [0,0,0] })
  .then(function(dbSolarSystem) {
    // If saved successfully, print the new SolarSystem document to the console
    console.log(dbSolarSystem);
  })
  .catch(function(err) {
    // If an error occurs, print it to the console
    console.log(err.message);
  }); */

require("./routes/serverInit")(app)
require("./routes/playerInit")(app)

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  