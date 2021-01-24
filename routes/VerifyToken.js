var jwt=require('jsonwebtoken')


 const VerifyToken=(req,res,next)=>{


    const token= req.header("x-auth-token");
    
    if(!token){
        res.json({
            "Msg":"You are not authorized for accessing this resource"
        })
    }

    try{

        const decodeddata= jwt.verify(token,process.env.TOKEN)
        next()

    }

    catch(err){
        res.send(err)

    }

    

    


}

module.exports=VerifyToken