const express=require("express");
const app=express();
const connectDb=require("./config/database");
const User=require("./models/user")
const {validateSignUp}=require("../utils/validation");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const {userAuth}=require("../middleware/user");
const authRouter=require("./routes/auth");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profile");
const cors=require("cors");
app.use(express.json());

app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

 app.use(express.urlencoded({ extended: true }));
 app.use("/api",authRouter);
  app.use("/api",requestRouter);
    app.use("/api",userRouter);
    app.use("/api", profileRouter);

connectDb().then(()=>{
    console.log("DataBase is connected");
    app.listen(3000,()=>{
    console.log("App is listenig to port");
})
});


app.post("/signUp",async(req,res)=>{

   const {firstName,lastName,emailId,password}=req.body;
try{
     validateSignUp(req);
     const hashPassword=await bcrypt.hash(password,10);
  const newUser=await User({
   firstName,lastName,emailId,
   password:hashPassword
  });
  await newUser.save();
  res.status(200).send("data is saved")
}catch(err){
   console.log("Error",err.message);
     res.status(400).send({ error: err.message }); 
}
 
});


app.get("/profile",userAuth,async(req,res)=>{
  const user=req.user;

  res.send(user);
  
});






