const time = require("../libs/timeLib");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let expenseHistoryScheme = new Schema({
  historyId: {
    type: String,
    default: "",
    index: true,
    unique: true,
  },
  message: {
    type: String,
    default: "",
  },
  expenseId: {
    type: String,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: time.getLocalTime(),
  },
});

mongoose.model("ExpenseHistory", expenseHistoryScheme);
