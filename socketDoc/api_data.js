define({ "api": [
  {
    "group": "Emit",
    "type": "",
    "url": "added-to-group",
    "title": "",
    "description": "<p>This event (&quot;added-to-group&quot;) has to be emitted to the online frontend user whenever they are added to group.</p>",
    "examples": [
      {
        "title": "Emit Request object",
        "content": "{\n       groupId: data.groupId,\n           name: data.name,\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "AddedToGroup"
  },
  {
    "group": "Emit",
    "type": "",
    "url": "expense-added-to-group",
    "title": "",
    "description": "<p>This event (&quot;expense-added-to-group&quot;) has to be emitted to the online frontend user whenever they are added to expense or expense added to group.</p>",
    "examples": [
      {
        "title": "Emit Request object",
        "content": "{\n       expenseId: \"hfasd\",\n       groupId: \"skjbsdkj\",\n       name: \"test\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "ExpenseAddedToGroup"
  },
  {
    "group": "Emit",
    "type": "",
    "url": "expense-amount-updated",
    "title": "",
    "description": "<p>This event (&quot;expense-amount-updated&quot;) has to be emitted to all online frontend user whenever expense amount is updated.</p>",
    "examples": [
      {
        "title": "Emit Request object",
        "content": "{\n        userId: \"slknlew\",\n       expenseId: \"saks12\",\n       groupId: \"12bkkj\",\n       amount: 300\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "ExpenseAmountUpdated"
  },
  {
    "group": "Emit",
    "type": "",
    "url": "expense-deleted",
    "title": "",
    "description": "<p>This event (&quot;expense-deleted&quot;) has to be emitted to all online frontend user whenever expense is deleted.</p>",
    "examples": [
      {
        "title": "Emit Request object",
        "content": "{\n        expenseId: \"saks12\",\n       groupId: \"12bkkj\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "ExpenseDeleted"
  },
  {
    "group": "Emit",
    "type": "",
    "url": "expense-payee-updated",
    "title": "",
    "description": "<p>This event (&quot;expense-payee-updated&quot;) has to be emitted to all online frontend user whenever expense payee is updated.</p>",
    "examples": [
      {
        "title": "Emit Request object",
        "content": " {\npaidByUserId: \"awkjhwe\",\n        expenseId: \"wmjd13\",\n        groupId: \"askjdb22\",\n      }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "ExpensePayeeUpdated"
  },
  {
    "group": "Emit",
    "type": "",
    "url": "new-user-registered",
    "title": "",
    "description": "<p>This event (&quot;new-user-registered&quot;) has to be emitted to frontend whenever new successfully user registered on system.</p>",
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "NewUserRegistered"
  },
  {
    "group": "Emit",
    "type": "",
    "url": "user-added-in-expense",
    "title": "",
    "description": "<p>This event (&quot;user-added-in-expense&quot;) has to be emitted to all online frontend user whenever user is added in expense.</p>",
    "examples": [
      {
        "title": "Emit Request object",
        "content": "{\n        userId: \"sakdans\",\n         expenseId: \"qwiekj21\",\n         groupId: \"sjsdkj3\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "UserAddedInExpense"
  },
  {
    "group": "Emit",
    "type": "",
    "url": "user-added-in-group",
    "title": "",
    "description": "<p>This event (&quot;user-added-in-group&quot;) has to be emitted to all online frontend user whenever user is added in group.</p>",
    "examples": [
      {
        "title": "Emit Request object",
        "content": "{\n        userId: \"askskd\",\n       groupId: \"2132kjnlm\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "UserAddedInGroup"
  },
  {
    "group": "Emit",
    "type": "",
    "url": "user-removed-from-expense",
    "title": "",
    "description": "<p>This event (&quot;user-removed-from-expense&quot;) has to be emitted to all online frontend user whenever user is removed from expense.</p>",
    "examples": [
      {
        "title": "Emit Request object",
        "content": "{\n        userId: \"sakdans\",\n         expenseId: \"qwiekj21\",\n         groupId: \"sjsdkj3\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "UserRemovedFromExpense"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "disconnect",
    "title": "",
    "description": "<p>This event (&quot;disconnect&quot;) has to be listened by backend whenever any user disconnects.</p>",
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "Disconnect"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "expense-amount-update-success",
    "title": "",
    "description": "<p>This event (&quot;expense-amount-update-success&quot;) has to be listened by backend whenever expense amount is updated.</p>",
    "examples": [
      {
        "title": "Listen Response object",
        "content": "{\n        userId: \"slknlew\",\n       expenseId: \"saks12\",\n       groupId: \"12bkkj\",\n       amount: 300\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "ExpenseAmountUpdateSuccess"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "expense-created-success",
    "title": "",
    "description": "<p>This event (&quot;expense-created-success&quot;) has to be listened by backend whenever any new expense in group is created.</p>",
    "examples": [
      {
        "title": "Listen Response object",
        "content": "{\n       expenseId: \"hfasd\",\n       groupId: \"skjbsdkj\",\n       name: \"test\",\n       userList: [\"dkfjsdkj\"]\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "ExpenseCreatedSuccess"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "expense-delete-success",
    "title": "",
    "description": "<p>This event (&quot;expense-delete-success&quot;) has to be listened by backend whenever expense is deleted.</p>",
    "examples": [
      {
        "title": "Listen Response object",
        "content": "{\n        expenseId: \"saks12\",\n       groupId: \"12bkkj\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "ExpenseDeleteSuccess"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "expense-payee-update-success",
    "title": "",
    "description": "<p>This event (&quot;expense-payee-update-success&quot;) has to be listened by backend whenever expense payee updated.</p>",
    "examples": [
      {
        "title": "Listen Response object",
        "content": " {\npaidByUserId: \"awkjhwe\",\n        expenseId: \"wmjd13\",\n        groupId: \"askjdb22\",\n      }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "ExpensePayeeUpdateSuccess"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "group-created-success",
    "title": "",
    "description": "<p>This event (&quot;group-created-success&quot;) has to be listened by backend whenever any new group is created.</p>",
    "examples": [
      {
        "title": "Listen Response object",
        "content": "{\n       groupId: \"kasbkjc\",\n       name: \"name\",\n       userList: [\"4sdsfsd\"],\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "GroupCreatedSuccess"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "set-user",
    "title": "",
    "description": "<p>This event (&quot;set-user&quot;) has to be listened by backend to authenticate current user and add it to online user list.</p>",
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "SetUser"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "user-added-expense-success",
    "title": "",
    "description": "<p>This event (&quot;user-added-expense-success&quot;) has to be listened by backend whenever any new user added in expense.</p>",
    "examples": [
      {
        "title": "Listen Response object",
        "content": "{\n       userId: \"sakdans\",\n         expenseId: \"qwiekj21\",\n         groupId: \"sjsdkj3\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "UserAddedExpenseSuccess"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "user-added-group-success",
    "title": "",
    "description": "<p>This event (&quot;user-added-group-success&quot;) has to be listened by backend whenever any new user added in group.</p>",
    "examples": [
      {
        "title": "Listen Response object",
        "content": "{\n       userId: \"askskd\",\n       groupId: \"2132kjnlm\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "UserAddedGroupSuccess"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "user-created",
    "title": "",
    "description": "<p>This event (&quot;user-created&quot;) has to be listened by backend whenever any new user registered on system.</p>",
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "UserCreated"
  },
  {
    "group": "Listen",
    "type": "",
    "url": "user-removed-from-expense-success",
    "title": "",
    "description": "<p>This event (&quot;user-removed-from-expense-success&quot;) has to be listened by backend whenever any new user removed from expense.</p>",
    "examples": [
      {
        "title": "Listen Response object",
        "content": "{\n       userId: \"sakdans\",\n         expenseId: \"qwiekj21\",\n         groupId: \"sjsdkj3\"\n     }",
        "type": "object"
      }
    ],
    "version": "0.0.0",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "UserRemovedFromExpenseSuccess"
  }
] });
