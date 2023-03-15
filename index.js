const express = require("express")
const {connection} = require('./config/db');
require("dotenv").config()
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { registerRouter } = require("./routes/register.routes");
const { loginRouter } = require("./routes/login.routes");
const { userProfile } = require("./routes/userprofile.routes");
const { googleOathRouter } = require("./routes/google-outh.routes");


const app = express();
const PORT=process.env.PORT || 8000

app.use(cors()) 

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("welcome to api")
})

app.use("/register",registerRouter)
app.use("/login",loginRouter)
app.use("/profile",userProfile)
app.use("/auth",googleOathRouter)






app.listen(PORT, async () => {
    try{
        await connection
        console.log("Connection to DB successfully")
    }
    catch(err){
        console.log(err)
        console.log("Error connecting to DB")
    }
    console.log(`Listening on PORT ${PORT}`)
})