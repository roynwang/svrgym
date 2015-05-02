/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

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
	toJSON: function() {
      var obj = this.toObject();
	  console.log("...............toJSON............");
      delete obj.pwd;
      return obj;
   }
  },

  beforeCreate: function(values, next) {

	values['follower'] = [];
	//values['following'] = [];
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(values.pwd, salt, function(err, hash) {
        if (err) return next(err);

        values.pwd = hash;
        next();
      });
    });
  },

  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.pwd, function(err, match) {
      if (err) cb(err);

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
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

