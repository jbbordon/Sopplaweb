
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const NFZSchema = new Schema ({
	latitude     : { type: Number, min: -90,  max: +90 },
	longitude    : { type: Number, min: -180, max: +180 },
	xWidth      : Number, // meters
	yHeight     : Number, // meters
	areaBearing : { type: Number, min: 0, max: 360 }
});

module.exports = mongoose.model('NFZ', NFZSchema);
