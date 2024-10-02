const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vansIds: [{ type: String, ref: "Van" }],
});

module.exports = mongoose.model("Host", hostSchema);
