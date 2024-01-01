const Section = require("../models/Section");
const Course = require("../models/Course");

// ===============================================
// createSection
exports.createSection = async (req, res) =>{
    try{
        // data fetch
        const {sectionName, courseId} = req.body ;

        // validation
        if(!sectionName || !courseId){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "All field are required" ,
                    }
                )
            )
        }
        
        // create section
        const newSection = await Section.create(
            {
                sectionName
            }
        )
        console.log("newSetion ==>", newSection);

        // push "COURSE" ka course content k andar "SECTION" ki ID
        const updatedCourse = await Course.findByIdAndUpdate(
            {courseId},
            {
                $push : {courseContent : newSection._id}
            },
            {new : true},
        )
        .populate("courseContent")
        .populate({
            path : 'courseContent' ,
            populate : { path : "SubSection"}
        })

        // ABOVE -- ek k andar dusre ko populate kaise kare
        console.log("updatedCourse with double populate with section and subsection within section ==>", updatedCourse);


        // return response
        return(
            res.status(200).json(
                {
                    success : true, 
                    message : "newSection created successully",
                    newSection ,
                    updatedCourse ,
                }
            )
        )
        
    }
    catch(error){

        console.log("error in create section", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "error in create Course" ,
                    error ,
                }
            )
        )

    }
}


// ============================================
// updateSection

exports.updateSection = async (req, res) =>{
    try{

        // data fetch
        const {sectionName, sectionId} = req.body ;

        // validation
        if(!sectionName || !sectionId){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "All field are required" ,
                    }
                )
            )
        }

        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new : true} );


        // return
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "update section successfully",
                    section,
                }
            )
        )

        
    }
    catch(error){
        console.log("error in update section ==>", error);

        return(
            res.status(500).json(
                {
                    success : false,
                    message : "error in update section",
                    error ,
                }
            )
        )
        
    }
}

// ===============================================
// delete section

exports.deleteSection = async (req, res) =>{
    try{
        // get section id from params that we sending from frontend
        const {sectionId} = req.params ;

        // delete section
        const deletedSection = await Section.findByIdAndDelete(sectionId) ;

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "section deleted successfully",
                    deletedSection ,
                }
            )
        )
    }
    catch(error){
        console.log("error in delte section ==>", error) ;
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "error in delete section",
                    error ,
                }
            )
        )
    }
}