const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let tom;

    beforeEach((done) => {
        tom = new User({ name: 'Tom' });
        tom.save()
            .then(() => done());
    });

    // Remove the model instance from the database.
    it('Model Instance remove', (done) => {
        tom.remove()
            .then(() => User.findOne({ name: 'Tom' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    // Remove all records with some given criteria.
    it('Model Class remove', (done) => {
        User.remove()
            .then(() => User.findOne({ name: 'Tom' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Model Class findOneAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Tom' })
            .then(() => User.findOne({ name: 'Tom' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Model Class findByIdAndRemove', (done) => {
        User.findByIdAndRemove(tom._id)
            .then(() => User.findOne({ name: 'Tom' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});