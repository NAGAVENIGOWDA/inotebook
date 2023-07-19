var jwt = require("jsonwebtoken");
const JWT_SECRET = "thisissecret";

const fetchuser=(req,res,next)=>{

    const token=req.header("auth-token");  //auth-token:"--token--"
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token "})
    }
    try{

        const data=jwt.verify(token,JWT_SECRET); //decoding
        req.user=data.user
        /* it is assigned to req.user. This means that subsequent middleware or route handlers in the Express application can access the authenticated user's data through req.user. */
        next();
    }catch(error){
        res.status(401).send({error:"please authenticate using a valid token "})
    }
  

}

module.exports=fetchuser