const {instance} = require("../config/razorpay");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");


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





