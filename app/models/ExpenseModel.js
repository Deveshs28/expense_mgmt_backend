const time = require("../libs/timeLib");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let expenseScheme = new Schema({
  expenseId: {
    type: String,
    default: "",
    index: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  groupId: {
    type: String,
    default: "",
  },
  paidByUserId: {
    type: String,
    default: "",
  },
  userList: [],
  createdByName: {
    type: String,
    default: "",
  },
  createdById: {
    type: String,
    default: "",
  },
  createdOn: {
    type: Date,
    default: time.getLocalTime(),
  },
  updatedOn: {
    type: Date,
    default: time.getLocalTime(),
  },
});

mongoose.model("Expense", expenseScheme);
