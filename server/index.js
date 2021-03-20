require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    userCtrl = require('./controllers/userController'),
    { SERVER_PORT, SESSION_SECRET } = process.env,
    app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}));

// user endpoints
app.get('/auth/login', userCtrl.pcoLogin);
app.get('/auth/complete', userCtrl.pcoCallback);
app.get('/api/tokens', userCtrl.getTokens);

app.listen(SERVER_PORT, () => console.log(`Planning on port ${ SERVER_PORT }`))