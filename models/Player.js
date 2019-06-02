var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    playerName: {type: String},
    currentLocation: {type: Schema.Types.ObjectId, ref: "Location" },
    ship: {type: Schema.Types.ObjectId, ref: "Ship"},
    currency: {type: Number}
})

PlayerSchema.methods.setPlayerName = function(playerName) {
    this.playerName = playerName
    return this.playerName
}

var Player = mongoose.model("Player", PlayerSchema)

module.exports = Player