const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
   country: String,
   email: String,
   name: String,
   password: String,
   username: String,
   balance: { type: String, default: 0 },
   deposit: { type: String, default: 0 },
   withdrawal: { type: String, default: 0 },
   invested: { type: String, default: 0 },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
