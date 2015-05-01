/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
	alias: {
		type:'string',
		required: true,
		primaryKey: true
	},
	pwd: {
		type: 'string',
		required: true
	},
	follower: {
		collection: 'user',
		via: 'alias'
	},
  },
  beforeCreate: function(item, cb){
	item['follower'] = [];
	item['following'] = [];
	cb();
  },
  afterCreate: function(item, cb){
		var inittimeline = function() {
			//2. create a timeline for user
			Timeline.create({alias:item.alias, recent:[], history:[]})
				.exec(function(err,tt){
					if(err)return cb(err);
					User.find({alias:item.alias}).populate('follower').exec(console.log);
					cb();
				});
		};
		//1. push itself to follower and following
		User.findOne(item.alias).exec(function(err,usr){
			usr.follower.add(item.alias);
			//usr.following.add(item.alias);
			usr.save(function(err, msg){
				if(err){
					cb(err);
				}
				else{
					inittimeline();
				}
			});
		});
	}
};

