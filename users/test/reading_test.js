const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let tom;

    beforeEach((done) => {
    	// When the model instance is created, mongoose sets the db id for the 
    	// instance, even before it's saved to the database. Mongoose is assuming that
    	// // it's good enough to create a unique identifier.
        tom = new User({ name: 'Tom' });
        tom.save()
            .then(() => done());
    });

    it('Finds all users with a name of Tom', (done) => {
        // Remember to use the actual model class, and not the instance.         	
        User.find({ name: 'Tom' })
            .then((users) => {            
            	/* 
            		Verify that the user in the db has the same unique id of 
            		the models instance. 
            		This will FAIL, because the Object ID that wraps the object's id in MongoDB
            		is different. The object ID is doing some encapsulation on it's end, and
            		these 2 id's will not match. Don't ever compare ._id's directly!!! Instead compare their
            		strings.
            		asset(users[0]._id === joe._id);
            	*/ 
            	assert(users[0]._id.toString() === tom._id.toString());
            	done();
            })
            .catch((error) => {
            	console.log(error);
            	done();
            });
    });

    it ('Find a user with a specific id', (done) => {
    	User.findOne( { _id: tom._id })
    		.then((user) => {
    			assert(user.name === 'Tom');
    			done();
    		})    	
    })
});