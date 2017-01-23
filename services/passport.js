const passport = require("passport");
const TwitterTokenStrategy = require('passport-twitter-token');
const twitterOptions = {
    consumerKey: "BaHsxCPOU2zjwJO5FT1jtVO6X",
    consumerSecret: "bMse9oi7IBiuxTuIvBISHMI2MK2ZYl4a05vemL1zFct4xy0b1A"
    };

const authenticateUser = new TwitterTokenStrategy(twitterOptions, function(token, tokenSecret, profile, done) {
        if(profile) {
           done(null, profile);
        } else {
           done(null, false);
        }
    });

passport.use(authenticateUser);