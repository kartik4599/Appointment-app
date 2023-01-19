const Expense = require("../model/ExpenseModel");

exports.getExpense = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  Expense.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.postExpense = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  console.log({
    amount,
    description,
    category,
  });

  Expense.create({
    amount,
    description,
    category,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
};

exports.updateExpense = (req, res, next) => {
  Expense.findByPk(req.body.id)
    .then((data) => {
      (data.amount = req.body.amount),
        (data.description = req.body.description),
        (data.category = req.body.category);
      return data.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
};

exports.DeleteExpense = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  Expense.findByPk(req.params.deleteid)
    .then((data) => {
      return data.destroy();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
  console.log(req.params.deleteid);
};
