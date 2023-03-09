const {Router} = require("express");
const { Usermodel } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

const userController = Router();

userController.post("/signup", (req,res) => {
    const {email, password, age} = req.body;

    bcrypt.hash(password, 5,async function(err, hash) {
        if(err){
            res.send("something went wrong plese try again later")
        }
        const user = new Usermodel({
            email,
            password: hash
        })
        try{
            await user.save()   
            res.json({mssg:'Signup successful'})
        }
        catch(err){
            console.log(err);
            res.send("something went wrong, please try again...")
        }
        // console.log(user)
    })
})

userController.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const user = await Usermodel.findOne({email})
    const hash = user.password
    bcrypt.compare(password,hash, function(err,result) {
        if(err){
            res.send('something went wrong try again later')
        }
        if(result){
            const token = jwt.sign({ userId: user._id}, process.env.secret_key);
            res.json({message: 'login successful', token})
        }
        else{
            res.send("Invalid credentials, plz signup if you havent")
        }
    })

})

module.exports = {userController}   