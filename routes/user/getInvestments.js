const express = require("express");
const UserAuth = require("../../middleware/userAuth");
const Investment = require("../../model/Investment");


const router = express.Router();

router.get("/", UserAuth, async (req, res) => {
   const user = req.user;
   const investments = await Investment.find({user: user.username});

   res.send(investments);
});

module.exports = router;
