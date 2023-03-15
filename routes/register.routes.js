const express = require("express");
const registerRouter=express.Router()
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/User.model");

registerRouter.get("/",(req,res)=>{
    res.send("welcome to register route")
})

registerRouter.post("/add-user",async (req,res)=>{

    let {firstname,lastname,user_name,email,password,confirm_password,phone_number,organisation,country_code}=req.body
    
    const isUser = await UserModel.findOne({email})

    if(isUser){
        res.send({"msg" : "User already exists"})
    }
    else {
        bcrypt.hash(password, 4, async function(err, hash) {
        if(err){
            res.send({"msg":"Something went wrong"})
        }
        const new_user=new UserModel({
            firstname,
            lastname,
            user_name,
            email,
            password:hash,
            confirm_password,
            phone_number:phone_number?phone_number:phone_number=123456789,
            country_code:country_code?country_code:country_code=0,
            organisation,
        })
        try{
            await new_user.save()
            res.send({"msg" : "Sign up successfull"})
        }
        catch(err){
            console.log(err)
            res.send({"msg" : "Something went wrong"})
        }
    });

}
})

module.exports={registerRouter}