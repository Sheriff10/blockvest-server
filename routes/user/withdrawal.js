const express = require("express");
const UserAuth = require("../../middleware/userAuth");
const User = require("../../model/user");
const Withdrawal = require("../../model/withdrawal");

const router = express.Router();

router.post("/", [UserAuth], async (req, res) => {
   const { amount, address } = req.body;
   const user = req.user;
   const userID = user._id;
   const userBalance = parseInt(user.balance);
   const amt = parseInt(amount);

   if (amt > userBalance)
      return res.status(400).send({ error: "insufficient funds" });

   // update user balance
   const newBalance = userBalance - amt;
   const newWithdrawal = parseInt(user.withdrawal) + amt;

   await User.findByIdAndUpdate(userID, {
      balance: newBalance,
      withdrawal: newWithdrawal,
   });

   const withdrawal = new Withdrawal({
      user: user.username,
      amount,
      address,
   });

   await withdrawal.save();

   return res.status(200).send({ message: "New withdrawal" });
});

module.exports = router;
