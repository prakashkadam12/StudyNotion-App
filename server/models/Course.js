const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseName : {
        type: String,
        trim : true,
        required : true,
    },
    courseDescription : {
        type : String,
        trim : true,
        required : true,
    }
})