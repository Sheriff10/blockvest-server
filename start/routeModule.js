const signup = require("../routes/signup");
const signin = require("../routes/signin");
// user
const dashboard = require("../routes/user/dashboard");
const withdrawal = require("../routes/user/withdrawal");
const deposit = require("../routes/user/deposit");
const getDeposit = require("../routes/user/getDeposits");
// admin
const adminDeposit = require("../routes/admin/allDeposit");

const routesModule = (app) => {
   app.use("/user/signup", signup);
   app.use("/user/signin", signin);

   // User Route Module
   app.use("/user/dashboard", dashboard);
   app.use("/user/witdrawal", withdrawal);
   app.use("/user/deposit", deposit);
   app.use("/user/get-deposit", getDeposit);

   // Admin route modules
   app.use("/admin/get-deposit", adminDeposit);

};

module.exports = routesModule;
