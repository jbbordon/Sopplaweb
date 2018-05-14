
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EnvironmentSchema = new Schema ({
	nfzs : [ // from 1 to N
		{
			latitude     : { type: Number, min: -90,  max: +90 },
			longitude    : { type: Number, min: -180, max: +180 },
			x_width      : Number, // meters
			y_height     : Number, // meters
			area_bearing : { type: Number, min: 0, max: 360 }		
		}
	],
	wind : {
		speed     : Number, // m/s
		direction : { type: Number, min: 0, max: 360 }
	}
});

module.exports = mongoose.model('Environment', EnvironmentSchema);