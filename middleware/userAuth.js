const jwt = require("jsonwebtoken");
const User = require("../model/user");

const UserAuth = async (req, res, next) => {
   const token = req.header("user-auth-token");

   if (!token) return res.status(401).send("Access Denied!");
   else {
      try {
         const decode = jwt.verify(token, "user-token");
         const username = decode.username;
         const user = await User.findOne({ username });
         req.user = user;

         console.log( decode)

         next();
      } catch (error) {
         res.status(401).send("Invalid Token");
      }
   }
};

module.exports = UserAuth;
