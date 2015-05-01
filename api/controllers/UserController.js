/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
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

