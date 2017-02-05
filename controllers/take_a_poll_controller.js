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
    });
};

exports.updatePoll = function(req,res,next) {
    const receivedPoll = req.body;
    Poll.findOneAndUpdate({_id:receivedPoll._id},receivedPoll,function(err,poll){
        if(err) {
            return next(err);
        }
        res.json({"status":"OK"});
    });
};

exports.getAllPollsByUser = function(req, res, next) {
    Poll.find({"createdBy":req.params.userId}, function(err, polls){
        if(err){
            return next(err);
        }
        res.json(polls);
    });
};

exports.getPollById = function(req, res, next) {
    Poll.findOne({_id:req.params.id},function(err, poll) {
        if(err) {
            return next(err);
        }
        res.json(poll);
    });
};