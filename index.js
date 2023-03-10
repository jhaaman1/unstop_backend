const express = require('express');
const {connection} = require('./config/db');
const { authentication } = require('./middlewares/authentication');
const { userController } = require('./routes/user.routes');

const passport = require('./config/google-oauth');

const app = express();
const PORT = process.env.PORT || 8002

app.use(express.json())

app.get("/", (req, res) => {
    res.send("HomePage")
})


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect('/');
  });



app.use('/user', userController);

app.use(authentication)


app.listen(PORT, async () => {
    try{
        await connection
        console.log('Connected to DB')
    }
    catch(err){
        console.log('error connecting ot db')
        console.log(err)
    }
    console.log(`port ${PORT} started`);
})