exports.getIpAddress = function(req,res,next){
    const ipAddress = req.headers['x-forwarded-for'];
    const ipAddressByHyphen = ipAddress.split('.').join('_');
    res.json({"ipAddress":ipAddressByHyphen});
};