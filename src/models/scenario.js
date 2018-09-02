
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Scenario Schema definition
const ScenarioSchema = new Schema ({
	name   : { type: String, index: { unique: true, dropDups: true } },
	zone   : {
		latitude 	 : { type: Number, min: -90,  max: +90 },
		longitude 	 : { type: Number, min: -180, max: +180 },
		xWidth 	 : Number, // meters
		yHeight 	 : Number, // meters
		areaBearing : { type: Number, min: 0, max: 360 },
		xCells 	 : Number,
		yCells 	 : Number,
	},
	targets : [  // from 1 to n targets
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Target' }
	],
	uavs    : [  // from 1 to n UAVs
		{ type: mongoose.Schema.Types.ObjectId, ref: 'UAV' }
	],
	environment : {
		type: mongoose.Schema.Types.ObjectId, ref: 'Environment'
	},
	request : {
		type: mongoose.Schema.Types.ObjectId, ref: 'Request'
	}
},
{ minimize: false });

// Scenario model export
module.exports = mongoose.model('Scenario', ScenarioSchema);
