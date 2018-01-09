// 'Require' allows Code sharing between different files in a node environment.
// Requiring the Mongoose library
const mongoose = require('mongoose');

// The "before" hook is only done once during runtime.
before((done) => {
    // Point and connect to the mongodb instance on our local machine, to the users_test database
    // Then look at event handlers for Mongoose connection.
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

// This is a "Hook", and it'll run before each test is invoked
// We include "done" to tell Mocha to wait for this process to finish up before running
// the next test.
beforeEach((done) => {
    // Drop all records in users collection.
    mongoose.connection.collections.user.drop(() => {
        // Ready to run the next test!
        done();
    });
});