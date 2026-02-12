const express = require("express");
const authRouter = express.Router();
const User = require("../models/user")
const { validateSignUp } = require("../../utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");



authRouter.post("/login", async (req, res) => {
   console.log(req.body)
   const { emailId, password } = req.body;
   try {
      const user = await User.findOne({ emailId});
      if (!user) {
         throw new Error("Invalid credentials1");
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
         throw new Error("Invalid credentials2")
      }

      const token = await user.getJwt();
      if (!token) {
         throw new Error("Invalid token3");
      }

      res.cookie("token", token, {
         httpOnly: true,
           sameSite: "none",   // 🔥 REQUIRED for PATCH
  secure: true   

      });
      res.send(user)
   }
   catch (err) {
       console.log("BACKEND ERROR 👉", err.message);
  return res.status(400).json({ error: err.message });
   }
});


authRouter.post("/signup", async (req, res) => {
  try {
    // ✅ VALIDATE BODY
    validateSignUp(req.body);

    const { firstName, lastName, emailId, password } = req.body;

    // ✅ CHECK DUPLICATE EMAIL
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE USER
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await newUser.save();

    const token = await newUser.getJwt();

   
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    // ✅ SEND USER (NO PASSWORD)
    return res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      emailId: newUser.emailId,
    });

  } catch (err) {
  console.log("BACKEND ERROR 👉", err.message);
  return res.status(400).json({ error: err.message });
  }
});



authRouter.post("/logout", (req, res) => {
   res.cookie("token", null, {
      expires: new Date(Date.now())
   })


   res.send("Loggout")

});



module.exports = authRouter;