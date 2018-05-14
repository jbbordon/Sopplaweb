
const config   = require('./config');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// UAV Schema definition
const UAVSchema = new Schema ({
	name : { type: String, index: { unique: true, dropDups: true } },
	type : { type: String, enum: config.uavTypes }, // UAV type: atlante, neuron...	
	motionModel : {
		model : { type: String, enum: config.uavMotionModels }, // UAV motion model ej: jsbsim, runge_kutta...
		at : Number	// control signal time
	},			
	sensor : [ // array from 1 to n sensors
		{
			name :  String,
			type : { type: String, enum: config.uavSensors },  // sensor type ej: radar, óptico, ir...
			control_at : Number, // control signal time
			capture_at : Number,  // capture signal time
			init_state : {
				elevation : { type: Number, min: 0, max: 90 },
				azimuth   : { type: Number, min: 0, max: 360 }, 
				params    : [ Number ] // 1 to n control parameter values 
			}
		},
	],
	init_time  : Number, // seconds since start of mission
	init_state : {
		latitude         : { type: Number, min: -90,  max: +90 },
		longitude        : { type: Number, min: -180, max: +180 },
		elevation        : Number, // meters
		heading          : { type: Number, min: 0, max: 360 },
		yaw              : { type: Number, min: 0, max: 180 },
		speed            : Number, // m/s
	},
	flight_time : Number, // seconds since init_time
	final_state : {
		latitude         : { type: Number, min: -90,  max: +90 },
		longitude        : { type: Number, min: -180, max: +180 },
		elevation        : Number, // meters
		heading          : { type: Number, min: 0, max: 360 },
		speed            : Number, // m/s
	},
});
		
module.exports = mongoose.model('UAV', UAVSchema);	