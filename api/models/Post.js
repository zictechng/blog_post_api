// import mongoose
const mongoose = require("mongoose");

// create your data schema, i.e the variable of your user table data
const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    desc:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:false
    },
    username:{
        type:String,
        require:true
    },
    categories:{
        type:Array,
        require:false
    }
}, {timestamps:true}
);

// export the model so that it can be accessible and readable
module.exports = mongoose.model("Post", PostSchema);