const SubSection = require("../models/SubSection");
const Section = require("../models/Section");

const {uploadImageToCloudinary} = require("../utils/imageUploader");


// =============================================================
// createSubsection

exports.createSubSection = async(req, res) =>{
    try{
        // fetch data from req.body
        const {sectionId, title, timeDuration, description} = req.body ;

        // extract video from req
        const video = req.files.videoFile ;

        // validation
        if(!sectionId || !title || !timeDuration || !description){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "all fields are required" ,
                    }
                )
            )
        }

        // cloudinary video upload and get secure url
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME) ;
        console.log("upload details video link ==>", uploadDetails.secure_url);

        // create a sub section
        const SubSectionDetails = await SubSection.create(
            {
                title : title ,
                timeDuration : timeDuration ,
                description : description ,
                videoUrl : uploadDetails.secure_url,
            }
        )

        // update section with this sub section ObjectId
        const updateSection = await Section.findByIdAndUpdate(
            {id: sectionId},
            {
                $push : {SubSection : SubSectionDetails._id} 
            },
            {new : true},
        ).populate("subSection");

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "sub section created successfully",
                    updateSection ,
                }
            )
        )

    }
    catch(error){

        console.log("error in subsection create ==>", error) ;
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "error in create subsection",
                    error ,
                }
            )
        )
        
    }
}


// =========================================================
// update subsection

exports.updateSubSection = async (req, res) =>{
    try{
        // get data
        const {subSectionId, title, timeDuration, description} = req.body ;

        // extract video from req
        const video = req.files.videoFile ;

        // validation
        if(!subSectionId || !title || !timeDuration || !description){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "all fields are required" ,
                    }
                )
            )
        }

        // cloudinary video upload and get secure url
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME) ;
        console.log("upload details video link ==>", uploadDetails.secure_url);

        // update a sub section
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            {subSectionId} ,
            {
                title : title ,
                timeDuration : timeDuration ,
                description : description ,
                videoUrl : uploadDetails.secure_url,
            } ,
            {new : true} ,
        )

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "sub section updated successfully" ,
                    updatedSubSection ,
                }
            )
        )


    }
    catch(error){
        console.log("error in subsection updation ==>", error) ;
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "error in update subsection",
                    error ,
                }
            )
        )
    }
}

// =============================================================
// delete subsection

exports.deleteSubSection = async (req, res) =>{
    try{
        // get sub section id from params that we sending from frontend
        const {subSectionId} = req.params ;

        // TODO : do we need to delete the entry from the course schema ??
        // TESTING ????

        // delete section
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId) ;

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "section deleted successfully",
                    deletedSubSection ,
                }
            )
        )
    }
    catch(error){
        console.log("error in delte sub section ==>", error) ;
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "error in delete sub section error",
                    error ,
                }
            )
        )
    }
}










