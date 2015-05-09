/**
 * TimelineController
 *
 * @description :: Server-side logic for managing timelines
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    newtwit: function(req, res) {
        //usr = req.user;
		var alias = req.param('id');
		console.log("createing tw for " + alias);
        var savetorecent = function(user, tw) {
            user.recent.push(tw);
            user.save(function(err, msg) {
                if (err) {
                    res.json({
                        stat: "failed",
                        error: err
                    });
                } else {
                    res.json({
                        stat: 'success',
                        tw: tw
                    });
                }
            });
        };
        Timeline.findOne({
                alias: alias
            })
            .exec(function(err, user) {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                if (user === undefined) {
                    res.notFound();
                } else {
					
                    //push the twit to db
                    //
                    Twit.create({
                            text: req.param('text'),
                            author: user.alias
                        })
                        .exec(function(err, twit) {
                            if (err) {
                                res.json({
                                    stat: "failed",
                                    error: err
                                });
                            } else {
                                res.json({
                                    stat: 'success',
                                    tw: twit
                                });
                            }
                        });
                }
            });
    },
    getrecent: function(req, res) {
        usr = req.user;
		alias = req.param('id');
		page = req.param('page');
		var timequery = 
        Timeline.findOne({
                alias: alias
            });
		if(page == 0){
			res.json(timequery.recent);
		}
		else{
            timequery.populate('history')
            .exec(function(err, user) {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                if (user === undefined) {
                    res.notFound();
                } else {
                    res.json(user.history);
                }
            });
		}
    }
};
