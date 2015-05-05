/**
 * Gymsvc.js
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
        avator: {
            type: 'string',
            defaultsTo: ""
        },
        price: {
            type: 'integer',
            defaultsTo: 0
        },
		coaches: {
			collection: 'coach',
			via: 'id'
		}
    }
};
