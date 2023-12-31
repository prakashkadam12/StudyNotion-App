const Tag = require("../models/Tags");

// ==================================================
// create Tag handler function
exports.createTag = async (req, res) =>{
    try{

        const {name, description} = req.body ;

        if(!name || !description){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "All fields are required",
                    }
                )
            )
        }

        // create entry in DB
        const tagDetails = await Tag.create({
            name : name ,
            description : description ,
        });

        console.log("tagDetails", tagDetails);

        res.status(400).json(
            {
                success : true ,
                message : "Tag created Succesfully",
                tagDetails ,
            }
        )

    }
    catch(error){
        console.log("error in createTag", error); 
        return(
            res.status(500).json(
                {
                    success : false, 
                    message : "Error in createTag",
                    error ,
                }
            )
        )
    }
}

//=============================================
//get all tags

exports.getAlltags = async (req, res) =>{
    try{

        // {name : true, description : true} == the query will return only the name and description fields for each document:
        const allTags = await Tag.find({}, {name : true, description : true}) ;

        console.log("allTags = =>", allTags);
        
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "allTags fetched successfully",
                    allTags ,
                }
            )
        )

    }
    catch(error){
        console.log("error in getAlltags ==>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "error in getAlltags",
                    error ,
                }
            )
        )
    }
}