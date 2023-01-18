const jwt=require("jsonwebtoken")

const authenicate=(req,res,next)=>{

    const token=req.headers.authorization
    if(token)
    {
        const decoded=jwt.verify(token,"messi")
        if(decoded)
        {
            next()
        }
        else{
            res.send("please Login First")
        }
    }
    else
    {
        res.send("please Login First")   
    }


}

module.exports={
    authenicate
}