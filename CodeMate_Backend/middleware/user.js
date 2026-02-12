const User = require("../src/models/user");
const jwt = require("jsonwebtoken");


const AdminAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).send("Authentication token missing");

        const decoded = jwt.verify(token, "secret_key");

        if (!decoded.isAdmin) {
            return res.status(401).send("Admin privileges required");
        }
        

        req.user = decoded; 
        next(); 
    } catch (err) {
        console.log("Admin auth error:", err.message);
        return res.status(401).send("Invalid or expired token");
    }
};



const userAuth = async (req, res, next) => {
    try{
   const token = req.cookies?.token;
     if (!token) {
            return res.status(401).send("Authentication token missing");
        }
    const decodedMessage = jwt.verify(token, "secret_key");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
  return res.status(401).send("User does not exist");

    }
    req.user=user;
    next();
}
    catch (err) {
        console.log("User auth error:", err.message);
        return res.status(401).send("Invalid or expired token");
    }
}
module.exports = { AdminAuth,
        userAuth,
 };