const passport = require('passport');
const passportFacebook = require('passport-facebook');
const config = require('../../config');
const UsuarioController = require('../main/controller/UsuarioController');

const passportConfig = {
    clientID: config.get('authentication.facebook.clientId'),
    clientSecret: config.get('authentication.facebook.clientSecret'),
    callbackURL: 'http://localhost:3000/api/authentication/facebook/redirect'
};

if (passportConfig.clientID) {
    passport.use(new passportFacebook.Strategy(passportConfig, function (accessToken, refreshToken, profile, done) {
        let user = UsuarioController.getUserByExternalId('facebook', profile.id);
        if (!user) {
            user = UsuarioController.create(profile.displayName, 'facebook', profile.id);
        }
        return done(null, user);
    }));
}
