const express=require("express");
const requestRouter=express.Router();
const ConnectionRequestModel=require("../models/connectionRequest");
const { userAuth } = require("../../middleware/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
  
    try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    const allowedStatus=["ignored","interested"];
    if(!allowedStatus.includes(status)){
          return res.status(400).json({ error: "Invalid Status" });
    }
    
      if (fromUserId.toString() === toUserId) {
        return res
          .status(400)
          .json({ error: "Cannot send request to yourself" });
      }
    const existingConnectionREquest=await ConnectionRequestModel.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
    });
    if(existingConnectionREquest){
        return res.status(400).json({
    error: "Request is already sent",
  });
    }
    const request=  new ConnectionRequestModel({
        fromUserId,toUserId,status}
    );
    const data= await request.save();
    res.json({
        message:"Status saved",
        data
    })
}
catch(err){
    console.log(err.message)
    res.status(400).send(err.message);
}
});
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedIn=req.user._id;
        const{status,requestId}=req.params;
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status"})
        }
        const connectionRequest=await ConnectionRequestModel.findOne({
            _id:requestId,
            toUserId:loggedIn,
            status:"interested"
        });
        if(!connectionRequest){
               return res.status(400).json({message:"Not found request"})
        }
        connectionRequest.status=status;
       await connectionRequest.save();

    
        res.status(200).json({ message: `Request ${status}` });


    }catch(err){
          res.status(400).send(err.message);
    }
})

module.exports=requestRouter;