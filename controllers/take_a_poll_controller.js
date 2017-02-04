const Poll = require("../models/poll");

exports.create = function(req,res,next){
    const receivedPoll = req.body;
    const poll = new Poll(receivedPoll);
    
    poll.save(function(err){
        if(err) { 
            return next(err);
        }
        res.json({"status":"OK"});
    });
}