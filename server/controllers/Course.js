const Course = require("../models/Course");
const Tag = require("../models/Tags");
const User = require("../models/User");

const {uploadImageToCloudinary} = require("../utils/imageUploader");

// =====================================
// createCourse handler function

exports.createCourse = async (req, res) => {
    try{
        // get data from req.body
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body ;

        // fetching file
        const thumbnail = req.files.thumbnailImage ;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
            return(
                res.status(400).json(
                    {
                        success : false,
                        message : "all fields are required",
                    }
                )
            )
        }

        // "course" collection k andar "User" collection kii ID dalni padti hai
        const userId = req.user.id ;
        const instructorDetails = await User.findById(userId);

        console.log("instructor details  =>", instructorDetails);

        if(!instructorDetails){
            // validation
            return(
                res.status(400).json(
                    {
                        success : false,
                        message : "Instuctor details not found",
                    }
                )
            )
        }

        // check given tag is valid or not
        const tagDetails = await Tag.findById(tag);

        if(!tagDetails){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "Tagdetails not found" ,
                    }
                )
            )
        }

        // upload to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME) ;
        console.log("thumbnailImage.secure_url ==>", thumbnailImage.secure_url);

        // Create entry for new course
        const newCourse = await Course.create({
            courseName, 
            courseDescription, 
            instructor : instructorDetails._id, 
            whatYouWillLearn, 
            price ,
            thumbnail : thumbnailImage.secure_url ,
            tag : tagDetails._id ,
        })

        // User ko update karna hai
        // User instructor hai tooo
        // add this new course to user schema of instructor
        const updatedUserWithCourse = await User.findByIdAndUpdate({id : instructorDetails._id},{ $push: {courses : newCourse._id}}, {new : true});

        // update the "Tag" schema
        const updatedTagWithCourse = await Tag.findByIdAndUpdate({id : tagDetails._id}, {$push : {Course : newCourse._id}}, {new : true});

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "Create course successfully",
                    newCourse ,
                    updatedTagWithCourse,
                    updatedTagWithCourse,
                }
            )
        )

    }

    catch(error){
        console.log("create new course error =>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "create new course error",
                    error ,
                }
            )
        )

    }
}





// =====================================
// getAllCourse handler function

