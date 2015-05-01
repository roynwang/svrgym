module.exports = {
	attributes: {
		text: {
			type: 'string',
			required: 'true'
		},
		author: {
			model: 'timeline',
		}
	}
}
