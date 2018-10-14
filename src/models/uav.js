
const config   = require('./config');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// UAV Schema definition
const UAVSchema = new Schema ({
	name : { type: String, index: { unique: true, dropDups: true } },
	type : { type: String, enum: config.uavTypes }, // UAV type: atlante, neuron...
	motionModel : {
		type : { type: String, enum: config.uavMotionModels }, // UAV motion model ej: jsbsim, runge_kutta...
		at : Number	// control signal time
	},
	sensor : [ // array from 1 to n sensors
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }
	],
	initTime  : Number, // seconds since start of mission
	initState : {
		latitude         : { type: Number, min: -90,  max: +90 },
		longitude        : { type: Number, min: -180, max: +180 },
		elevation        : Number, // meters
		heading          : { type: Number, min: 0, max: 360 },
		yaw              : { type: Number, min: 0, max: 180 },
		speed            : Number, // m/s
	},
	flightTime : Number, // seconds since initTime
	finalState : {
		latitude         : { type: Number, min: -90,  max: +90 },
		longitude        : { type: Number, min: -180, max: +180 },
		elevation        : Number, // meters
		heading          : { type: Number, min: 0, max: 360 },
		speed            : Number, // m/s
	},
});

module.exports = mongoose.model('UAV', UAVSchema);
