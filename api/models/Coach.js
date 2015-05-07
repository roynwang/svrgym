/**
 * Coach.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        avatar: {
            type: 'string',
            url: true,
            defaultsTo: ""
        },
        description: {
            type: 'string',
            defautsTo: "DESC NOT IMPLEMENT"
        },
        pic: {
            array: true,
            defautsTo: []
        },
        badge: {
            array: true,
            defaultsTo: []
        },
        courses: {
            collection: 'course',
            via: 'id',
            defaultsTo: []
        },
        gym: {
            model: 'gym',
            via: 'id',
            required: true
        }
    },
    afterCreate: function(values, next) {
        Gym.findOne(values['gym']).exec(function(err, gym) {
            if (err) {
                next(err);
            }
            if (!gym) {
                next("cannot find the gym " + values['gym']);
            } else {
                if (gym.coaches == undefined) {
                    gym.coaches = [];
                }
                gym.coaches.add(values['id']);
                gym.save(function(err, msg) {
                    if (err) {
                        next(err);
                    } else {
                        next()
                    }
                });
            }
        });
    }
}
