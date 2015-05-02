var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(
    function(username, password, done) {
	 User.findOne({ alias: username }, function(err, user) {
		 if (err) { return done(err); }
		 if (!user) {
			 return done(null, false, { message: 'Incorrect username.' });
		 }
		 bcrypt.compare(password, user.pwd, function(err, res) {
			 if (err || !res) {
				 return done(null, false, {
					 message: 'Invalid Password'
				 });
			 } else {
				 return done(null,user);
			 }
		 });
	 });
	})
);

module.exports = {
    http: {
        customMiddleware: function(app) {
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};
