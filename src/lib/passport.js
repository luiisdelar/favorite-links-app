const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signup', new localStrategy ({ 
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encrypPassword(password);
    const result = await pool.query('insert into users set ? ', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {  
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {  
    const rows = await pool.query('select * from users where id = ? ', [id]);
    done(null, rows[0]);
});