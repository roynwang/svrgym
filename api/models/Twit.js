module.exports = {
    attributes: {
        text: {
            type: 'string',
            required: 'true'
        },
        author: {
            model: 'timeline',
        },
        imgs: {
            type: "array"
        },
        rel: {
            collection: 'timeline',
            via: 'history'
        }
    },
    beforeCreate: function(values, next) {
        console.log(values);
        next();
    },


    //after save the twit, it shoule be pushed to all follower's history
    //and recent pool
    afterCreate: function(item, cb) {
        var pushtofollower = function(alias, item) {
                Timeline.findOne({
                    alias: alias
                }).exec(function(err, tl) {
                    //1. push to recent
                    tl.recent.push(item);
                    //2. push to history
                    tl.history.add(item.id);
                    tl.save(console.log);
                });
            }
            //0. get all follower
        User.findOne(item.author).populate("follower").exec(function(err, user) {
            user.follower.forEach(function(fan) {
                console.log("push twit to " + fan.alias);
                pushtofollower(fan.alias, item);
            });
            cb();
        });
    }
}
