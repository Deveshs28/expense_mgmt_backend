define({ "api": [
  {
    "group": "Expense",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/expenseManagementSystem/expense/detail/expenseId",
    "title": "Expense Detail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expense id. (path params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\":{\n    \"expense\":{\n      \"amount\": 400,\n      \"createdById\": \"4ZTjI7Cp4\",\n      \"createdByName\": \"Devesh Sharma\",\n      \"createdOn\": \"2020-08-16T11:14:30.000Z\",\n      \"expenseId\": \"1v8mAO0CA\",\n      \"groupId\": \"ldVldpncs\",\n      \"name\": \"Shopping\",\n      \"paidByUserId\": \"4ZTjI7Cp4\",\n      \"updatedOn\": \"2020-08-16T11:12:46.000Z\",\n      \"userList\": [\"4ZTjI7Cp4\"]\n     },\n     \"expenseHistory\":[\n       {\n         \"createdOn\": \"2020-08-16T11:14:30.000Z\",\n         \"expenseId\": \"1v8mAO0CA\",\n         \"historyId\": \"D5Poibde8t\",\n         \"message\": \"Devesh Sharma create Shopping expense.\"\n       }\n     ],\n     \"membersList\":[\n       {\n         \"countryCode\": \"267\",\n         \"createdOn\": \"2020-08-16T11:13:59.000Z\",\n         \"email\": \"devesh.s28@gmail.com\",\n         \"expenseList\": [\"1v8mAO0CA\"],\n         \"firstName\": \"Devesh\",\n         \"groupList\": [\"ldVldpncs\"],\n         \"lastName\": \"Sharma\",\n         \"mobile\": \"1234567890\",\n         \"userId\": \"4ZTjI7Cp4\"\n       }\n       ]\n     },\n     \"error\": false,\n     \"message\": \"Expense data found\",\n     \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Expense",
    "name": "GetApiV1ExpensemanagementsystemExpenseDetailExpenseid"
  },
  {
    "group": "Expense",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/expenseManagementSystem/expense/userListByExpense/expenseId",
    "title": "User List by expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expense id. (path params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"data\":{\n   \"countryCode\": \"267\",\n   \"createdOn\": \"2020-08-16T11:13:59.000Z\",\n   \"email\": \"devesh.s28@gmail.com\",\n   \"expenseList\": [\"1v8mAO0CA\"],\n   \"firstName\": \"Devesh\",\n   \"groupList\": [\"ldVldpncs\"],\n   \"lastName\": \"Sharma\",\n   \"mobile\": \"1234567890\",\n   \"userId\": \"4ZTjI7Cp4\"\n   },\n   \"error\": false,\n   \"message\": \"All User data found\",\n   \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Expense",
    "name": "GetApiV1ExpensemanagementsystemExpenseUserlistbyexpenseExpenseid"
  },
  {
    "group": "Expense",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/expenseManagementSystem/expense/create",
    "title": "Create Expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>expense name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "amount",
            "description": "<p>expense amount. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "groupId",
            "description": "<p>expense group id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "paidByUserId",
            "description": "<p>expense paid by user id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdByName",
            "description": "<p>created by name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdById",
            "description": "<p>created by id. (body params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\":{\n    \"amount\": 900,\n    \"createdById\": \"4ZTjI7Cp4\",\n    \"createdByName\": \"Devesh Sharma\",\n    \"createdOn\": \"2020-08-16T11:34:01.000Z\",\n    \"expenseId\": \"b_vcv1p1a\",\n    \"groupId\": \"ldVldpncs\",\n    \"name\": \"Movie\",\n    \"paidByUserId\": \"4ZTjI7Cp4\",\n    \"updatedOn\": \"2020-08-16T11:12:46.000Z\",\n    \"userList\": [\"4ZTjI7Cp4\"]\n   },\n   \"error\": false,\n   \"message\": \"Expense created\",\n   \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Expense",
    "name": "PostApiV1ExpensemanagementsystemExpenseCreate"
  },
  {
    "group": "Expense",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/expenseManagementSystem/expense/delete/expenseId",
    "title": "Expense Delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expense Id. (path params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n  \"data\": {\n    \"n\": 1,\n    \"ok\": 1,\n    \"deletedCount\": 1\n  },\n  \"error\": false,\n  \"message\": \"Expense Deleted Successfully\",\n  \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Expense",
    "name": "PostApiV1ExpensemanagementsystemExpenseDeleteExpenseid"
  },
  {
    "group": "Expense",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/expenseManagementSystem/expense/addUser/expenseId",
    "title": "Add User In Expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of the expense. (path params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "addedByUser",
            "description": "<p>name of the user who is adding new user. (body) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\":{\n    \"amount\": 400,\n    \"createdById\": \"4ZTjI7Cp4\",\n    \"createdByName\": \"Devesh Sharma\",\n    \"createdOn\": \"2020-08-16T11:14:30.000Z\",\n    \"expenseId\": \"1v8mAO0CA\",\n    \"groupId\": \"ldVldpncs\",\n    \"name\": \"Shopping\",\n    \"paidByUserId\": \"4ZTjI7Cp4\",\n    \"updatedOn\": \"2020-08-16T11:12:46.000Z\",\n    \"userList\": [\"4ZTjI7Cp4\", \"qTD6qrJMx\"]\n   },\n   \"error\": false,\n   \"message\": \"User added in expense\",\n   \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Expense",
    "name": "PutApiV1ExpensemanagementsystemExpenseAdduserExpenseid"
  },
  {
    "group": "Expense",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/expenseManagementSystem/expense/removeUser/expenseId",
    "title": "Remove user from expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of the expense. (path params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>user id. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>user name. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "updatedByName",
            "description": "<p>updating user name. (body) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Expense",
    "name": "PutApiV1ExpensemanagementsystemExpenseRemoveuserExpenseid"
  },
  {
    "group": "Expense",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/expenseManagementSystem/expense/updateAmount/expenseId",
    "title": "Update Expense Amount",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of the expense. (path params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "amount",
            "description": "<p>amount. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "updatedByName",
            "description": "<p>updating user name. (body) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Expense",
    "name": "PutApiV1ExpensemanagementsystemExpenseUpdateamountExpenseid"
  },
  {
    "group": "Expense",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/expenseManagementSystem/expense/updatePayee/expenseId",
    "title": "Update Expense Payee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of the expense. (path params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "paidByUserId",
            "description": "<p>new payee user id. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "paidByUsername",
            "description": "<p>new payee user name. (body) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "updatedByName",
            "description": "<p>updating user name. (body) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Expense",
    "name": "PutApiV1ExpensemanagementsystemExpenseUpdatepayeeExpenseid"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/expenseManagementSystem/group/detail/groupId",
    "title": "Group Detail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "groupId",
            "description": "<p>group id. (path params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\":{\n    \"expenseList\":[\n      {\n        \"amount\": 400,\n        \"createdById\": \"4ZTjI7Cp4\",\n        \"createdByName\": \"Devesh Sharma\",\n        \"createdOn\": \"2020-08-16T11:14:30.000Z\",\n        \"expenseId\": \"1v8mAO0CA\",\n        \"groupId\": \"ldVldpncs\",\n        \"name\": \"Shopping\",\n        \"paidByUserId\": \"4ZTjI7Cp4\",\n        \"updatedOn\": \"2020-08-16T11:12:46.000Z\",\n        \"userList\": [\"4ZTjI7Cp4\"]\n       }],\n       \"group\":{\n         \"createdById\": \"4ZTjI7Cp4\",\n         \"createdByName\": \"Devesh Sharma\",\n         \"createdOn\": \"2020-08-16T11:14:17.000Z\",\n         \"groupId\": \"ldVldpncs\",\n         \"name\": \"First Group\",\n         \"userList\": [\"4ZTjI7Cp4\"]\n       },\n       \"membersList\":[\n         {\n           \"countryCode\": \"267\",\n           \"createdOn\": \"2020-08-16T11:13:59.000Z\",\n           \"email\": \"devesh.s28@gmail.com\",\n           \"expenseList\": [\"1v8mAO0CA\"],\n           \"firstName\": \"Devesh\",\n           \"groupList\": [\"ldVldpncs\"],\n           \"lastName\": \"Sharma\",\n           \"mobile\": \"1234567890\",\n           \"userId\": \"4ZTjI7Cp4\"\n         }\n       ]\n       \n     },\n     \"error\": false,\n     \"message\": \"Group data found\",\n     \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Group",
    "name": "GetApiV1ExpensemanagementsystemGroupDetailGroupid"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/expenseManagementSystem/group/list/userId/page/recordCount",
    "title": "User Group List",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user getting list. (path params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "page",
            "description": "<p>page number for the record. (path params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recordCount",
            "description": "<p>count of records for current page. (path params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\":{\n    \"count\": 1,\n    \"groupList\": [\n      {\n        \"createdById\": \"WtE1Kr-6n\",\n        \"createdByName\": \"Devesh Sharma\",\n        \"createdOn\": \"2020-08-15T10:51:51.000Z\",\n        \"groupId\": \"Bl_GMgAf7\",\n        \"name\": \"First Group\",\n        \"userList\": [\"WtE1Kr-6n\"]\n       }\n     ]\n   },\n   \"error\": false,\n   \"message\": \"All User Group data found\",\n   \"status\": 200}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Group",
    "name": "GetApiV1ExpensemanagementsystemGroupListUseridPageRecordcount"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/expenseManagementSystem/group/userListByGroupId/:groupId",
    "title": "User List by group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "groupId",
            "description": "<p>group id. (path params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"data\":{\n   \"countryCode\": \"267\",\n   \"createdOn\": \"2020-08-16T11:13:59.000Z\",\n   \"email\": \"devesh.s28@gmail.com\",\n   \"expenseList\": [\"1v8mAO0CA\"],\n   \"firstName\": \"Devesh\",\n   \"groupList\": [\"ldVldpncs\"],\n   \"lastName\": \"Sharma\",\n   \"mobile\": \"1234567890\",\n   \"userId\": \"4ZTjI7Cp4\"\n   },\n   \"error\": false,\n   \"message\": \"All User data found\",\n   \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Group",
    "name": "GetApiV1ExpensemanagementsystemGroupUserlistbygroupidGroupid"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/expenseManagementSystem/group/create",
    "title": "Create Group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>group name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdByName",
            "description": "<p>created by name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdById",
            "description": "<p>created by id. (body params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\":{\n    \"createdById\": \"WtE1Kr-6n\",\n    \"createdByName\": \"Devesh Sharma\",\n    \"createdOn\": \"2020-08-15T10:51:51.000Z\",\n    \"groupId\": \"Bl_GMgAf7\",\n    \"name\": \"First Group\",\n    \"userList\": [\"WtE1Kr-6n\"]\n  },\n  \"error\": false,\n  \"message\": \"Group created\",\n  \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Group",
    "name": "PostApiV1ExpensemanagementsystemGroupCreate"
  },
  {
    "group": "Group",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/expenseManagementSystem/group/addUser/:userId/:groupId",
    "title": "Add User In Group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (path params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId of the group. (path params) (required)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\":{\n    \"createdById\": \"4ZTjI7Cp4\",\n    \"createdByName\": \"Devesh Sharma\",\n    \"createdOn\": \"2020-08-16T11:14:17.000Z\",\n    \"groupId\": \"ldVldpncs\",\n    \"name\": \"First Group\",\n    \"userList\":[\"4ZTjI7Cp4\", \"qTD6qrJMx\"]\n   },\n   \"error\": false,\n   \"message\": \"User added in group\",\n   \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "Group",
    "name": "PutApiV1ExpensemanagementsystemGroupAdduserUseridGroupid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/expenseManagementSystem/user/list",
    "title": "User List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>token of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n  \"data\": [\n    {\n      \"countryCode\": \"267\",\n            \"createdOn\": \"2020-08-16T11:13:59.000Z\",\n            \"email\": \"devesh.s28@gmail.com\",\n            \"expenseList\": [\"1v8mAO0CA\"],\n            \"firstName\": \"Devesh\",\n            \"groupList\": [\"ldVldpncs\"],\n            \"lastName\": \"Sharma\",\n            \"mobile\": \"1234567890\",\n            \"userId\": \"4ZTjI7Cp4\"\n    }\n  ],\n  \"error\": false,\n  \"message\": \"All User data found\",\n  \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "users",
    "name": "GetApiV1ExpensemanagementsystemUserList"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/expenseManagementSystem/forgot-password",
    "title": "Forgot Password",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Forgot password request processed\",\n    \"status\": 200,\n    \"data\": {\n        \"message\": \"Forgot password request processed succesfully. Please check your email inbox or spam folder for further steps.\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "users",
    "name": "PostApiV1ExpensemanagementsystemForgotPassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/expenseManagementSystem/login",
    "title": "Login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n  \"data\": {\n    \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ik1wVW55REJyeSIsImlhdCI6MTU5MjQxMjY3NTE1NSwiZXhwIjoxNTkyNDk5MDc1LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJ0b2RvTGlzdCIsImRhdGEiOnsidXNlcklkIjoiS0pMMEtmM21RIiwiZmlyc3ROYW1lIjoiRGV2ZXNoIiwibGFzdE5hbWUiOiJTaGFybWEiLCJlbWFpbCI6ImRldmVzaC5zMjhAZ21haWwuY29tIn19.evjlhKT6d4kNQ7NJoCYDLFFX_ttAnhtHGZdYNepDzao\",\n    \"userDetails\": {\n      \"email\": \"devesh.s28@gmail.com\",\n      \"firstName\": \"Devesh\",\n      \"lastName\": \"Sharma\",\n      \"userId\": \"KJL0Kf3mQ\",\n      \"mobile\": \"9991734971\",\n      \"countryCode\": \"880\"\n    }\n  },\n  \"error\": false,\n  \"message\": \"Login Successful\",\n  \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "users",
    "name": "PostApiV1ExpensemanagementsystemLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/expenseManagementSystem/logout",
    "title": "Logout",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user (path params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "users",
    "name": "PostApiV1ExpensemanagementsystemLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/expenseManagementSystem/signup",
    "title": "Signup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>last name of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n  \"data\": {\n    \"createdOn\": \"2020-06-17T16:46:49.000Z\",\n    \"email\": \"devesh.s28@gmail.com\",\n    \"firstName\": \"Devesh\",\n    \"lastName\": \"Sharma\",\n    \"userId\": \"KJL0Kf3mQ\",\n    \"__v\": 0,\n    \"_id\": \"5eea48f91a1f3436b0d9a4f8\"\n  },\n  \"error\": false,\n  \"message\": \"User created\",\n  \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "users",
    "name": "PostApiV1ExpensemanagementsystemSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/expenseManagementSystem/update-password/:userId",
    "title": "Update Password",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>user id of the user. (path params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User password updated\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/expenseList.js",
    "groupTitle": "users",
    "name": "PostApiV1ExpensemanagementsystemUpdatePasswordUserid"
  }
] });
