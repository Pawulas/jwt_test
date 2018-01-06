const jwt = require('jsonwebtoken');
const User = require("../models/user");

signToken = user => {
  return jwt.sign({
    iss: 'finapp',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setTime(new Date().getTime() + (1*60*60*1000))// current time + 1 day
  }, process.env.JWT_SECRET);
};

module.exports = {
  signup: async (req, res, next) => {
    // ES6 Destructuring
    // Equal to:
    // const email = req.value.body.email;
    // const password = req.value.body.password;
    const { email, password } = req.value.body;

    // Check if email does not exist
    const foundUser = await User.findOne({ email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email already exists! '});
    }

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Respond with token
    // res.json({ user: 'User created!' });
    const token = signToken(newUser);
    res.status(200).json({ token });
  },

  signin: async (req, res, next) => {
    // generate token
    const token = signToken(req.user);

    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');

    res.json({secret: "resource"});
  }
}