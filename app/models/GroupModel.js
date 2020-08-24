const time = require("../libs/timeLib");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let groupScheme = new Schema({
  groupId: {
    type: String,
    default: "",
    index: true,
    unique: true,
  },
  name: {
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
});

mongoose.model("Group", groupScheme);
