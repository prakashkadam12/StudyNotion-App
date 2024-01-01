const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async (req, res) =>{
    try{
        // data fetch
        const {name, courseId} = req.body ;

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