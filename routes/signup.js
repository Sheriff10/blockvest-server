const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");

const router = express.Router();

router.post("/", async (req, res) => {
   const { country, email, name, password, username } = req.body;

   // Check if Username Exists
   const isUsernameValid = await User.findOne({ username });
   if (isUsernameValid)
      return res.status(400).send({ error: "Username Exists" });

   const encryptedPassword = await bcrypt.hash(password, 10);

   const user = new User({
      country,
      email,
      name,
      password: encryptedPassword,
      username,
   });
   await user.save();
   return res.status(200).send({ message: "User Registered Successfully" });
});

module.exports = router;
