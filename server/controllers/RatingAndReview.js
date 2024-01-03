const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// ==============================================
// createRating

exports.createRating = async (req, res) =>{
    try{
        // get user id
        const userId = req.user.id ;

        // fetch data from userid
        const {rating, review, courseId} = req.body ;

        // check that if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id : courseId ,
            studentsEnrolled : {$elemMatch : {$eq : userId}},
            },
            
        )

        if(!courseDetails){
            return(
                res.status(404).json(
                    {
                        success : false ,
                        message : "courseDetails not getting" ,
                    }
                )
            )
        }

        // check that if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user : userId,
            course : courseId ,
        })

        if(alreadyReviewed){
            return(
                res.status(403).json(
                    {
                        success : false ,
                        message : "course already reviewed by user" ,
                    }
                )
            )
        }

        // create 
        const ratingReview = await RatingAndReview.create({
            rating ,
            review ,
            course : courseId ,
            user : userId ,
        })

        // add to course collection
        const updatedCourse = await Course.findByIdAndUpdate(
            {_id : courseId } ,
            {
                $push : {
                    ratingAndReviews : ratingReview._id ,
                }
            },
            {new : true},
        )

        // return
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "create rating successfully" ,
                    ratingReview ,
                    updatedCourse ,
                }
            )
        )
        
    }
    catch(error){
        console.log("error in create rating and review ==>", error);

        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "error in create rating and review" ,
                    error ,
                }
            )
        )

    }
}


// ====================================================
// getAverageRating

exports.getAverageRating = async (req, res) =>{
    try{

        // getCourseId
        const courseId = req.body.courseId ;

        // calculate avg rating
        const result = await RatingAndReview.aggregate(
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId),
                },
            } ,
            {
                $group : {
                    _id : null ,
                    averageRating : { $avg : "rating" } ,
                }
            }
        )

        // validation
        if(result.length > 0){
            return(
                res.status(200).json(
                    {
                        success : true ,
                        message : "got avg rating",
                        averageRating : result[0].averageRating ,
                    }
                )
            )
        }

        // if no rating/review exist
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "avg rating = 0, no rating given now",
                    averageRating : 0 ,
                }
            )
        )



    }
    catch(error){
        console.log("error in getAverageRating ==> ", error);

        return(
            res.status(500).json(
                {
                    success : false, 
                    message : "error in getAverageRating",
                    error ,
                }
            )
        )
    }
}


// =========================================================
// getAllRating

exports.getAllRating = async (req, res) =>{
    try{

        const allReviews = await RatingAndReview.find({
            $sort : ({
                rating : "desc"
            })
        })
        .populate({
            path : "user",
            select : "firstName lastName email image",
        }) 
        .populate({
            path : "course" ,
            select : "courseName" ,
        })
        .exec() ;


        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "all reviews fetched successfully" ,
                    data : allReviews ,
                }
            )
        )


    }
    catch(error){
        console.log("error in getAllRating ==>", error);
        return(
            res.status(500).json(
                {
                    success : true ,
                    message : "error in getAllRating" ,
                    error ,
                }
            )
        )

    }
}