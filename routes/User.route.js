const express = require("express")
const {UserModel}=require("../models/User.model")
const jwt = require('jsonwebtoken');
require("dotenv").config()
const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{

    const payload=req.body
    try{
        const user=new UserModel(payload)
        await user.save()
        res.send("Register Successfully")
    }
    catch(e)
    {
        res.send("Error while register")
        console.log(err)
    }
})


userRouter.post("/login",async(req,res)=>{

    const {email,password}=req.body

    try
    {
    const user=await UserModel.find({email,password})
    const token = jwt.sign({ foo: 'bar' }, process.env.KEY);
if(user.length>0)
{
    res.send({"msg":"Login Successfully","token":token})
}
else
{
    res.send("wrong input")
}
    }
    catch(e)
    {
        res.send("Something went wrong")
        console.log(e)
    }

})

module.exports={
    userRouter
}