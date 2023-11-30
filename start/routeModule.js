const signup = require("../routes/signup");
const signin = require("../routes/signin");
// user
const dashboard = require("../routes/user/dashboard");
const withdrawal = require("../routes/user/withdrawal");
const deposit = require("../routes/user/deposit");
const investment = require("../routes/user/invest");
const getDeposit = require("../routes/user/getDeposits");
const getInvestment = require("../routes/user/getInvestments");
// admin
const adminDeposit = require("../routes/admin/allDeposit");
const updateDeposit = require("../routes/admin/updateDeposit");

const routesModule = (app) => {
   app.use("/user/signup", signup);
   app.use("/user/signin", signin);

   // User Route Module
   app.use("/user/dashboard", dashboard);
   app.use("/user/witdrawal", withdrawal);
   app.use("/user/deposit", deposit);
   app.use("/user/get-deposit", getDeposit);
   app.use("/user/get-investment", getInvestment);
   app.use("/user/investment", investment);

   // Admin route modules
   app.use("/admin/get-deposit", adminDeposit);
   app.use("/admin/update-deposit", updateDeposit);

};

module.exports = routesModule;
