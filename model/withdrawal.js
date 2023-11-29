const mongoose = require("mongoose");

const WithdrawalSchema = mongoose.Schema({
   user: String,
   amount: String,
   address: String,
   status: { type: String, default: "pending" },
});

const Withdrawal = mongoose.model("withdrawal", WithdrawalSchema);

module.exports = Withdrawal;
