/**
 * TimelineController
 *
 * @description :: Server-side logic for managing timelines
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	newtwit: function(req, res){
				 var savetorecent = function(tw, cb){
						return Twit.create(tw)
							   .exec(cb);
				 }
				 var savetohistory = function(timeline, tw){
					timeline.history.push(tw.id);
					timeline.save();
				 }
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
							Twit.create({text:req.param('text')})
								.exec(function(err, twit){
									if(err){
										res.json({stat:"failed", error:err});
									}
									else
									{
										user.recent.push(twit);
										user.save(function(err, msg){
											if(err){
												res.json({stat:"failed", error:err});
											}
											else{
												res.json({stat:"passed", added:twit});
											}
										});
									}
								});
						}
					 });
			 },
	getrecent: function(req, res){
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
							   res.json(user.recent);
						   }
					   });
			   }
};

