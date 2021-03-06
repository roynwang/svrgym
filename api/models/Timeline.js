/**
 * Timeline.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        alias: {
            type: 'string',
            required: true,
            primaryKey: true
        },
        recent: {
            //collection: 'string',
            type: 'array'
        },
        history: {
            collection: 'twit',
            via: 'rel'
        }
    }
};
