const express = require("express");
const UserAuth = require("../../middleware/userAuth");
const Deposit = require("../../model/deposit");
const User = require("../../model/user");

const router = express.Router();

router.post("/", UserAuth, async (req, res) => {
   const { _id, status, username, amount } = req.body;

   const isIdValid = await Deposit.findById(_id);
   if (!isIdValid) return res.send(400).send({ error: "Invalid deposit Id" });

   // get user balance and add the new balance else

   switch (status) {
      case "confirmed":
         if (isIdValid.status === "confirmed")
            return res.send(200).send({ message: "Deposit already confirmed" });
            
         const user = await User.findOne({ username });
         if (!user) return res.send(404).send({ error: "User not found" });

         const userBalance = parseInt(user.balance);
         const amt = parseInt(amount);

         const userNewBalance = userBalance + amt;
         await User.findByIdAndUpdate(user._id, { balance: userNewBalance });

         await Deposit.findByIdAndUpdate(_id, { status });
         return res.status(200).send({ message: "Deposit Confirmed" });

      case "delete":
         await Deposit.findByIdAndDelete(_id);
         return res.status(200).send({ message: "Deposit Deleted" });
      default:
         return res.status(400).send({ message: "Invalid request" });
   }
});

module.exports = router;
