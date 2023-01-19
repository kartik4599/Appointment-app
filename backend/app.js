const express = require("express")();
const bodyParser = require("body-parser");
const DB = require("./util/database");
const User = require("./model/user");

express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());

express.post("/add", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  const name = req.body.name;
  const number = req.body.number;
  const email = req.body.email;
  console.log({
    name,
    number,
    email,
  });
  User.create({
    name,
    number,
    email,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
});

express.patch("/update", (req, res, next) => {
  User.findByPk(req.body.id)
    .then((data) => {
      (data.name = req.body.name),
        (data.number = req.body.number),
        (data.email = req.body.email);
      return data.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
});

express.delete("/delete/:deleteid", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  User.findByPk(req.params.deleteid)
    .then((data) => {
      return data.destroy();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
  console.log(req.params.deleteid);
});

express.get("/", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  User.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
    });
});

DB.sync()
  .then((data) => {
    express.listen(2000);
  })
  .catch();
