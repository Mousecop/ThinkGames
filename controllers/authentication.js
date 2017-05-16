const jwt = require('jwt-simple');
const {User} = require('../models/models');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub: subject
  // iat: issued at time
  return jwt.encode({ sub: user.username, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.json({
    token: tokenForUser(req.user),
    user: req.user
  });
  next();
}

// function userInfo(user) {
//   return {_id: user._id, email: user.email}
// }

exports.signup = function(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
  

    if (!email || !password || !username) {
        return res.status(500).send({ error: 'You must provide an email, password, and username'});
    }

    // Check if a username with a given email exists
    User
        .findOne({ username: username }, function(err, existingUser) {
            if (err) { return next(err); }

            // If a user with email does exist, return an error
            if (existingUser) {
            return res.status(422).send({ error: 'Username is already in use' });
            }

        // If a user with user does NOT exist, create and save user record
        const user = new User({
            username: username,
            email: email,
            password: password
        });

        user.save(function(err) {
        if (err) { return next(err); }

        // Respond to request indicating the user was created
        res.json({
            token: tokenForUser(user),
            user: user });
        });
    })
    .catch(err => {
                console.log(err)
                res.status(500).json({message:'internal server error'});
            })
}