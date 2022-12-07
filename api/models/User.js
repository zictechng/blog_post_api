// import mongoose
const mongoose = require("mongoose");

// create your data schema, i.e the variable of your user table data
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String
    },
    profilePic:{
        type:String,
        default: ""
    }
}, {timestamps:true}
);

// export the model so that it can be accessible and readable
module.exports = mongoose.model("User", UserSchema);