const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");

// idhar profile humne already create kar rakhi hai AUTH CONTROLLER k andar 
// AUTH controller me hum ne profile create kar k values null daal rakhi hai 
// updateProfile
exports.updateProfile = async (req, res) =>{
    try{

        // get data
        const {dateOfBirth = "", about = "", contactNumber, gender} = req.body ;
        
        // get userId
        const id = req.user.id ;

        // validation
        if(!contactNumber || !gender || !id){
            return(
                res.status(400).json(
                    {
                        success : true ,
                        message : "All fields are required" ,
                    }
                )
            )
        }

        // find profile
        const userDetails = await User.findById(id) ;
        const profileId = await userDetails.additionalDetails ;
        const profileDetails = await Profile.findById(profileId) ;

        // update profile
        profileDetails.dateOfBirth = dateOfBirth ;
        profileDetails.about = about ;
        profileDetails.gender = gender ;
        profileDetails.contactNumber = contactNumber ;

        const updatedProfileDetails = await profileDetails.save();

        // return response
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "Profile updated successfully" ,
                    updatedProfileDetails ,
                }
            )
        )

    }
    catch(error){

        console.log("error in update profile  ==>", error) ;
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "error in update profile",
                    error ,
                }
            )
        )

    }
}                  

// ===================================================
// HOW CAN WE SCHEDULE THIS ex. ater 5 days
// deleteAccount


exports.deleteAccount = async (req, res) =>{
    try{
        // HOW TO SCHEDULE A PERTRICULAR TASK IN MONGODB 
        // get id
        const id = req.user.id ;

        const userDetails = await User.findById(id) ;

        // validation
        if(!userDetails){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "userdetails failed to get" ,
                    }
                )
            )
        }

        // delete profile
        const deletedProfile = await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});

        // HOMEWORK
        // ab wo student ko course enrolled students me se bhi remove karna padta hai
        const deleteFromCourse = await Course.findByIdAndUpdate()

        // delete user
        const deletedUser = await User.findByIdAndDelete({_id : id});

        // return
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "account deleted successfully" ,
                }
            )
        )


    }
    catch(error){

        console.log("error in delte user ==>", error) ;
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "error in delete user error",
                    error ,
                }
            )
        )

    }
}

// ====================================================
// getAllUserDetails

exports.getAllUserDetails = async (req, res) =>{
    try{

        const id = req.user.id ;

        const userDetails = await User.find(id).populate("additionalDetails").exec() ;

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "getAllUserDetails successfully" ,
                    userDetails ,
                }
            )
        )

    }
    catch(error){
        console.log("error in get all user details ==>", error) ;
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "error in get all user details",
                    error ,
                }
            )
        )
    }
}


