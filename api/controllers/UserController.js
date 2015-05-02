/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require("passport");
var jwt = require('jsonwebtoken');
var secret = 'ewfn09qu43f09qfj94qf*&H#(R';

module.exports = {
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                res.send({
                    success: false,
                    message: 'invalidPassword'
                });
                return;
            }else{
                if (err) {
                    res.send({
                        success: false,
                        message: 'unknownError',
                        error: err
                    });
                } else {
					var signusr = {
						alias: user.alias
					};
                    var token = jwt.sign(signusr, secret, { expiresInMinutes: 60*24 });
                    res.send({
                        success: true,
                        user: signusr,
                        token: token
                    });
                }
            }
        })(req, res);
    },
	follow: function(req, res){
		var usr = req.param('user');
		var tar = req.param("follow");
		console.log(usr + " follow " + tar);
		User.findOne(tar).exec(function(err, tuser){
			console.log("save follower ... " + tar);
			tuser.follower.add(usr);
			tuser.save(function(err, msg){
				if(err){
					res.json({stat:"add follower failed", error:err});
				}
				else{
					res.json(tuser);
				}
			});
		});
	}
};

