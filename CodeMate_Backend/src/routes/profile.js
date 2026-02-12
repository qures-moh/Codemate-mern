const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { validateUpdateProfile } = require("../../utils/validation");
const {userAuth }= require("../../middleware/user"); 


profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch profile" });
  }
});



profileRouter.patch("/profile/update", userAuth, async (req, res) => {
    console.log("UPDATE PROFILE HIT"); 
  try {
    validateUpdateProfile(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.send({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});


module.exports = profileRouter;