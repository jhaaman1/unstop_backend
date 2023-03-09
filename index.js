const express = require('express');
const {connection} = require('./config/db');
const { authentication } = require('./middlewares/authentication');
const { userController } = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 8002

app.use(express.json())

app.get("/", (req, res) => {
    res.send("HomePage")
})

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