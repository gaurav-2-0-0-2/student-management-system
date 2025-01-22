const express = require("express");
const {
  fetchUsers,
  deleteUserById,
  deleteAllUsers,
  updateUserById
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/users", fetchUsers);
userRouter.get("/delete/:id", deleteUserById);
userRouter.get("/deleteall", deleteAllUsers);
userRouter.put("/update/:id", updateUserById);

module.exports = userRouter;
