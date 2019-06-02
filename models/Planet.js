var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var PlanetSchema = new Schema({
    coordLoc: [],
    distanceFromStar: {type: Number},
    planetTemp: {type:Number},
    planetType: {type: String}
})

PlanetSchema.methods.setCoordLoc = function(){
    this.coordLoc = Array.from({length: 3}, () =>Math.pow(Math.random() * 3 - 1.5, 5 ))
    return this.coordLoc
}

PlanetSchema.methods.setPlanetTemp = function(distanceFromStar, starTemp) {
    this.planetTemp = starTemp / distanceFromStar
    return this.planetTemp
}

PlanetSchema.methods.setDistanceFromStar = function(coordLoc){
    this.distanceFromStar = Math.sqrt((Math.pow(coordLoc[0], 2) + Math.pow(coordLoc[1], 2) + Math.pow(coordLoc[2] , 2 ) ))
    return this.distanceFromOrigin
}

PlanetSchema.methods.setPlanetType = function(planetTemp){
    if(planetTemp > 2) {this.planetType = "Terran Volcanic"}
    else if (planetTemp > 1.1) {this.planetType = "Terran Dessert"}
    else if (planetTemp > .90) {this.planetType = "Terran Water"}
    else if (planetTemp > .75) {this.planetType = "Terran Ice"}
    else if (planetTemp > .15) {this.planetType = "Gas Giant"}
    else {this.planetType = "Heavy Gas Giant"}

}

var Planet = mongoose.model("Planet", PlanetSchema)

module.exports = Planet