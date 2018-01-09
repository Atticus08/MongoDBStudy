const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let tom;

	// Set up test by creating a user in database.
	beforeEach((done) => {
        tom = new User({ name: 'Tom', postCount: 0 });
        tom.save()
            .then(() => done());
    });

	/**
	 * Helper method for testing to make sure name was updated in database.  
	 * @param  operation   operation
	 * @param  callback    done      callback method
	 */
    function assertName(operation, done) {
    	operation
    		.then(() => User.find({}))
    		.then((users) => {
    			assert(users.length === 1);
    			assert(users[0].name === 'Fritz');
    			done();    			
    		});
    }

	// Test updating the user instance through set 'n' save methods.
    it('Model instance using set n save methods', (done) => {
    	tom.set('name', 'Fritz')
    	assertName(tom.save(), done);
    });

    // Test updating a user instance through update method
    it('Model instance using update method', (done) => {    	
    	assertName(tom.update( { name: 'Fritz' }), done);
    });

    // Test updating a user instance through update method
    it('Model Class using update method', (done) => {    	    	
    	assertName(
    		User.update( { name: 'Tom' }, { name: 'Fritz' } ),
    		done);
    });

    it('Model Class using findOneAndUpdate method', (done) => {    	
    	assertName(
    		User.findOneAndUpdate( { name: 'Tom' }, { name: 'Fritz' }),
    		done);
    });

    it('Model Class using findByIdAndupdate Method', (done) => {    	
    	assertName(
    		User.findByIdAndUpdate(tom._id, { name: 'Fritz' }),
    		done);
    });

    it('A user can have their postcount incremented by 1', (done) => {
    	User.update({ name: 'Tom' }, { $inc: { postCount: 1 } })
    		.then(() => User.findOne({ name: 'Tom' }))
    		.then((user) => {
    			assert(user.postCount === 1);
    			done();
    		});
    });
});