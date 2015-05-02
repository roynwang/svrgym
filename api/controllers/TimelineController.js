/**
 * TimelineController
 *
 * @description :: Server-side logic for managing timelines
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	newtwit: function(req, res){
				 usr = req.user;
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
				 Timeline.findOne({alias:usr.alias})
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
							Twit.create({text:req.param('text'), author: user.alias})
								.exec(function(err,twit){
									if(err){
										res.json({stat:"failed", error:err});
									}
									else{
										res.json({stat:'success', tw:twit});
									}
								});
						}
					 });
			 },
	getrecent: function(req, res){
				   usr = req.user;
				   Timeline.findOne({alias:usr.alias})
					   .populate('history')
					   .exec(function(err, user){
						   if(err){
							   res.json({error:err});
						   }
						   if(user === undefined){
							   res.notFound();	
						   }
						   else {
							   res.json(user.history);
						   }
					   });
			   }
};

