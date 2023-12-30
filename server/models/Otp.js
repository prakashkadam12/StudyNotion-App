const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    email : {
        type : String , 
        required : true ,
    },
    otp :{
        type : String ,
        required : true ,
    },
    createdAt : {
        type : Date,
        default : Date.now() ,
        expires : 5*60 , // OTP-SCHEMA EXPIRES AFTER 5 MINS
        // documents in the collection will automatically expires ( be delted) after 5 minutes
        // TTL (Time to live)
    }

})

// email sending function
//a function -> to send emails
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error) {
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

// PRE - middleware after the SCHEMA and before the model
OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
}) 


module.exports = mongoose.model("Otp", otpSchema);