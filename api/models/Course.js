/**
 * Course.js
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
        intensity: {
            type: 'integer',
            max: 5,
            min: 1,
            defaultsTo: 1
        },
        coach: {
            model: 'coach',
            via: 'id'
        },
        pic: {
            type: 'string',
            url: true,
            array: true,
            defautsTo: []
        },
        tag: {
            type: 'string',
            array: true,
            defautsTo: []
        }
    }
};
