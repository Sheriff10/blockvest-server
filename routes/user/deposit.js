const express = require("express");
const UserAuth = require("../../middleware/userAuth");
const Deposit = require("../../model/deposit");

const router = express.Router();

router.post("/", UserAuth, async (req, res) => {
   const { hash, amount } = req.body;
   const user = req.user;

   const findHash = await Deposit.findOne({ hash });
   if (findHash) return res.status(400).send({ error: "Hash exist" });
   const deposit = new Deposit({
      user: user.username,
      amount,
      hash,
   });

   try {
      await deposit.save();
      res.status(200).send({message: "deposit recorded"})
   } catch (error) {
      console.log(error);
   }
});

module.exports = router;
