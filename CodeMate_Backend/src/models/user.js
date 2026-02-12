const mongoose=require("mongoose");
const {Schema}=mongoose;
const validator=require("validator");
const jwt=require("jsonwebtoken");
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    lastName:{
         type:String,
         minLength:3,
        maxLength: 50,
    },
    emailId:{
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         trim:true,
         validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email"+value)
            }
         },
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
        max:80,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
            default:"https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png",
         validate(value){
            if(!validator.isURL(value)){
            throw new Error("Invalid URL: " + value)
            }
        }

    },
    about:{
        type:String,
   default: "This is a default about field"

    },
    skills:{
        type:[String],

    },
    isAdmin: {
    type: Boolean,
    default: false
}
},
    {
        timestamps:true,
    }
);
userSchema.methods.getJwt=async function(){
    const user=this;
     const token =jwt.sign({_id:user._id,
        isAdmin: user.isAdmin} ,"secret_key",{
      expiresIn:"1d"
     });
     return token;
}
const User=mongoose .model("User",userSchema);
module.exports=User;
