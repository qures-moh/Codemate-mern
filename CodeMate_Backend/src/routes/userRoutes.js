const express = require("express");
const { userAuth } = require("../../middleware/user");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
// const { status } = require("init");
const userRouter = express.Router();
userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const ConnectionRequests = await connectionRequest.find({
            toUserId: loggedInUserId,
             status: "interested" 
        }).populate(
            "fromUserId",
            ["firstName", "lastName","about","photoUrl"]
        )
    
        res.status(200).json({
            message: "Data fetched successfully",
            data: ConnectionRequests
        });

    } catch (err) {
                res.status(400).json({ message: "Error fetching requests", error: err.message });
    }
});
// userRouter.get("/user/connections", userAuth, async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const loggedInUserId = req.user._id.toString();

//     const connectionRequests = await connectionRequest
//       .find({
//         status: "accepted",
//         $or: [
//           { fromUserId: loggedInUserId },
//           { toUserId: loggedInUserId }
//         ]
//       })
//       .populate("fromUserId", "firstName lastName photoUrl")
//       .populate("toUserId", "firstName lastName photoUrl");

//     const uniqueUsersMap = new Map();

//     connectionRequests.forEach((request) => {
//       if (!request.fromUserId || !request.toUserId) return;

//       const connectedUser =
//         request.fromUserId._id.toString() === loggedInUserId
//           ? request.toUserId
//           : request.fromUserId;

//       uniqueUsersMap.set(
//         connectedUser._id.toString(),
//         connectedUser
//       );
//     });

//     res.status(200).json(Array.from(uniqueUsersMap.values()));
//   } catch (err) {
//     console.error("Connections error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id.toString();

    const connectionRequests = await connectionRequest
      .find({
        status: "accepted",
        $or: [
          { fromUserId: loggedInUserId },
          { toUserId: loggedInUserId }
        ]
      })
      .populate("fromUserId", "firstName lastName photoUrl")
      .populate("toUserId", "firstName lastName photoUrl");

    const uniqueUsersMap = new Map();

    connectionRequests.forEach((request) => {
      if (!request.fromUserId || !request.toUserId) return;

      const connectedUser =
        request.fromUserId._id.toString() === loggedInUserId
          ? request.toUserId
          : request.fromUserId;

      uniqueUsersMap.set(connectedUser._id.toString(), connectedUser);
    });

    res.status(200).json(Array.from(uniqueUsersMap.values()));
  } catch (err) {
    console.error("Connections error:", err);
    res.status(500).json({ error: err.message });
  }
});


userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page=parseInt(req.query.page)||1;
    let limit=parseInt(req.query.limit)||10;
    limit =limit>50?50 :limit;
    const skip=(page-1)*limit;
    const loggedInUserId = req.user._id; // usually req.user contains _id
    // Step 1: Find all connection requests involving the logged-in user
   const ConnectionRequest = await connectionRequest.find({
  status: "accepted", // 🔥 IMPORTANT
  $or: [
    { fromUserId: loggedInUserId },
    { toUserId: loggedInUserId },
  ],
})
const totalUsers = await User.countDocuments();
console.log("TOTAL USERS:", totalUsers);
    // Step 2: Build a set of users to hide
    const hiddenFromUserId = new Set();
    ConnectionRequest.forEach((req) => {
      hiddenFromUserId.add(req.fromUserId.toString());
      hiddenFromUserId.add(req.toUserId.toString());
    });

    // Also hide the logged-in user themselves
    hiddenFromUserId.add(loggedInUserId.toString());

    // Step 3: Find all users not in that set
    const users = await User.find({
      _id: { $nin: Array.from(hiddenFromUserId) },
    }).skip(skip).limit(limit);

    // Step 4: Send the result
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});



module.exports = userRouter;