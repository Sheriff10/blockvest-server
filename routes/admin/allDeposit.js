const express = require("express");
const UserAuth = require("../../middleware/userAuth");
const Deposit = require("../../model/deposit");

const router = express.Router();

router.get("/", UserAuth, async (req, res) => {
   const user = req.user;
   const deposits = await Deposit.find();

   res.send(deposits);
});

module.exports = router;
