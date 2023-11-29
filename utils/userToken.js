const jwt = require("jsonwebtoken");

const UserToken = (data) => {
   const userToken = jwt.sign({username: data}, "user-token", { expiresIn: "900s" });
   return userToken;
};

module.exports = UserToken