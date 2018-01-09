const assert = require('assert');
const User = require('../src/user');

describe('Creating Records', () => {
    // The 'it' function is the key for all testing in Mocha
    // Test creating and saving a user here
    it('saves a user', (done) => {
        const tom = new User({ name: 'Tom' });

        // Save Tom to the Mongo Database
        tom.save()
            .then(() => {
                // Has Tom been saved successfully?
                // Mongoose sets the isNew flag to false when we know the object has
                // been saved to the database.
                assert(!tom.isNew);
                done();
            });
    });
});