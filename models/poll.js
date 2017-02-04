const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    question:String,
    options:[{option:String, votes:Number}],
    submittedIpAddressesAndOptions: {},
    submittedUserIdsAndOptions:{},
    createdBy:String
}, { minimize: false });

const ModelClass = mongoose.model('poll',pollSchema);
module.exports = ModelClass;