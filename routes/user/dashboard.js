const express = require("express");
const UserAuth = require("../../middleware/userAuth");

const router = express.Router();

router.get("/", [UserAuth], async (req, res) => {
   // user stats
   const user = req.user;
   const deposit = user.deposit;
   const balance = user.balance;
   const withdrawal = user.withdrawal;
   const invested = user.invested;

   const stats = { deposit, balance, withdrawal, invested };

   res.status(200).send({ message: "Success", stats });
});

module.exports = router;
