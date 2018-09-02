
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EnvironmentSchema = new Schema ({
	name : { type: String, required : true },
	nfzs : [ // from 1 to N
		{
			latitude     : { type: Number, min: -90,  max: +90 },
			longitude    : { type: Number, min: -180, max: +180 },
			xWidth      : Number, // meters
			yHeight     : Number, // meters
			areaBearing : { type: Number, min: 0, max: 360 }
		}
	],
	wind : {
		speed     : Number, // m/s
		direction : { type: Number, min: 0, max: 360 }
	}
});

module.exports = mongoose.model('Environment', EnvironmentSchema);
