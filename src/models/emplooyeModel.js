const mongoose = require("mongoose");

const emplooyeSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Emplooye = mongoose.model("emplooyes", emplooyeSchema);

module.exports = Emplooye;
