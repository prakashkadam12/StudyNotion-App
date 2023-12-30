const User = require("../models/User");
const OTP = require("../models/Otp");

const otpgenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//==============================================
// otp send function

exports.sendOTP = async (req, res) =>{

    try{

        // 1) fetch email form req body
        const {email} = req.body ;

        // 2) check user is already exised ?
        const userPresent = await User.findOne({email}) ;

        // if user is existed
        return(
            res.json(401).json(
                {
                    success : false, 
                    message : "User already existed",
                }
            )
        )

        // 3) generate OTP

        var otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("generated Otp =>", otp);

        // check unique otp or not (means the same otp is not existed in the DB at the same time for multiple users)
        const result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
        }

        // 4) OTP entry with email in DB

        const otpPayload = {email, otp} ;

        const otpBody = await OTP.create(otpPayload);
        console.log("created otp entry in DB otpBody =>", otpBody);

        // otp send successfully

        res.status(200).json(
            {
                success : true , 
                message : "OTP sent successfully",
                otpBody : otpBody ,
                otp : otp ,
            }
        );

    }
    catch(error){

        console.log("OTP not sent ERROR =>", error);

        return(
            res.status(500).json(
                {
                    success : false,  
                    error : error ,
                    message : "OTP not sent" ,
                }
            )
        )

    }


}
//==============================================
// signup

exports.signUp = async (req, res) =>{
    try{

        // 1) data fecth from request body
        const {
            firstName, 
            lastName, 
            email, 
            password, 
            confirmPassword, 
            accountType, 
            contactNumber, 
            otp
        } = req.body ;

        // validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return(
                res.status(403).json(
                    {
                        success : false , 
                        message : "All fields are required" ,
                    }
                )
            )
        }

        // check password matching 
        if(password !== confirmPassword){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "Password and Confirm password are not same" ,
                    }
                )
            )
        }

        // check user is already available or not -- validate user
        const existingUser = await User.findOne({email});

        if(existingUser){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "User already registered",
                    }
                )
            )
        }

        // 2) find Most recent OTP stored in the DB bcz 
        // there are chances that multiple otp available for the same user in DB
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log("recentOtp = >", recentOtp);

        if(recentOtp.length == 0 ){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "OTP not found" ,
                    }
                )
            )
        }

        // verify OTP with the user's entered otp
        else if(otp !== recentOtp){
            return(
                res.status(400).json(
                    {
                        success : false, 
                        message : "OTP not matching", 
                    }
                )
            )
        }

        // 3) Password Hashing 
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPssword=>", hashedPassword);

        // create entry in DB

        // we are creating a profileDetails for additionalDetails to get the Id for profileDetailsSchema
        const profileDetails = await Profile.create({
            gender : null ,
            dateOfBirth : null ,
            contactNumber : null ,
            about : null ,
        })

        const user = await User.create({
            firstName, 
            lastName, 
            email, 
            password : hashedPassword, 
            accountType, 
            contactNumber,
            additionalDetails : profileDetails._id ,
            image : `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        console.log("user ==>", user);

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "User is registered successfully",
                    user : user ,
                }
            )
        )


    }
    catch(error){

        console.log("error in signUp =>", error);

        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "SignUp error",
                    error : error ,
                }
            )
        )

    }
}

//==============================================
// login
exports.login = async (req, res) =>{

    try{
        // 1) email and password fetch from req body
        const {email, password} = req.body ;

        // validation data
        if(!email || !password){
            return(
                res.status(403).json(
                    {
                        success : false ,
                        message : "all fields are required" ,
                    }
                )
            )
        }

        // 2) check user is existed or not
        const user = await User.findOne({email}).populate("additionalDetails") ;

        if(!user){
            return(
                res.status(401).json(
                    {
                        success : false ,
                        message : "user is not registered please signup first" ,
                    }
                )
            )
        }

        // 3) match password and generate JWT
        if(await bcrypt.compare(password, user.password)){

            const payload = {
                email : user.email ,
                id : user._id,
                role : user.role,
            }

            const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "2h",
            })

            user.token = token ;
            user.password = undefined ;

            // 4) create cookie 

            const options = {
                expires : new Date(Date.now() + 3*34*60*60*1000),
                httpOnly : true,
            }

            res.cookie("token", token, options).status(200).json({
                success : true ,
                token : token ,
                user ,
                message : "login successfull"
            })

        } 
        else{
            return(
                res.status(401).json(
                    {
                        success : false,
                        message : "password is incorrect",
                    }
                )
            )
        }

    }
    catch(error){
        console.log("error in login =>", error);

        return(
            res.status(500).json(
                {
                    success : false, 
                    message : "login failure error",
                    error : error,
                }
            )
        )

    }
}

// change password
