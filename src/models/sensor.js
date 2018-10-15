const config   = require('./config');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Sensor Schema definition
const SensorSchema = new Schema ({
	name :  String,
	type : { type: String, enum: config.uavSensors },  // sensor type ej: radar, óptico, ir...
	controlAt : Number, // control signal time
	captureAt : Number,  // capture signal time
	initState : {
		elevation : { type: Number, min: 0, max: 90 },
		azimuth   : { type: Number, min: 0, max: 360 },
		params    : [ Number ] // 1 to n control parameter values
	}
});

module.exports = mongoose.model('Sensor', SensorSchema);
