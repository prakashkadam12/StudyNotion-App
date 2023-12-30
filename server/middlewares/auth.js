const User = require("../models/User");

const jwt = require("jsonwebtoken");
require("dotenv").config();


// ======================================================
// auth
exports.auth = async (req, res, next) =>{
    try{
        // extract token has 3 ways
        const token = req.cookies.token 
        || req.body.token 
        || req.header("Authorisation").replace("Bearer ","");

        // if token is missing
        if(!token){
            return(
                res.status(401).json(
                    {
                        success : false,
                        message : "token is missing",
                    }
                )
            )
        }

        // verify token
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode ==>", decode);

            req.user = decode ;
            
        }
        catch(error){
            console.log("jwt verify error =>", error);
            return(
                res.status(401).json(
                    {
                        success : false,
                        message : "jwt verify error / token is invalid",
                        error : error ,
                    }
                )
            )

        }

    }
    catch(error){
        console.log("error in AUTH middlware", error);

        return(
            res.status(401).json(
                {
                    success : false, 
                    message : "error in Auth middleware",
                    error : error ,
                }
            )
        )

    }
}


// isStudent




// isInstructor

// isAdmin