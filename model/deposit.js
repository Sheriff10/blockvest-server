const mongoose = require("mongoose");

const { format } = require('date-fns');

// Get the current date and format it
const currentDate = new Date();
const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

const DepositSchema = mongoose.Schema({
   user: String,
   amount: String,
   hash: String,
   status: { type: String, default: "pending" },
   date: { type: String, default: formattedDate },
});

const Deposit = mongoose.model("deposit", DepositSchema);

module.exports = Deposit;
