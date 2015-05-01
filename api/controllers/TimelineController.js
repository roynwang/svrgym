/**
 * TimelineController
 *
 * @description :: Server-side logic for managing timelines
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	newtwit: function(req, res){
				 var savetorecent = function(user, tw){
						user.recent.push(tw);
						user.save(function(err, msg){
							if(err){
								res.json({stat:"failed", error:err});
							}
							else{
								res.json({stat:'success', tw:tw});
							}
						});
				 };
				 usr = req.param('user');
				 Timeline.findOne({alias:usr})
					 .exec(function(err, user){
						 if(err){
							 res.json({error:err});
						 }
						 if(user === undefined){
							 res.notFound();	
						 }
						 else {
							 //push the twit to db
							 //
							Twit.create({text:req.param('text'), author: user.id})
								.exec(function(err,twit){
									if(err){
										res.json({stat:"failed", error:err});
									}
									else{
										savetorecent(user, twit);
									}
								});
						}
					 });
			 },
	getrecent: function(req, res){
				   usr = req.param('user');
				   Timeline.find({alias:usr})
					   .populate('history')
					   .exec(function(err, user){
						   if(err){
							   res.json({error:err});
						   }
						   if(user === undefined){
							   res.notFound();	
						   }
						   else {
							   res.json(user);
						   }
					   });
			   }
};

