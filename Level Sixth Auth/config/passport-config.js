const User = require("../models/userModel");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, user[0].id);
});
passport.deserializeUser((id, done) => {
  if (id !== undefined) {
    User.findById(id).then((user) => {
      done(null, user);
    });
  }
});

function initGooglePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        User.find({ googleId: profile.id }).then((user) => {
          if (user.length !== 0) {
            done(null, user);
          } else {
            const newUser = new User({
              userId: profile.id,
              username: profile.displayName,
              photoUrl: profile.photos[0].value,
            });
            newUser
              .save()
              .then((user) => {
                done(null, user);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    )
  );
}

function initFacebookPassport() {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      function (accessToken, refreshToken, profile, done) {
        User.find({ userId: profile.id }).then((user) => {
          if (user.length !== 0) {
            done(null, user);
          } else {
            const newUser = new User({
              userId: profile.id,
              username: profile.displayName,
              photoUrl: profile.photos[0].value,
            });
            newUser.save().then((user) => {
              done(null, user);
            });
          }
        });
      }
    )
  );
}
function initGitHubPassport() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        User.find({ userId: profile.id }).then((user) => {
          if (user.length !== 0) {
            done(null, user);
          } else {
            const newUser = new User({
              userId: profile.id,
              username: profile.displayName,
              photoUrl: profile.photos[0].value,
            });
            newUser.save().then((user) => {
              done(null, user);
            });
          }
        });
      }
    )
  );
}

function initLinkedInPassport() {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: process.env.LINKEDIN_CALLBACK_URL,
        state: true
      },
      function (accessToken, refreshToken, profile, done) {
        User.find({}).then((user) => {
          if (user.length !== 0) {
            done(null, user);
          } else {
            const newUser = new User({
              userId: profile.id,
              username: profile.displayName,
              photoUrl: profile.photos[0].value,
            });
            newUser
              .save()
              .then((user) => {
                done(null, user);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    )
  );
}
function initTwitterPassport(){
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    includeEmail: true
    }, function(token, tokenSecret, profile, done) {
        User.findOne({ userId: profile.id }).then((user) => {
          if (user.length !== 0) {
            done(null, user);
          } else {
            const newUser = new User({
              userId: profile.id,
              username: profile.displayName,
              photoUrl: profile.photos[0].value,
            });
            newUser.save().then((user) => {
              done(null, user);
            });
          }
        }
        );
    }
  ));
}
module.exports = {
  initGooglePassport,
  initFacebookPassport,
  initGitHubPassport,
  initLinkedInPassport,
  initTwitterPassport
};
