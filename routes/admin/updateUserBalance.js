const express = require("express");
const User = require("../../model/user");

const router = express.Router();

router.post("/", async (req, res) => {
   const { username, amount } = req.body;
   const getUser = await User.findOne({ username });

   if (!getUser) return res.status(404).send({ error: "User Not Found" });

   const getPrevBalance = parseInt(getUser.balance);
   const amt = parseInt(amount);

   const newBalance = getPrevBalance + amt;

   await User.updateOne({ username }, { $set: { balance: newBalance } });

   res.status(200).send({ message: "Balance Added" });
});

module.exports = router;
