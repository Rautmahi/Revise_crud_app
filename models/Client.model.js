const mongoose=require("mongoose")

const clientSchema=mongoose.Schema({

    name:String,
    age:Number,
    MobileNo:Number,
    Address:String,
    userId:String
})

const ClientModel=mongoose.model("client",clientSchema)

module.exports={
    ClientModel
}