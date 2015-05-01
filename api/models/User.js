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
		required: true
	},
	pwd: {
		type: 'string',
		required: true
	},
	follower: {
		collection: 'user',
	},
	following: {
		collection: 'user',
	},
  },
  afterCreate: function(item, cb){
	Timeline.create({alias:item.alias, recent:[], history:[]})
		.exec(function(err,tt){
			if(err)
				return cb(err);
			console.log("created " + item.alias);
			cb();
		});
  }
};

