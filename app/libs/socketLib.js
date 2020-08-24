const socketio = require("socket.io");
const tokenLib = require("./tokenLib.js");

let setServer = (server) => {
  var allOnlineUsers = [];
  let io = socketio.listen(server);

  let myIo = io.of("/");

  myIo.on("connection", (socket) => {
    socket.emit("verifyUser", "");

    /**
     * @apiGroup Listen
     * @api set-user
     * @apiDescription This event ("set-user") has to be listened by backend to authenticate current user and add it to online user list.
     *
     */
    socket.on("set-user", (authToken) => {
      tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
        if (err) {
          socket.emit("auth-error", {
            status: 500,
            error: "Please provide correct auth token",
          });
        } else {
          console.log("user set success");
          let currentUser = user.data;
          // setting socket user id
          socket.userId = currentUser.userId;
          socket.room = socket.userId;
          socket.join(socket.room);
          allOnlineUsers.push(currentUser.userId);
          console.log(allOnlineUsers);
        }
      });
    });

    /**
     * @apiGroup Emit
     * @api new-user-registered
     * @apiDescription This event ("new-user-registered") has to be emitted to frontend whenever new successfully user registered on system.
     *
     */
    /**
     * @apiGroup Listen
     * @api user-created
     * @apiDescription This event ("user-created") has to be listened by backend whenever any new user registered on system.
     *
     */
    socket.on("user-created", () => {
      console.log("New user created");
      myIo.emit("new-user-registered", ""); //Emit event to all connected sockets
    });

    /**
     * @apiGroup Emit
     * @api added-to-group
     * @apiDescription This event ("added-to-group") has to be emitted to the online frontend user whenever they are added to group.
     * @apiExample {object} Emit Request object
     *  {
        groupId: data.groupId,
            name: data.name,
      }
     */
    /**
     * @apiGroup Listen
     * @api group-created-success
     * @apiDescription This event ("group-created-success") has to be listened by backend whenever any new group is created.
     * 
     * @apiExample {object} Listen Response object
     *  {
        groupId: "kasbkjc",
        name: "name",
        userList: ["4sdsfsd"],
      }
     *
     */
    socket.on("group-created-success", (data) => {
      const info = {
        groupId: data.groupId,
        name: data.name,
        userList: data.userList,
      };
      console.log("allOnlineUsers:", allOnlineUsers);
      for (let res of data.userList) {
        if (allOnlineUsers.includes(res)) {
          const groupInfo = {
            groupId: data.groupId,
            name: data.name,
            userId: res,
          };
          socket.to(res).broadcast.emit("added-to-group", groupInfo);
        }
      }
    });

    /**
     * @apiGroup Emit
     * @api expense-added-to-group
     * @apiDescription This event ("expense-added-to-group") has to be emitted to the online frontend user whenever they are added to expense or expense added to group.
     * @apiExample {object} Emit Request object
     *  {
        expenseId: "hfasd",
        groupId: "skjbsdkj",
        name: "test"
      }
     */
    /**
     * @apiGroup Listen
     * @api expense-created-success
     * @apiDescription This event ("expense-created-success") has to be listened by backend whenever any new expense in group is created.
     * 
     * @apiExample {object} Listen Response object
     *  {
        expenseId: "hfasd",
        groupId: "skjbsdkj",
        name: "test",
        userList: ["dkfjsdkj"]
      }
     *
     */
    socket.on("expense-created-success", (data) => {
      const info = {
        expenseId: data.expenseId,
        groupId: data.groupId,
        name: data.name,
        userList: data.userList,
      };
      console.log("allOnlineUsers:", allOnlineUsers);
      for (let res of data.userList) {
        if (allOnlineUsers.includes(res)) {
          const expenseInfo = {
            expenseId: data.expenseId,
            groupId: data.groupId,
            name: data.name,
          };
          socket.to(res).broadcast.emit("expense-added-to-group", expenseInfo);
        }
      }
    });

    /**
     * @apiGroup Emit
     * @api user-added-in-group
     * @apiDescription This event ("user-added-in-group") has to be emitted to all online frontend user whenever user is added in group.
     * @apiExample {object} Emit Request object
     *  {
         userId: "askskd",
        groupId: "2132kjnlm"
      }
     */
    /**
     * @apiGroup Listen
     * @api user-added-group-success
     * @apiDescription This event ("user-added-group-success") has to be listened by backend whenever any new user added in group.
     * 
     * @apiExample {object} Listen Response object
     *  {
        userId: "askskd",
        groupId: "2132kjnlm"
      }
     *
     */
    socket.on("user-added-group-success", (data) => {
      const info = {
        userId: data.userId,
        groupId: data.groupId,
      };
      console.log("allOnlineUsers:", allOnlineUsers);
      myIo.emit("user-added-in-group", info);
    });

    /**
     * @apiGroup Emit
     * @api user-added-in-expense
     * @apiDescription This event ("user-added-in-expense") has to be emitted to all online frontend user whenever user is added in expense.
     * @apiExample {object} Emit Request object
     *  {
         userId: "sakdans",
          expenseId: "qwiekj21",
          groupId: "sjsdkj3"
      }
     */
    /**
     * @apiGroup Listen
     * @api user-added-expense-success
     * @apiDescription This event ("user-added-expense-success") has to be listened by backend whenever any new user added in expense.
     * 
     * @apiExample {object} Listen Response object
     *  {
        userId: "sakdans",
          expenseId: "qwiekj21",
          groupId: "sjsdkj3"
      }
     *
     */
    socket.on("user-added-expense-success", (data) => {
      const info = {
        userId: data.userId,
        expenseId: data.expenseId,
        groupId: data.groupId,
      };
      console.log("allOnlineUsers:", allOnlineUsers);
      myIo.emit("user-added-in-expense", info);
    });

    /**
     * @apiGroup Emit
     * @api user-removed-from-expense
     * @apiDescription This event ("user-removed-from-expense") has to be emitted to all online frontend user whenever user is removed from expense.
     * @apiExample {object} Emit Request object
     *  {
         userId: "sakdans",
          expenseId: "qwiekj21",
          groupId: "sjsdkj3"
      }
     */
    /**
     * @apiGroup Listen
     * @api user-removed-from-expense-success
     * @apiDescription This event ("user-removed-from-expense-success") has to be listened by backend whenever any new user removed from expense.
     * 
     * @apiExample {object} Listen Response object
     *  {
        userId: "sakdans",
          expenseId: "qwiekj21",
          groupId: "sjsdkj3"
      }
     *
     */
    socket.on("user-removed-from-expense-success", (data) => {
      const info = {
        userId: data.userId,
        expenseId: data.expenseId,
        groupId: data.groupId,
      };
      console.log("allOnlineUsers:", allOnlineUsers);
      myIo.emit("user-removed-from-expense", info);
    });

    /**
     * @apiGroup Emit
     * @api expense-payee-updated
     * @apiDescription This event ("expense-payee-updated") has to be emitted to all online frontend user whenever expense payee is updated.
     * @apiExample {object} Emit Request object
     *  {
     * paidByUserId: "awkjhwe",
        expenseId: "wmjd13",
        groupId: "askjdb22",
      }
     */
    /**
     * @apiGroup Listen
     * @api expense-payee-update-success
     * @apiDescription This event ("expense-payee-update-success") has to be listened by backend whenever expense payee updated.
     * 
     * @apiExample {object} Listen Response object
     *  {
     * paidByUserId: "awkjhwe",
        expenseId: "wmjd13",
        groupId: "askjdb22",
      }
     *
     */
    socket.on("expense-payee-update-success", (data) => {
      const info = {
        paidByUserId: data.paidByUserId,
        expenseId: data.expenseId,
        groupId: data.groupId,
      };
      console.log("allOnlineUsers:", allOnlineUsers);
      myIo.emit("expense-payee-updated", info);
    });

    /**
     * @apiGroup Emit
     * @api expense-amount-updated
     * @apiDescription This event ("expense-amount-updated") has to be emitted to all online frontend user whenever expense amount is updated.
     * @apiExample {object} Emit Request object
     *  {
         userId: "slknlew",
        expenseId: "saks12",
        groupId: "12bkkj",
        amount: 300
      }
     */
    /**
     * @apiGroup Listen
     * @api expense-amount-update-success
     * @apiDescription This event ("expense-amount-update-success") has to be listened by backend whenever expense amount is updated.
     * 
     * @apiExample {object} Listen Response object
     *  {
         userId: "slknlew",
        expenseId: "saks12",
        groupId: "12bkkj",
        amount: 300
      }
     *
     */
    socket.on("expense-amount-update-success", (data) => {
      const info = {
        expenseId: data.expenseId,
        groupId: data.groupId,
        amount: data.amount,
      };
      console.log("allOnlineUsers:", allOnlineUsers);
      myIo.emit("expense-amount-updated", info);
    });

    /**
     * @apiGroup Emit
     * @api expense-deleted
     * @apiDescription This event ("expense-deleted") has to be emitted to all online frontend user whenever expense is deleted.
     * @apiExample {object} Emit Request object
     *  {
         expenseId: "saks12",
        groupId: "12bkkj"
      }
     */
    /**
     * @apiGroup Listen
     * @api expense-delete-success
     * @apiDescription This event ("expense-delete-success") has to be listened by backend whenever expense is deleted.
     * 
     * @apiExample {object} Listen Response object
     *  {
         expenseId: "saks12",
        groupId: "12bkkj"
      }
     *
     */
    socket.on("expense-delete-success", (data) => {
      const info = {
        expenseId: data.expenseId,
        groupId: data.groupId,
      };
      console.log("allOnlineUsers:", allOnlineUsers);
      myIo.emit("expense-deleted", info);
    });

    /**
     * @apiGroup Listen
     * @api disconnect
     * @apiDescription This event ("disconnect") has to be listened by backend whenever any user disconnects.
     *
     */
    socket.on("disconnect", (data) => {
      console.log("user is disconnected");
      console.log("onlineUSe", allOnlineUsers);
      allOnlineUsers.splice(allOnlineUsers.indexOf(socket.userId), 1);
      console.log(allOnlineUsers);
      socket.leave(data.userId);
    });
  });
};

module.exports = {
  setServer: setServer,
};
