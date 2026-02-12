const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const ConnectionRequest=new Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
          ref: "User",
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["accepted","rejected","interested","ignored"],
            message:"{VALUE} is incorrect status"
        }
    },
    
    },
    {
           timestamps:true,
    }
   
)
const ConnectionRequestModel = mongoose.model("ConnectionRequest", ConnectionRequest);

module.exports=ConnectionRequestModel;