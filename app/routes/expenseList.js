const express = require("express");
const router = express.Router();
const appConfig = require("../../config/appConfig");
const groupController = require("../controllers/groupController");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {
  let baseUrl = appConfig.apiVersion + "/expenseManagementSystem";

  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenseManagementSystem/login Login
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
  "data": {
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ik1wVW55REJyeSIsImlhdCI6MTU5MjQxMjY3NTE1NSwiZXhwIjoxNTkyNDk5MDc1LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJ0b2RvTGlzdCIsImRhdGEiOnsidXNlcklkIjoiS0pMMEtmM21RIiwiZmlyc3ROYW1lIjoiRGV2ZXNoIiwibGFzdE5hbWUiOiJTaGFybWEiLCJlbWFpbCI6ImRldmVzaC5zMjhAZ21haWwuY29tIn19.evjlhKT6d4kNQ7NJoCYDLFFX_ttAnhtHGZdYNepDzao",
    "userDetails": {
      "email": "devesh.s28@gmail.com",
      "firstName": "Devesh",
      "lastName": "Sharma",
      "userId": "KJL0Kf3mQ",
      "mobile": "9991734971",
      "countryCode": "880"
    }
  },
  "error": false,
  "message": "Login Successful",
  "status": 200
}

    */
  app.post(`${baseUrl}/login`, userController.userLogin);

  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenseManagementSystem/signup Signup
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} firstName first name of the user. (body params) (required)
     * @apiParam {string} lastName last name of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
  "data": {
    "createdOn": "2020-06-17T16:46:49.000Z",
    "email": "devesh.s28@gmail.com",
    "firstName": "Devesh",
    "lastName": "Sharma",
    "userId": "KJL0Kf3mQ",
    "__v": 0,
    "_id": "5eea48f91a1f3436b0d9a4f8"
  },
  "error": false,
  "message": "User created",
  "status": 200
}
    */
  app.post(`${baseUrl}/signup`, userController.userSignUp);

  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenseManagementSystem/logout Logout
     * 
     * @apiParam {string} userId userId of the user (path params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                
            }
         
    */
  app.post(`${baseUrl}/logout/:userId`, userController.logout);

  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenseManagementSystem/forgot-password Forgot Password
     *
     * @apiParam {string} email email of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Forgot password request processed",
            "status": 200,
            "data": {
                "message": "Forgot password request processed succesfully. Please check your email inbox or spam folder for further steps."
            }
        }

    */
  app.post(`${baseUrl}/forgot-password`, userController.forgotPassword);

  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenseManagementSystem/update-password/:userId Update Password
     *
     * @apiParam {string} userId user id of the user. (path params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User password updated",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }

    */
  app.post(`${baseUrl}/update-password/:userId`, userController.updatePassword);

  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/expenseManagementSystem/user/list User List
     *
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
  "data": [
    {
      "countryCode": "267",
            "createdOn": "2020-08-16T11:13:59.000Z",
            "email": "devesh.s28@gmail.com",
            "expenseList": ["1v8mAO0CA"],
            "firstName": "Devesh",
            "groupList": ["ldVldpncs"],
            "lastName": "Sharma",
            "mobile": "1234567890",
            "userId": "4ZTjI7Cp4"
    }
  ],
  "error": false,
  "message": "All User data found",
  "status": 200
}
    */
  app.get(`${baseUrl}/user/list`, auth.isAuthorized, userController.userList);

  /**
     * @apiGroup Group
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenseManagementSystem/group/create Create Group
     *
     * @apiParam {string} name group name. (body params) (required)
     * @apiParam {string} createdByName created by name. (body params) (required)
     * @apiParam {string} createdById created by id. (body params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
           "data":{
             "createdById": "WtE1Kr-6n",
             "createdByName": "Devesh Sharma",
             "createdOn": "2020-08-15T10:51:51.000Z",
             "groupId": "Bl_GMgAf7",
             "name": "First Group",
             "userList": ["WtE1Kr-6n"]
           },
           "error": false,
           "message": "Group created",
           "status": 200
         }
    */
  app.post(
    `${baseUrl}/group/create`,
    auth.isAuthorized,
    groupController.createGroup
  );

  /**
     * @apiGroup Group
     * @apiVersion  1.0.0
     * @api {get} /api/v1/expenseManagementSystem/group/list/userId/page/recordCount User Group List
     *
     * @apiParam {string} userId userId of the user getting list. (path params) (required)
     * @apiParam {string} page page number for the record. (path params) (required)
     * @apiParam {string} recordCount count of records for current page. (path params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
           "data":{
             "count": 1,
             "groupList": [
               {
                 "createdById": "WtE1Kr-6n",
                 "createdByName": "Devesh Sharma",
                 "createdOn": "2020-08-15T10:51:51.000Z",
                 "groupId": "Bl_GMgAf7",
                 "name": "First Group",
                 "userList": ["WtE1Kr-6n"]
                }
              ]
            },
            "error": false,
            "message": "All User Group data found",
            "status": 200}
    */
  app.get(
    `${baseUrl}/group/list/:userId/:page/:recordCount`,
    auth.isAuthorized,
    groupController.userGroupList
  );

  /**
     * @apiGroup Group
     * @apiVersion  1.0.0
     * @api {put} /api/v1/expenseManagementSystem/group/addUser/:userId/:groupId Add User In Group
     *
     * @apiParam {string} userId userId of the user. (path params) (required)
     * @apiParam {string} groupId groupId of the group. (path params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
           "data":{
             "createdById": "4ZTjI7Cp4",
             "createdByName": "Devesh Sharma",
             "createdOn": "2020-08-16T11:14:17.000Z",
             "groupId": "ldVldpncs",
             "name": "First Group",
             "userList":["4ZTjI7Cp4", "qTD6qrJMx"]
            },
            "error": false,
            "message": "User added in group",
            "status": 200
         }
    */
  app.put(
    `${baseUrl}/group/addUser/:userId/:groupId`,
    auth.isAuthorized,
    groupController.addUserInGroup
  );

  /**
     * @apiGroup Group
     * @apiVersion  1.0.0
     * @api {get} /api/v1/expenseManagementSystem/group/userListByGroupId/:groupId User List by group
     *
     * @apiParam {string} groupId group id. (path params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
          "data":{
            "countryCode": "267",
            "createdOn": "2020-08-16T11:13:59.000Z",
            "email": "devesh.s28@gmail.com",
            "expenseList": ["1v8mAO0CA"],
            "firstName": "Devesh",
            "groupList": ["ldVldpncs"],
            "lastName": "Sharma",
            "mobile": "1234567890",
            "userId": "4ZTjI7Cp4"
            },
            "error": false,
            "message": "All User data found",
            "status": 200
         }
    */
  app.get(
    `${baseUrl}/group/userListByGroupId/:groupId`,
    auth.isAuthorized,
    groupController.userListByGroup
  );

  /**
     * @apiGroup Group
     * @apiVersion  1.0.0
     * @api {get} /api/v1/expenseManagementSystem/group/detail/groupId Group Detail
     *
     * @apiParam {string} groupId group id. (path params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
           "data":{
             "expenseList":[
               {
                 "amount": 400,
                 "createdById": "4ZTjI7Cp4",
                 "createdByName": "Devesh Sharma",
                 "createdOn": "2020-08-16T11:14:30.000Z",
                 "expenseId": "1v8mAO0CA",
                 "groupId": "ldVldpncs",
                 "name": "Shopping",
                 "paidByUserId": "4ZTjI7Cp4",
                 "updatedOn": "2020-08-16T11:12:46.000Z",
                 "userList": ["4ZTjI7Cp4"]
                }],
                "group":{
                  "createdById": "4ZTjI7Cp4",
                  "createdByName": "Devesh Sharma",
                  "createdOn": "2020-08-16T11:14:17.000Z",
                  "groupId": "ldVldpncs",
                  "name": "First Group",
                  "userList": ["4ZTjI7Cp4"]
                },
                "membersList":[
                  {
                    "countryCode": "267",
                    "createdOn": "2020-08-16T11:13:59.000Z",
                    "email": "devesh.s28@gmail.com",
                    "expenseList": ["1v8mAO0CA"],
                    "firstName": "Devesh",
                    "groupList": ["ldVldpncs"],
                    "lastName": "Sharma",
                    "mobile": "1234567890",
                    "userId": "4ZTjI7Cp4"
                  }
                ]
                
              },
              "error": false,
              "message": "Group data found",
              "status": 200
         }
    */
  app.get(
    `${baseUrl}/group/detail/:groupId`,
    auth.isAuthorized,
    groupController.groupDetail
  );

  /**
     * @apiGroup Expense
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenseManagementSystem/expense/create Create Expense
     *
     * @apiParam {string} name expense name. (body params) (required)
     * @apiParam {string} amount expense amount. (body params) (required)
     * @apiParam {string} groupId expense group id. (body params) (required)
     * @apiParam {string} paidByUserId expense paid by user id. (body params) (required)
     * @apiParam {string} createdByName created by name. (body params) (required)
     * @apiParam {string} createdById created by id. (body params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
           "data":{
             "amount": 900,
             "createdById": "4ZTjI7Cp4",
             "createdByName": "Devesh Sharma",
             "createdOn": "2020-08-16T11:34:01.000Z",
             "expenseId": "b_vcv1p1a",
             "groupId": "ldVldpncs",
             "name": "Movie",
             "paidByUserId": "4ZTjI7Cp4",
             "updatedOn": "2020-08-16T11:12:46.000Z",
             "userList": ["4ZTjI7Cp4"]
            },
            "error": false,
            "message": "Expense created",
            "status": 200
         }
    */
  app.post(
    `${baseUrl}/expense/create`,
    auth.isAuthorized,
    groupController.createExpense
  );

  /**
     * @apiGroup Expense
     * @apiVersion  1.0.0
     * @api {get} /api/v1/expenseManagementSystem/expense/detail/expenseId Expense Detail
     *
     * @apiParam {string} expenseId expense id. (path params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
           "data":{
             "expense":{
               "amount": 400,
               "createdById": "4ZTjI7Cp4",
               "createdByName": "Devesh Sharma",
               "createdOn": "2020-08-16T11:14:30.000Z",
               "expenseId": "1v8mAO0CA",
               "groupId": "ldVldpncs",
               "name": "Shopping",
               "paidByUserId": "4ZTjI7Cp4",
               "updatedOn": "2020-08-16T11:12:46.000Z",
               "userList": ["4ZTjI7Cp4"]
              },
              "expenseHistory":[
                {
                  "createdOn": "2020-08-16T11:14:30.000Z",
                  "expenseId": "1v8mAO0CA",
                  "historyId": "D5Poibde8t",
                  "message": "Devesh Sharma create Shopping expense."
                }
              ],
              "membersList":[
                {
                  "countryCode": "267",
                  "createdOn": "2020-08-16T11:13:59.000Z",
                  "email": "devesh.s28@gmail.com",
                  "expenseList": ["1v8mAO0CA"],
                  "firstName": "Devesh",
                  "groupList": ["ldVldpncs"],
                  "lastName": "Sharma",
                  "mobile": "1234567890",
                  "userId": "4ZTjI7Cp4"
                }
                ]
              },
              "error": false,
              "message": "Expense data found",
              "status": 200
         }
    */
  app.get(
    `${baseUrl}/expense/detail/:expenseId`,
    auth.isAuthorized,
    groupController.expenseDetail
  );

  /**
     * @apiGroup Expense
     * @apiVersion  1.0.0
     * @api {put} /api/v1/expenseManagementSystem/expense/addUser/expenseId Add User In Expense
     *
     * @apiParam {string} expenseId expenseId of the expense. (path params) (required)
     * @apiParam {string} userId userId of the user. (body) (required)
     * @apiParam {string} userName userName of the user. (body) (required)
     * @apiParam {string} addedByUser name of the user who is adding new user. (body) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
           "data":{
             "amount": 400,
             "createdById": "4ZTjI7Cp4",
             "createdByName": "Devesh Sharma",
             "createdOn": "2020-08-16T11:14:30.000Z",
             "expenseId": "1v8mAO0CA",
             "groupId": "ldVldpncs",
             "name": "Shopping",
             "paidByUserId": "4ZTjI7Cp4",
             "updatedOn": "2020-08-16T11:12:46.000Z",
             "userList": ["4ZTjI7Cp4", "qTD6qrJMx"]
            },
            "error": false,
            "message": "User added in expense",
            "status": 200
         }
    */
  app.put(
    `${baseUrl}/expense/addUser/:expenseId`,
    auth.isAuthorized,
    groupController.addUserInExpense
  );

  /**
     * @apiGroup Expense
     * @apiVersion  1.0.0
     * @api {post} /api/v1/expenseManagementSystem/expense/delete/expenseId Expense Delete
     *
     * @apiParam {string} expenseId expense Id. (path params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
  "data": {
    "n": 1,
    "ok": 1,
    "deletedCount": 1
  },
  "error": false,
  "message": "Expense Deleted Successfully",
  "status": 200
}
    */
  app.post(
    `${baseUrl}/expense/delete/:expenseId`,
    auth.isAuthorized,
    groupController.deleteExpenseRecord
  );

  /**
     * @apiGroup Expense
     * @apiVersion  1.0.0
     * @api {put} /api/v1/expenseManagementSystem/expense/updateAmount/expenseId Update Expense Amount
     *
     * @apiParam {string} expenseId expenseId of the expense. (path params) (required)
     * @apiParam {string} amount amount. (body) (required)
     * @apiParam {string} updatedByName updating user name. (body) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {}
    */
  app.put(
    `${baseUrl}/expense/updateAmount/:expenseId`,
    auth.isAuthorized,
    groupController.updateExpenseAmount
  );

  /**
     * @apiGroup Expense
     * @apiVersion  1.0.0
     * @api {put} /api/v1/expenseManagementSystem/expense/updatePayee/expenseId Update Expense Payee
     *
     * @apiParam {string} expenseId expenseId of the expense. (path params) (required)
     * @apiParam {string} paidByUserId new payee user id. (body) (required)
     * @apiParam {string} paidByUsername new payee user name. (body) (required)
     * @apiParam {string} updatedByName updating user name. (body) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {}
    */
  app.put(
    `${baseUrl}/expense/updatePayee/:expenseId`,
    auth.isAuthorized,
    groupController.updateExpensePayee
  );

  /**
     * @apiGroup Expense
     * @apiVersion  1.0.0
     * @api {put} /api/v1/expenseManagementSystem/expense/removeUser/expenseId Remove user from expense
     *
     * @apiParam {string} expenseId expenseId of the expense. (path params) (required)
     * @apiParam {string} userId user id. (body) (required)
     * @apiParam {string} userName user name. (body) (required)
     * @apiParam {string} updatedByName updating user name. (body) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {}
    */
  app.put(
    `${baseUrl}/expense/removeUser/:expenseId`,
    auth.isAuthorized,
    groupController.removeUserFromExpense
  );

  /**
     * @apiGroup Expense
     * @apiVersion  1.0.0
     * @api {get} /api/v1/expenseManagementSystem/expense/userListByExpense/expenseId User List by expense
     *
     * @apiParam {string} expenseId expense id. (path params) (required)
     * 
     * @apiHeader {string} authToken  token of the user. (header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
          "data":{
            "countryCode": "267",
            "createdOn": "2020-08-16T11:13:59.000Z",
            "email": "devesh.s28@gmail.com",
            "expenseList": ["1v8mAO0CA"],
            "firstName": "Devesh",
            "groupList": ["ldVldpncs"],
            "lastName": "Sharma",
            "mobile": "1234567890",
            "userId": "4ZTjI7Cp4"
            },
            "error": false,
            "message": "All User data found",
            "status": 200
         }
    */
  app.get(
    `${baseUrl}/expense/userListByExpense/:expenseId`,
    auth.isAuthorized,
    groupController.userListByExpense
  );
};
