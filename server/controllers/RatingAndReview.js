const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

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


