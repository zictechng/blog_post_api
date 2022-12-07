const express = require("express");
const app = express();
const dotenv = require("dotenv");
//console.log("Hello Server");

//clsdotenv.config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");



dotenv.config();

app.use(express.json());

mongoose.set('strictQuery', true);  // this is use to supress some mongoose error in the data connection runing

// db connection here
// you can visit mongo webiste for more details about the connection strings.
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to db"))
.catch((err) => console.log(err));
mongoose.set('strictQuery', true);

// enable/initate file upolad here...
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "images")
    }, filename:(req,file,cb) =>{
        cb(null,"hello.jpeg")// for testing
        // from frontend use: cb(null, req.body.name);
    }
});

//here the file upload function 
const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req,res) =>{
    res.status(200).json("File uploaded successfully!");
});


// create route for access the url in the broswer

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/posts", postRoute);

app.use("/api/categories", categoryRoute);


// app listen to port here...
app.listen("5000", () =>{
    console.log("Backend is running");
});  