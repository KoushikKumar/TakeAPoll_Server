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
};

exports.getAll = function(req,res,next) {
    Poll.find({}, function(err, polls) {
        if(err){
            return next(err);
        }
        res.json(polls);
    });
};

exports.deleteById = function(req,res,next) {
    Poll.findOneAndRemove({_id:req.params.id}, function(err){
            if(err){
                return next(err);
            }
            res.json({"status":"OK"});
    })
}