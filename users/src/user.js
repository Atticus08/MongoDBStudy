const mongoose = require('mongoose');

// The schema object allows us to create our schema for our user model.
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
    	type: String,
    	validate: {
    		validator: (name) => name.length > 2,
    		message: 'Name must be longer than 2 characters.'
    	},
    	required: [true, 'Name is required.']
    },
    postCount: Number
});

// Mongoose reaches out to MongoDB and asks if it has a "user" collection.
// If not, Mongoose will go ahead and create the collection called "user".
const User = mongoose.model('user', UserSchema);

// If anyone else inside of my node project wants to require user.js file,
// they will automatically get a reference to the user model because of this line.
module.exports = User;