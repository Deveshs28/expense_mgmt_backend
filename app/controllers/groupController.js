const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("../libs/timeLib");
const response = require("../libs/responseLib");
const logger = require("../libs/loggerLib");
const check = require("../libs/checkLib");
const e = require("express");

const User = mongoose.model("User");
const Group = mongoose.model("Group");
const Expense = mongoose.model("Expense");
const ExpenseHistory = mongoose.model("ExpenseHistory");

const requestPromise = require("request-promise");
const nodemailer = require("nodemailer");

let createGroup = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.name) {
        if (check.isEmpty(req.body.name)) {
          let apiResponse = response.generate(
            true,
            "Group name is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(req.body.createdByName)) {
          let apiResponse = response.generate(
            true,
            "Created By Name is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error(
          "Field missing error during group creation",
          "groupController: createGroup()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let createNewGroup = () => {
    return new Promise((resolve, reject) => {
      let newGroup = new Group({
        groupId: shortid.generate(),
        name: req.body.name,
        createdByName: req.body.createdByName,
        createdById: req.body.createdById,
        createdOn: time.now(),
      });

      let userList = [];
      userList.push(req.body.createdById);

      newGroup.userList = userList;

      newGroup.save((err, newGroup) => {
        if (err) {
          console.log(err);
          logger.error(err.message, "groupController: createGroup", 10);
          let apiResponse = response.generate(
            true,
            "Failed to create new group",
            500,
            null
          );
          reject(apiResponse);
        } else {
          let newGroupObj = newGroup.toObject();
          resolve(newGroupObj);
        }
      });
    });
  };

  let addUserToGroup = (group) => {
    return new Promise((resolve, reject) => {
      User.findOne({ userId: req.body.createdById }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting user",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "User not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          result.groupList.push(group.groupId);
          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting user",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(group);
            }
          });
        }
      });
    });
  };

  validateInput(req, res)
    .then(createNewGroup)
    .then(addUserToGroup)
    .then((resolve) => {
      let apiResponse = response.generate(false, "Group created", 200, resolve);
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let userGroupList = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.userId) {
        if (req.params.page) {
          if (req.params.recordCount) {
            resolve(req);
          } else {
            logger.error(
              "Field missing error during user group list",
              "groupController: userGroupList()",
              5
            );
            let apiResponse = response.generate(
              true,
              "One or More Parameter(s) is missing",
              400,
              null
            );
            reject(apiResponse);
          }
        } else {
          logger.error(
            "Field missing error during user group list",
            "groupController: userGroupList()",
            5
          );
          let apiResponse = response.generate(
            true,
            "One or More Parameter(s) is missing",
            400,
            null
          );
          reject(apiResponse);
        }
      } else {
        logger.error(
          "Field missing error during user group list",
          "groupController: userGroupList()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let groupCount = () => {
    return new Promise((resolve, reject) => {
      Group.count(
        {
          userList: { $all: [req.params.userId] },
        },
        function (err, result) {
          if (err) {
            logger.error(err.message, "groupController:groupList", 10);
            let apiResponse = response.generate(
              true,
              "Failed to find group data",
              500,
              null
            );
            reject(apiResponse);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  let groupList = (count) => {
    return new Promise((resolve, reject) => {
      let pageNumber = parseInt(req.params.page);
      let recordCount = parseInt(req.params.recordCount);

      Group.find({
        userList: { $all: [req.params.userId] },
      })
        .skip(pageNumber > 0 ? (pageNumber - 1) * recordCount : 0)
        .limit(recordCount)
        .select("-__v -_id") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            logger.error(err.message, "groupController:userGroupList", 10);
            let apiResponse = response.generate(
              true,
              "Failed to find group data",
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(result)) {
            logger.info("No Issue found", "groupController:userGroupList", 5);
            let apiResponse = response.generate(
              true,
              "No group found",
              204,
              null
            );
            reject(apiResponse);
          } else {
            let apiResp = {
              count: count,
              groupList: result,
            };
            resolve(apiResp);
          }
        });
    });
  };

  validateInput(req, res)
    .then(groupCount)
    .then(groupList)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "All User Group data found",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let createExpense = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.name) {
        if (check.isEmpty(req.body.name)) {
          let apiResponse = response.generate(
            true,
            "Expense name is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(req.body.createdByName)) {
          let apiResponse = response.generate(
            true,
            "Created By Name is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(req.body.amount)) {
          let apiResponse = response.generate(
            true,
            "Amount is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(req.body.groupId)) {
          let apiResponse = response.generate(
            true,
            "Group id is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error(
          "Field missing error during expense creation",
          "groupController: createExpense()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let createNewExpense = () => {
    return new Promise((resolve, reject) => {
      let newExpense = new Expense({
        expenseId: shortid.generate(),
        name: req.body.name,
        amount: req.body.amount,
        groupId: req.body.groupId,
        paidByUserId: req.body.paidByUserId,
        createdByName: req.body.createdByName,
        createdById: req.body.createdById,
        createdOn: time.now(),
      });

      let userList = [];
      let isDiffUser = false;
      userList.push(req.body.createdById);
      if (req.body.createdById !== req.body.paidByUserId) {
        isDiffUser = true;
        userList.push(req.body.paidByUserId);
      }

      newExpense.userList = userList;

      newExpense.save((err, newExpense) => {
        if (err) {
          console.log(err);
          logger.error(err.message, "groupController: createExpense", 10);
          let apiResponse = response.generate(
            true,
            "Failed to create new expense",
            500,
            null
          );
          reject(apiResponse);
        } else {
          let newExpenseObj = newExpense.toObject();

          if (isDiffUser) {
            User.findOne({ userId: req.body.paidByUserId }, (err, result) => {
              if (err) {
                resolve(newExpenseObj);
              } else if (check.isEmpty(result)) {
                resolve(newExpenseObj);
              } else {
                result.expenseList.push(newExpenseObj.expenseId);
                result.save(function (err, result) {
                  if (err) {
                    resolve(newExpenseObj);
                  } else {
                    resolve(newExpenseObj);
                  }
                });
              }
            });
          } else {
            resolve(newExpenseObj);
          }
        }
      });
    });
  };

  let updateUserExpense = (expense) => {
    return new Promise((resolve, reject) => {
      User.findOne({ userId: req.body.createdById }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting user",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "User not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          result.expenseList.push(expense.expenseId);
          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting user",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(expense);
            }
          });
        }
      });
    });
  };

  let sendEmail = (expense) => {
    return new Promise((resolve, reject) => {
      User.find({
        expenseList: { $all: [expense.expenseId] },
      })
        .select("-__v -_id -password -createdOn") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            resolve(expense);
          } else if (check.isEmpty(result)) {
            resolve(expense);
          } else {
            let count = 0;
            for (let res of result) {
              count++;
              let email = res.email;
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "acctest.sdev@gmail.com", // generated ethereal user
                  pass: "acc@test", // generated ethereal password
                },
              });
              const mailOptions = {
                from: "acctest.sdev@gmail.com",
                to: email,
                subject: "Expense Management System| Expense Support",
                text: "Expense Created", // plain text body
                html:
                  "<b>New Expense create: </b><br>" +
                  expense.name +
                  "<br><p>Thanks<br>Support Team</p>",
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  if (count === result.length) {
                    resolve(expense);
                  }
                } else {
                  console.log("Email sent: " + info.response);
                  if (count === result.length) {
                    resolve(expense);
                  }
                }
              });
            }
          }
        });
    });
  };

  let expenseHistory = (newExpenseObj) => {
    return new Promise((resolve, reject) => {
      let newExpenseHistory = new ExpenseHistory({
        historyId: shortid.generate(),
        message: `${req.body.createdByName} create ${newExpenseObj.name} expense.`,
        expenseId: newExpenseObj.expenseId,
        createdOn: time.now(),
      });

      newExpenseHistory.save((err, newExpenseHistory) => {
        if (err) {
          console.log(err);
          logger.error(
            err.message,
            "groupController: createExpenseHistory",
            10
          );
          let apiResponse = response.generate(
            true,
            "Failed to create new expense history",
            500,
            null
          );
          reject(apiResponse);
        } else {
          resolve(newExpenseObj);
        }
      });
    });
  };

  validateInput(req, res)
    .then(createNewExpense)
    .then(updateUserExpense)
    .then(sendEmail)
    .then(expenseHistory)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "Expense created",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let addUserInGroup = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.groupId) {
        if (check.isEmpty(req.params.userId)) {
          let apiResponse = response.generate(
            true,
            "User id is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error(
          "Field missing error during user addition in group",
          "groupController: addUserInGroup()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let findGroup = () => {
    return new Promise((resolve, reject) => {
      Group.findOne({ groupId: req.params.groupId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting group",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Group not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          let userId = req.params.userId;
          result.userList.push(userId);
          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting group",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  };

  let updateUserGroup = (group) => {
    return new Promise((resolve, reject) => {
      User.findOne({ userId: req.params.userId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting user",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "User not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          result.groupList.push(req.params.groupId);
          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting user",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(group);
            }
          });
        }
      });
    });
  };

  validateInput(req, res)
    .then(findGroup)
    .then(updateUserGroup)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "User added in group",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let addUserInExpense = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.expenseId) {
        if (check.isEmpty(req.body.userId)) {
          let apiResponse = response.generate(
            true,
            "User id is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(req.body.userName)) {
          let apiResponse = response.generate(
            true,
            "User name is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(req.body.addedByUser)) {
          let apiResponse = response.generate(
            true,
            "Added by user is not valid",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error(
          "Field missing error during user addition in expense",
          "groupController: addUserInExpense()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let findExpense = () => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting expense",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Expense not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          let userId = req.body.userId;
          result.userList.push(userId);
          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting expense",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  };

  let updateUserExpense = (expense) => {
    return new Promise((resolve, reject) => {
      User.findOne({ userId: req.body.userId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting user",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "User not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          result.expenseList.push(expense.expenseId);
          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting user",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(expense);
            }
          });
        }
      });
    });
  };

  let sendEmail = (expense) => {
    return new Promise((resolve, reject) => {
      User.find({
        expenseList: { $all: [expense.expenseId] },
      })
        .select("-__v -_id -password -createdOn") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            resolve(expense);
          } else if (check.isEmpty(result)) {
            resolve(expense);
          } else {
            let count = 0;
            for (let res of result) {
              count++;
              let email = res.email;
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "acctest.sdev@gmail.com", // generated ethereal user
                  pass: "acc@test", // generated ethereal password
                },
              });
              const mailOptions = {
                from: "acctest.sdev@gmail.com",
                to: email,
                subject: "Expense Management System| Expense Support",
                text: "Expense Updated", // plain text body
                html:
                  "<b>A new user added in expense : </b><br>" +
                  expense.name +
                  "<br><p>Thanks<br>Support Team</p>",
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  if (count === result.length) {
                    resolve(expense);
                  }
                } else {
                  console.log("Email sent: " + info.response);
                  if (count === result.length) {
                    resolve(expense);
                  }
                }
              });
            }
          }
        });
    });
  };

  let expenseHistory = (expenseObj) => {
    return new Promise((resolve, reject) => {
      let newExpenseHistory = new ExpenseHistory({
        historyId: shortid.generate(),
        message: `${req.body.addedByUser} added ${req.body.userName} in expense.`,
        expenseId: req.params.expenseId,
        createdOn: time.now(),
      });

      newExpenseHistory.save((err, newExpenseHistory) => {
        if (err) {
          console.log(err);
          logger.error(
            err.message,
            "groupController: createExpenseHistory",
            10
          );
          let apiResponse = response.generate(
            true,
            "Failed to create new expense history",
            500,
            null
          );
          reject(apiResponse);
        } else {
          resolve(expenseObj);
        }
      });
    });
  };

  validateInput(req, res)
    .then(findExpense)
    .then(updateUserExpense)
    .then(sendEmail)
    .then(expenseHistory)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "User added in expense",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let userListByGroup = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.groupId) {
        resolve(req);
      } else {
        logger.error(
          "Field missing error during user list by group",
          "groupController: userListByGroup()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let userList = () => {
    return new Promise((resolve, reject) => {
      User.find({
        groupList: { $all: [req.params.groupId] },
      })
        .select("-__v -_id") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            logger.error(err.message, "groupController:userListByGroup", 10);
            let apiResponse = response.generate(
              true,
              "Failed to find user data",
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(result)) {
            logger.info("No Issue found", "groupController:userListByGroup", 5);
            let apiResponse = response.generate(
              true,
              "No user found",
              204,
              null
            );
            reject(apiResponse);
          } else {
            resolve(result);
          }
        });
    });
  };

  validateInput(req, res)
    .then(userList)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "All User data found",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let groupDetail = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.groupId) {
        resolve(req);
      } else {
        logger.error(
          "Field missing error during group detail",
          "groupController: groupDetail()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let findGroup = () => {
    console.log("groupId", req.params.groupId);
    return new Promise((resolve, reject) => {
      Group.findOne({ groupId: req.params.groupId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting group",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Group not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    });
  };

  let memberList = (group) => {
    return new Promise((resolve, reject) => {
      User.find({
        groupList: { $all: [group.groupId] },
      })
        .select("-__v -_id") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            const obj = {
              group: group,
              membersList: [],
            };
            resolve(obj);
          } else if (check.isEmpty(result)) {
            const obj = {
              group: group,
              membersList: [],
            };
            resolve(obj);
          } else {
            const obj = {
              group: group,
              membersList: result,
            };
            resolve(obj);
          }
        });
    });
  };

  let expenseList = (groupObj) => {
    return new Promise((resolve, reject) => {
      Expense.find({ groupId: req.params.groupId })
        .select("-__v -_id") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            let obj = {
              group: groupObj.group,
              membersList: groupObj.membersList,
              expenseList: [],
            };
            resolve(obj);
          } else if (check.isEmpty(result)) {
            let obj = {
              group: groupObj.group,
              membersList: groupObj.membersList,
              expenseList: [],
            };
            resolve(obj);
          } else {
            let obj = {
              group: groupObj.group,
              membersList: groupObj.membersList,
              expenseList: result,
            };
            resolve(obj);
          }
        });
    });
  };

  validateInput(req, res)
    .then(findGroup)
    .then(memberList)
    .then(expenseList)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "Group data found",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let expenseDetail = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.expenseId) {
        resolve(req);
      } else {
        logger.error(
          "Field missing error during expense detail",
          "groupController: expenseDetail()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let findExpense = () => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting expense",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Expense not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    });
  };

  let memberList = (expense) => {
    return new Promise((resolve, reject) => {
      User.find({
        expenseList: { $all: [expense.expenseId] },
      })
        .select("-__v -_id") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            const obj = {
              expense: expense,
              membersList: [],
            };
            resolve(obj);
          } else if (check.isEmpty(result)) {
            const obj = {
              expense: expense,
              membersList: [],
            };
            resolve(obj);
          } else {
            const obj = {
              expense: expense,
              membersList: result,
            };
            resolve(obj);
          }
        });
    });
  };

  let expenseHistoryList = (expenseObj) => {
    return new Promise((resolve, reject) => {
      ExpenseHistory.find({ expenseId: req.params.expenseId })
        .select("-__v -_id") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            let obj = {
              expense: expenseObj.expense,
              membersList: expenseObj.membersList,
              expenseHistory: [],
            };
            resolve(obj);
          } else if (check.isEmpty(result)) {
            let obj = {
              expense: expenseObj.expense,
              membersList: expenseObj.membersList,
              expenseHistory: [],
            };
            resolve(obj);
          } else {
            let obj = {
              expense: expenseObj.expense,
              membersList: expenseObj.membersList,
              expenseHistory: result,
            };
            resolve(obj);
          }
        });
    });
  };

  validateInput(req, res)
    .then(findExpense)
    .then(memberList)
    .then(expenseHistoryList)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "Expense data found",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let deleteExpenseRecord = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.expenseId) {
        resolve(req);
      } else {
        logger.error(
          "Field missing error during expesne deletion",
          "groupController: deleteExpenseRecord()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let findExpense = () => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting expense",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Expense not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    });
  };

  let sendEmail = (expense) => {
    return new Promise((resolve, reject) => {
      User.find({
        expenseList: { $all: [expense.expenseId] },
      })
        .select("-__v -_id -password -createdOn") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            resolve(expense);
          } else if (check.isEmpty(result)) {
            resolve(expense);
          } else {
            let count = 0;
            for (let res of result) {
              count++;
              let email = res.email;
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "acctest.sdev@gmail.com", // generated ethereal user
                  pass: "acc@test", // generated ethereal password
                },
              });
              const mailOptions = {
                from: "acctest.sdev@gmail.com",
                to: email,
                subject: "Expense Management System| Expense Support",
                text: "Expense Deleted", // plain text body
                html:
                  "<b>User delete expense : </b><br>" +
                  expense.name +
                  "<br><p>Thanks<br>Support Team</p>",
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  if (count === result.length) {
                    resolve(expense);
                  }
                } else {
                  console.log("Email sent: " + info.response);
                  if (count === result.length) {
                    resolve(expense);
                  }
                }
              });
            }
          }
        });
    });
  };

  let deleteExpense = () => {
    return new Promise((resolve, reject) => {
      Expense.remove({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting expense",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Expense not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    });
  };

  validateInput(req, res)
    .then(findExpense)
    .then(sendEmail)
    .then(deleteExpense)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "Expense Deleted Successfully",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let updateExpenseAmount = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.expenseId) {
        resolve(req);
      } else {
        logger.error(
          "Field missing error during expense amount update",
          "groupController: updateExpenseAmount()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let findExpense = () => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting expense",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Expense not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          let oldAmount = result.amount;
          result.amount = req.body.amount;
          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting expense",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(oldAmount);
            }
          });
        }
      });
    });
  };

  let sendEmailExpense = (oldAmount) => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          resolve(oldAmount);
        } else if (check.isEmpty(result)) {
          resolve(oldAmount);
        } else {
          const expense = result;
          User.find({
            expenseList: { $all: [expense.expenseId] },
          })
            .select("-__v -_id -password -createdOn") //Hide the information which need not to send in response
            .lean() //Return plain javascript object instead of mongoose object on which we can perform function
            .exec((err, result) => {
              if (err) {
                resolve(oldAmount);
              } else if (check.isEmpty(result)) {
                resolve(oldAmount);
              } else {
                let count = 0;
                for (let res of result) {
                  count++;
                  let email = res.email;
                  let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "acctest.sdev@gmail.com", // generated ethereal user
                      pass: "acc@test", // generated ethereal password
                    },
                  });
                  const mailOptions = {
                    from: "acctest.sdev@gmail.com",
                    to: email,
                    subject: "Expense Management System| Expense Support",
                    text: "Expense Updated", // plain text body
                    html:
                      "<b>User updated amount of expense : </b><br>" +
                      expense.name +
                      "<br><p>Thanks<br>Support Team</p>",
                  };
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                      if (count === result.length) {
                        resolve(oldAmount);
                      }
                    } else {
                      console.log("Email sent: " + info.response);
                      if (count === result.length) {
                        resolve(oldAmount);
                      }
                    }
                  });
                }
              }
            });
        }
      });
    });
  };

  let expenseHistory = (oldAmount) => {
    return new Promise((resolve, reject) => {
      let newExpenseHistory = new ExpenseHistory({
        historyId: shortid.generate(),
        message: `${req.body.updatedByName} updated expense amount from ${oldAmount} to ${req.body.amount}.`,
        expenseId: req.params.expenseId,
        createdOn: time.now(),
      });

      newExpenseHistory.save((err, newExpenseHistory) => {
        let obj = {
          message: "Expense Updated",
        };
        resolve(obj);
      });
    });
  };

  validateInput(req, res)
    .then(findExpense)
    .then(sendEmailExpense)
    .then(expenseHistory)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "Expense Amount Updated Successfully",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let updateExpensePayee = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.expenseId) {
        resolve(req);
      } else {
        logger.error(
          "Field missing error during expense payee update",
          "groupController: updateExpensePayee()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let findExpense = () => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting expense",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Expense not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          result.paidByUserId = req.body.paidByUserId;
          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting expense",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  };

  let findExpenseObj = () => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting expense",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Expense not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    });
  };

  let sendEmail = (expense) => {
    return new Promise((resolve, reject) => {
      User.find({
        expenseList: { $all: [expense.expenseId] },
      })
        .select("-__v -_id -password -createdOn") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            resolve(expense);
          } else if (check.isEmpty(result)) {
            resolve(expense);
          } else {
            let count = 0;
            for (let res of result) {
              count++;
              let email = res.email;
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "acctest.sdev@gmail.com", // generated ethereal user
                  pass: "acc@test", // generated ethereal password
                },
              });
              const mailOptions = {
                from: "acctest.sdev@gmail.com",
                to: email,
                subject: "Expense Management System| Expense Support",
                text: "Expense Payee Updated", // plain text body
                html:
                  "<b>User updated payee of expense : </b><br>" +
                  expense.name +
                  "<br><p>Thanks<br>Support Team</p>",
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  if (count === result.length) {
                    resolve(expense);
                  }
                } else {
                  console.log("Email sent: " + info.response);
                  if (count === result.length) {
                    resolve(expense);
                  }
                }
              });
            }
          }
        });
    });
  };

  let expenseHistory = () => {
    return new Promise((resolve, reject) => {
      let newExpenseHistory = new ExpenseHistory({
        historyId: shortid.generate(),
        message: `${req.body.updatedByName} updated expense payee to ${req.body.paidByUsername}.`,
        expenseId: req.params.expenseId,
        createdOn: time.now(),
      });

      newExpenseHistory.save((err, newExpenseHistory) => {
        let obj = {
          message: "Expense Updated",
        };
        resolve(obj);
      });
    });
  };

  validateInput(req, res)
    .then(findExpense)
    .then(findExpenseObj)
    .then(sendEmail)
    .then(expenseHistory)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "Expense Payee Updated Successfully",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let userListByExpense = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.expenseId) {
        resolve(req);
      } else {
        logger.error(
          "Field missing error during user list by expense",
          "groupController: userListByExpense()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let userList = () => {
    return new Promise((resolve, reject) => {
      User.find({
        expenseList: { $all: [req.params.expenseId] },
      })
        .select("-__v -_id") //Hide the information which need not to send in response
        .lean() //Return plain javascript object instead of mongoose object on which we can perform function
        .exec((err, result) => {
          if (err) {
            logger.error(err.message, "groupController:userListByExpense", 10);
            let apiResponse = response.generate(
              true,
              "Failed to find user data",
              500,
              null
            );
            reject(apiResponse);
          } else if (check.isEmpty(result)) {
            logger.info(
              "No Issue found",
              "groupController:userListByExpense",
              5
            );
            let apiResponse = response.generate(
              true,
              "No user found",
              204,
              null
            );
            reject(apiResponse);
          } else {
            resolve(result);
          }
        });
    });
  };

  validateInput(req, res)
    .then(userList)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "All User data found",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

let removeUserFromExpense = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (req.params.expenseId) {
        resolve(req);
      } else {
        logger.error(
          "Field missing error during remove user from expense",
          "groupController: removeUserFromExpense()",
          5
        );
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let findUser = () => {
    return new Promise((resolve, reject) => {
      User.findOne({ userId: req.body.userId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting user",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "User not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          const expenseList = result.expenseList;
          if (expenseList.length > 0) {
            const newExpenseList = [];
            for (let res of expenseList) {
              if (res !== req.params.expenseId) {
                newExpenseList.push(res);
              }
            }
            result.expenseList = newExpenseList;
          }

          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting user",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  };

  let findExpense = () => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Error while getting expense",
            500,
            null
          );
          reject(apiResponse);
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(
            true,
            "Expense not found",
            400,
            null
          );
          reject(apiResponse);
        } else {
          const userList = result.userList;
          if (userList.length > 0) {
            const newUserList = [];
            for (let res of userList) {
              if (res !== req.body.userId) {
                newUserList.push(res);
              }
            }
            result.userList = newUserList;
          }

          result.save(function (err, result) {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error while getting expense",
                500,
                null
              );
              reject(apiResponse);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  };

  let sendEmailExpense = (oldRes) => {
    return new Promise((resolve, reject) => {
      Expense.findOne({ expenseId: req.params.expenseId }, (err, result) => {
        if (err) {
          resolve(oldRes);
        } else if (check.isEmpty(result)) {
          resolve(oldRes);
        } else {
          const expense = result;
          User.find({
            expenseList: { $all: [expense.expenseId] },
          })
            .select("-__v -_id -password -createdOn") //Hide the information which need not to send in response
            .lean() //Return plain javascript object instead of mongoose object on which we can perform function
            .exec((err, result) => {
              if (err) {
                resolve(oldRes);
              } else if (check.isEmpty(result)) {
                resolve(oldRes);
              } else {
                let count = 0;
                for (let res of result) {
                  count++;
                  let email = res.email;
                  let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "acctest.sdev@gmail.com", // generated ethereal user
                      pass: "acc@test", // generated ethereal password
                    },
                  });
                  const mailOptions = {
                    from: "acctest.sdev@gmail.com",
                    to: email,
                    subject: "Expense Management System| Expense Support",
                    text: "Expense Updated", // plain text body
                    html:
                      "<b>User updated amount of expense : </b><br>" +
                      expense.name +
                      "<br><p>Thanks<br>Support Team</p>",
                  };
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                      if (count === result.length) {
                        resolve(oldRes);
                      }
                    } else {
                      console.log("Email sent: " + info.response);
                      if (count === result.length) {
                        resolve(oldRes);
                      }
                    }
                  });
                }
              }
            });
        }
      });
    });
  };

  let expenseHistory = () => {
    return new Promise((resolve, reject) => {
      let newExpenseHistory = new ExpenseHistory({
        historyId: shortid.generate(),
        message: `${req.body.updatedByName} removed ${req.body.userName} from expense.`,
        expenseId: req.params.expenseId,
        createdOn: time.now(),
      });

      newExpenseHistory.save((err, newExpenseHistory) => {
        let obj = {
          message: "User removed from expense",
        };
        resolve(obj);
      });
    });
  };

  validateInput(req, res)
    .then(findUser)
    .then(findExpense)
    .then(sendEmailExpense)
    .then(expenseHistory)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "User removed from expense",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

module.exports = {
  createGroup: createGroup,
  userGroupList: userGroupList,
  createExpense: createExpense,
  addUserInGroup: addUserInGroup,
  addUserInExpense: addUserInExpense,
  userListByGroup: userListByGroup,
  groupDetail: groupDetail,
  expenseDetail: expenseDetail,
  deleteExpenseRecord: deleteExpenseRecord,
  updateExpenseAmount: updateExpenseAmount,
  updateExpensePayee: updateExpensePayee,
  userListByExpense: userListByExpense,
  removeUserFromExpense: removeUserFromExpense,
};
