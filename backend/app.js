const express = require("express")();
const bodyParser = require("body-parser");
const DB = require("./util/database");
const User = require("./model/ExpenseModel");
const expenseController = require("./controller/expenseController");

express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());

express.post("/add", expenseController.postExpense);

express.patch("/update", expenseController.updateExpense);

express.delete("/delete/:deleteid", expenseController.DeleteExpense);

express.get("/", expenseController.getExpense);

DB.sync()
  .then((data) => {
    express.listen(2000);
  })
  .catch();
