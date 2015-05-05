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
            type: 'string',
            url: true,
            array: true,
            defautsTo: []
        },
        badge: {
            type: 'string',
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
            via: 'id'
        }
    }
};
