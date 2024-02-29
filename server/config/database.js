const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    //console.log("DBURL-",`'${process.env.MONGODB_URL}'`);
    mongoose.connect("mongodb+srv://pptl8685:V5vPTV2CairDz6eX@cluster0.ehycfhl.mongodb.net/studynotionDB", {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};