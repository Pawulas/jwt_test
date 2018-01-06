const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// create a schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function(next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Generate password hash
    const passwordHash = await bcrypt.hash(this.password, salt);

    // Assign hashed password to original password
    this.password = passwordHash;
    next();
  } catch(err) {
    next(err);
  }
});

UserSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// create model
const User = mongoose.model('User', UserSchema);

// export model
module.exports = User;