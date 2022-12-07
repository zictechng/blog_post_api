// import mongoose
const mongoose = require("mongoose");

// create your data schema, i.e the variable of your user table data
const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        
    },
}, {timestamps:true}
);

// export the model so that it can be accessible and readable
module.exports = mongoose.model("Category", CategorySchema);