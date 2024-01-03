const {instance} = require("../config/razorpay");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// ==============================================
// CAPTUREPAYMENT
exports.capturePayment = async (req, res) =>{

        // get courseId and UserId
        const {course_id} = req.body ;
        const userId = req.user.id ;

        // validation
        // valid course id
        if(!course_id){
            return(
                res.status(400).json(
                    {
                        success : false, 
                        message : "please provide valid course id",
                    }
                )
            )
        }

        // valid courseDetails
        let course ;

        try{
            course = await Course.findById(course_id);

            if(!course){
                return(
                    res.status(400).json(
                        {
                            success : false, 
                            message : "could not find the course",
                        }
                    )
                )
            }

            // check user already pay for the same course
            const uid = new mongoose.Types.ObjectId(userId) ;
            if(course.studentsEnrolled.includes(uid)){
                return(
                    res.status(400).json(
                        {
                            success : false,
                            message : "student already enrolled",
                        }
                    )
                )
            }

        }
        catch(error){
            console.log("error =>", error);
            return(
                res.status(500).json(
                    {
                        success : false , 
                        message : "error in capture payment",
                        error ,
                    }
                )
            )

        }

        // order create
        const amount = course.price ;
        const currency = "INR" ;

        const options = {
            amount : amount * 100 ,
            currency ,
            receipt : Math.random(Date.now().toString()),
            notes : {
                courseId : course_id ,
                userId ,
            }
        }

        try{

            // start the payment
            const paymentResponse = await instance.orders.create(options) ;
            console.log("paymentResponse ===>", paymentResponse) ;

            // return response
            return(
                res.status(200).json(
                    {
                        success : true ,
                        courseName : course.courseName ,
                        courseDescription : course.courseDescription ,
                        thumbnail : course.thumbnail ,
                        orderId : paymentResponse.id ,
                        currency : paymentResponse.currency ,
                        amount : paymentResponse.amount ,
                    }
                )
            )


        }
        catch(error){
            console.log("error==>", error);
            res.json({
                success : false ,
                message : "could not initiate the order",
            })
        }


}

// ====================================================
// ==============================================
// VERIFY SIGNATURE  -- ye request razorpay se aayegi (razorpay webhooks)

exports.verifySignature = async (req, res) =>{
         
        const webhookSecret = "123456789"; // Your webhook secret obtained from Razorpay

        const signature = req.headers("x-razorpay-signature"); // Extracting signature from request headers
        
        const shasum = crypto.createHmac("sha256", webhookSecret); // Creating an HMAC object using the webhook secret
        
        shasum.update(JSON.stringify()); // Updating the HMAC with request data
        
        const digest = shasum.digest("hex"); // Generating the digest (hash) in hexadecimal format
        
        // trying to authorized SIGNATURE
        if(signature === digest){
            console.log("payment is authorized");

            // finding the "NOTES" object that we sended in razorpay capture payment
            const {courseId, userId} = req.body.payload.payment.entity.notes ;

            try{
                // fullfill the action

                // find the course and enrolled the student in it
                const enrolledCourse = await Course.findOneAndUpdate(
                    {_id : courseId},
                    {$push : {studentsEnrolled : userId}},
                    {new : true},
                )

                if(!enrolledCourse){
                    return(
                        res.status(500).json(
                            {
                                success : false ,
                                message : "course not found" ,
                            }
                        )
                    )
                }

                console.log("enrolledCourse ==>", enrolledCourse);

                // find the student and add the course to their list of enrolled courses
                const enrolledStudent = await User.findOneAndUpdate(
                    {_id : userId},
                    {$push : {courses : courseId}},
                    {new : true},
                )

                console.log("enrolledStudent ==>", enrolledStudent);

                // send mail of confirmation
                const emailResponse = await mailSender(
                                        enrolledStudent.email ,
                                        "congratulations for buying course" ,
                                        "<<<<mail template here>>>>"
                );

                console.log("email response=>", emailResponse);

                return(
                    res.status(200).json(
                        {
                            success : true ,
                            message : "Signature verified and course added",

                        }
                    )
                )




            }
            catch(error){
                console.log("error in signature verified ==> ", error);
                return(
                    res.status(500).json(
                        {
                            success : false,
                            message : "error in signature verified",
                            error ,
                        }
                    )
                )

            }


        }

        else{
            return(
                res.status(500).json(
                    {
                        success : false,
                        message : "signature not verified",
                    }
                )
            )
        }

}


