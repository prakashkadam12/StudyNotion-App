const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//=======================================
// resetPasswordToken

exports.resetPasswordToken = async(req, res) =>{
    try{
        // get email from req body
        const email = req.body.email ;

        // check user for this email, email validation
        const user = await User.findOne({email : email});
        
        // token generate 
        if(!user){
            return(
                res.status(400).json({
                    success : false ,
                    message : "Your email is not registerd with us" ,
                })
            )
        }

        // update user by adding token and exiration time
        const token = crypto.randomUUID();

        // create url
        const updatedDetails = await User.findOneAndUpdate({email : email}, 
                                                        {
                                                            token : token, 
                                                            resetPasswordExpire : Date.now() + 5*60*1000 ,
                                                        },
                                                        {new : true}
                                                        );

        const url = `http://localhost:3000/update-password/${token}` ;

        // send mail containing the url
        await mailSender(email, "Password reset Link", url);

        return(
            res.status(200).json(
                {
                    success: true,
                    message : "mail send successfully, please check email and change pass" ,
                    updatedDetails ,
                }
            )
        )
    
    }
    catch(error){
        console.log("reset pass errror", error) ;

        return(
            res.status(500).json({
                success : false,
                message : "error in reset pass",
                error ,
            })
        )
    }

}

// ==============================================
// resetPassword

exports.resetPassword = async (req, res) =>{
    
    try{
        // data fetch  -- idhar token frontend ne dala hai
        const {password, confirmPassword, token} = req.body ;

        // validation
        if(password !== confirmPassword){
            res.status(400).json(
                {
                    success : false ,
                    message : "Password and confirm password are not matching",
                }
            )
        }

        // get user details from DB using token
        const userDetails = await User.findOne({token : token});

        // if no entry - invalid token
        if(!userDetails){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "user not found / token invalid",
                    }
                )
            )
        }

        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return(
                res.status(400).json({
                    success : false,
                    message : "token is expired " ,
                })
            )
        }

        // hashed pass
        const hashedPassword = await bcrypt.hash(password, 10);

        // update pass in DB
        const updatedUser = await User.findOneAndUpdate(
            {token : token},
            {password : hashedPassword},
            {new : true}
        )

        res.status(200).json(
            {
                success : true , 
                message : "password reset successfully",
            }
        )

    }
    catch(error){
        console.log("erorr in reset password =>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "error in reset passwrod",
                    error,
                }
            )
        )
    }

}



