const assert = require('assert');
const User = require('../src/user');

describe('Validating Records', () => {
	
	it('Requires a user name', () => {
		const user = new User({ name: undefined });

		// Validate Sync validates the data, and immediately syncs the
		// result. If we want to do some asynchronously, we just use the validate
		// function.
		const validationResult = user.validateSync();

		// Get access to the message within the validation error result.
		// This syntax below is smart enough to pull the "message" property from the error
		// response, and add that to a variable of the same name.
		const { message }  = validationResult.errors.name;
		assert(message === 'Name is required.');
	});

	it('Requires a user name longer than 2 characters', () => {
		const user = new User({ name: 'Al' });
		const validationResult = user.validateSync()
		const { message } = validationResult.errors.name;
		assert(message === 'Name must be longer than 2 characters.');
	});

	it('Disallows invalid records from being saved', (done) => {
		const user = new User({ name: 'Al' });
		user.save()
			.catch((validationResult) => {
				const { message } = validationResult.errors.name;

				assert(message === 'Name must be longer than 2 characters.');
				done();
			});
	});

});