const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model what the collection will contain. i.e. add a name property, etc.
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

//Create new collection called users in MongoDB!
mongoose.model('users', userSchema);
