const passportService = require("./services/passport");
const passport = require("passport");
const TakeAPollController = require("./controllers/take_a_poll_controller");
const IpAddressController = require("./controllers/ip_address_controller");
const twitterAPI = require('node-twitter-api');


module.exports = function(app) {
    
    var _requestSecret;
    var _oauth_token;
    var _oauth_token_secret;
    var _user_id;
    
    const twitter = new twitterAPI({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callback: process.env.TWITTER_CALLBACK
    });
    
    app.get('/',function(req,res){
       res.sendFile(process.cwd()+'/sample.html'); 
    });
    
    app.get('/generate-token', function(req, res, next){
        twitter.getRequestToken(function(err, requestToken, requestSecret) {
            if (err){
                next(err);
            } else {
                _requestSecret = requestSecret;
                res.redirect(process.env.TWITTER_AUTHENTICATE_URI + requestToken);
            }
        });
    });
    
    app.get('/get-access-token-callback', function(req, res, next) {
        var requestToken = req.query.oauth_token,
        verifier = req.query.oauth_verifier;

        twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
            if (err){
                next(err);
            } else {
                twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                    if (err){
                        next(err);
                    } else {
                       _oauth_token = accessToken;
                       _oauth_token_secret = accessSecret;
                       _user_id = user.id;
                       res.sendFile(process.cwd()+'/close.html');
                    }
                });
            }
        });
    });
    
    app.get('/get-oauth-token', function(req, res, next) {
       var timer = setInterval(function(){
           if(_oauth_token && _oauth_token_secret && _user_id) {
               clearInterval(timer);
               res.json({oauth_token:_oauth_token, oauth_token_secret:_oauth_token_secret, user_id: _user_id});
               _oauth_token = null;
               _oauth_token_secret = null;
               _user_id = null;
               res.end();
           }
       }, 100);
    });
    
    app.post('/test-authorization', passport.authenticate('twitter-token',{session:false}), function (req, res) {
        res.json({is_authorized:true});
    });
    
    app.get('/get-ip-address', IpAddressController.getIpAddress);
    
    app.post('/create',TakeAPollController.create);
    
    app.get('/getall', TakeAPollController.getAll);
    
    app.delete('/delete/:id', TakeAPollController.deleteById);
    
    app.post('/updatepoll', TakeAPollController.updatePoll);
    
    app.get('/getall/user/:userId', TakeAPollController.getAllPollsByUser);
    
    app.get('/get/poll/:id', TakeAPollController.getPollById);
};