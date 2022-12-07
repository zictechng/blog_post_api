const router = require("express").Router();
const User = require("../models/User"); // this import the user schema model
// so that we can use the data variable in this operation here...
const Post = require("../models/Post");
const bcrypt = require('bcrypt'); // this is for password enscription
// register function here...

//create post
router.post("/", async(req, res) =>{
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update post
router.put("/:id", async(req, res) =>{
     try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set:req.body
            }, {new:true});
            res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else{
            res.status(401).json("You can only update your post");
        }
        
     } catch (err) {
        res.status(500).json(err);
     }
   
    
});

// delete post
router.delete("/:id", async(req, res) =>{
    try {
       const post = await Post.findById(req.params.id);
       if(post.username === req.body.username){
           try {
            await post.delete();
           res.status(200).json("Post has been deleted");
           } catch (err) {
               res.status(500).json(err);
           }
       } else{
           res.status(401).json("You can only delete your post");
       }
       
    } catch (err) {
       res.status(500).json(err);
    }
  
   
});

// get post by id
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
      
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all post
router.get("/", async(req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
     let posts; // this means the value is changable i.e the "let post"
     if(username){
        //post = await Post.find({username:username}) this is same as below
        //because the variable is the same as in the database base on ES6 function
        posts = await Post.find({username})
     } else if(catName){
        posts = await Post.find({categories:{
            $in:[catName],
             },
        });
    } else{
        posts = await Post.find();
     }
     res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


//login function here...



module.exports = router 






