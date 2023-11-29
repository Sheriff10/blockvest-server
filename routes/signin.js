const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../model/user");
const UserToken = require("../utils/userToken");

const router = express.Router();

router.post("/", async (req, res) => {
   const { password, username } = req.body;

   // Check if Username Exists
   const isUsernameValid = await User.findOne({ username });
   if (!isUsernameValid)
      return res.status(404).send({ error: "Username Not found" });

   const encryptedPassword = isUsernameValid.password;

   // compare password
   const isPasswordValid = await bcrypt.compare(password, encryptedPassword);

   if (!isPasswordValid)
      return res.status(400).send({ error: "Username Not found" });

   // Generate User Token
   const userToken = UserToken(username);
   res.header("user-auth-token", userToken);
   res.header("Access-Control-Expose-Headers", "user-auth-token");
   return res.status(200).send({ message: "Authenticated Successfully" });
});

module.exports = router;
