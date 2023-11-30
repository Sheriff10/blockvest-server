const mongoose = require("mongoose");

const { format, add } = require("date-fns");

// Get the current date and format it
const currentDate = new Date();
const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");

// Add 7 days to the current date
const sevenDaysLater = add(currentDate, { days: 7 });
const formattedSevenDaysLater = format(sevenDaysLater, "yyyy-MM-dd HH:mm:ss");

const InvestmentSchema = mongoose.Schema({
   user: String,
   plan: String,
   amount: String,
   expected: String,
   invested_date: { type: String, default: formattedDate },
   maturity_date: { type: String, default: formattedSevenDaysLater },
   status: { type: String, default: "not matured" },
});

const Investment = mongoose.model("investment", InvestmentSchema);

module.exports = Investment;
