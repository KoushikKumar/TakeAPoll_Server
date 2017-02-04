const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    question:String,
    options:[{option:String, votes:Number}],
    submittedIpAddressesAndOptions: Schema.Types.Mixed,
    submittedUserIdsAndOptions:Schema.Types.Mixed,
    createdBy:String
});

const ModelClass = mongoose.model('poll',pollSchema);
module.exports = ModelClass;