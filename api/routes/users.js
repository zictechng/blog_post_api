const router = require("express").Router();
const User = require("../models/User"); // this import the user schema model
// so that we can use the data variable in this operation here...
const Post = require("../models/Post");
const bcrypt = require('bcrypt'); // this is for password enscription
// register function here...

//update
router.put("/:id", async(req, res) =>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true});
        res.status(200).json(updatedUser);
        }
        catch
            (err){
                res.status(500).json(err);
            }
    }
    else{
        res.status(402).json("You can update only your account");
    }
   
    
})

//delete
router.delete("/:id", async(req, res) =>{
    if(req.body.userId === req.params.id){
        try {
           const user = await User.findById(req.params.id); // this will get user details
            try{
                await Post.deleteMany({username: user.username}); // this will delete user post
                await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted successfully");
            }catch
                (err){
                    res.status(500).json(err);
                }
        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else{
        res.status(401).json("You can only delete your account");
    }
   
    
});

// get user
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const{ password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


//login function here...



module.exports = router 






