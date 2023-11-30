const express = require("express");
const UserAuth = require("../../middleware/userAuth");
const Deposit = require("../../model/deposit");
const Investment = require("../../model/Investment");
const User = require("../../model/user");

const router = express.Router();

router.post("/", UserAuth, async (req, res) => {
   try {
      const { plan, amount, expected } = req.body;
      const user = req.user;

      const userBalance = parseInt(user.balance);
      const amt = parseInt(amount);

      if (amt > userBalance) {
         return res.status(400).send({ error: "Insufficient Funds" });
      }

      const userNewBalance = userBalance - amt;

      // Update user balance
      await User.findByIdAndUpdate(user._id, { balance: userNewBalance });

      //update user invested.
      const invested = parseInt(user.invested);
      const newInvestedBalance = invested + amt;

      await User.findByIdAndUpdate(user._id, {
         invested: newInvestedBalance,
      });

      // Record the investment
      const investment = new Investment({
         user: user.username,
         plan,
         amount,
         expected,
      });

      await investment.save();

      return res.status(200).send({ message: "Investment Confirmed" });
   } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
   }
});

module.exports = router;
