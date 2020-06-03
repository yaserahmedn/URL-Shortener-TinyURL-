const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
	original_url: String,
	tiny_url: String,
	time : { type : Date, default: Date.now }
});

const DataModel= mongoose.model('data', DataSchema);

module.exports= DataModel;