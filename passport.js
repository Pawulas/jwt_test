const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./models/user');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesnt exist, handle it
    if (!user) {
      return done(null, false);
    }

    // Oterwise, return it
    done(null, user);
  } catch(err) {
    done(err, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If not handle it
    if (!user) {
      return done(null, false);
    }

    //Check if password is correct
    const isMatch = await user.isValidPassword(password);
    
    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }

    // Return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));