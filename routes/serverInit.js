var db = require("../models");

function createPlanet(dbSolarSystem, dbStar) {
    var planet = new db.Planet
    planet.setCoordLoc()
    planet.setDistanceFromStar(planet.coordLoc)
    planet.setPlanetTemp(planet.distanceFromStar, dbStar.temp)
    planet.setPlanetType(planet.planetTemp)
    db.Planet.create(planet)
        .then(function (dbPlanet) {
            console.log(dbPlanet)
            return db.SolarSystem.findOneAndUpdate({ '_id': dbSolarSystem._id }, { '$push': { planets: dbPlanet._id } }, { new: true })
        })
}




module.exports = function (app) {

    app.post("/api/createGalaxy/:numberOfSystems/:sizeOfGalaxy", function (req, res) {
        var numberOfSystems = parseInt(req.params.numberOfSystems)
        var sizeOfGalaxy = parseFloat(req.params.sizeOfGalaxy)
        for (var i = 0; i < numberOfSystems; i++) {
            var solarSystem = new db.SolarSystem
            solarSystem.setCoord(sizeOfGalaxy)
            solarSystem.setNumOfPlanets()
            solarSystem.setDistanceFromOrigin(solarSystem.coord)
            db.SolarSystem.create(solarSystem).then(function(dbSolarSystem){
                var star = new db.Star
                star.setStarType()
                star.setSpectralType(star.starType)
                star.setLuminosity(star.starType)
                star.setMass(star.starType)
                star.setTemp(star.starType)
                db.Star.create(star).then(function(dbStar){
                    console.log(dbStar)
                    for (var j = 0; j < dbSolarSystem.numOfPlanets; j++) { createPlanet(dbSolarSystem, dbStar) }
                    return db.SolarSystem.findOneAndUpdate({ '_id': dbSolarSystem._id }, { '$set': { star: dbStar._id } }, { new: true })
                    
                }).then(function(){
                    res.json(dbSolarSystem)
                })
            })

}
    })
}