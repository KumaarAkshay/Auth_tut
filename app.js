const express = require("express");
const mongoose = require("mongoose");
// const dbconnection = require("./db/conn");
const session = require("express-session");

const MongoDBStore = require("connect-mongo");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionstore = new MongoDBStore({
  mongoUrl: process.env.URL_STR,
  collection: "sessions",
});

// const store = MongoDBStore.create({ mongoUrl: process.env.URL_STR})

app.use(
  require("express-session")({
    secret: "foo",
    resave: true,
    saveUninitialized: true,
    store: sessionstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.get("/", (req, res, next) => {
  if (req.session.viewcount) {
    req.session.viewcount = req.session.viewcount + 1;
  } else {
    req.session.viewcount = 1;
  }
  //   res.send("<h1>Hello World (sessions)</h1>");
  res.send(`<h2>You visited this page ${req.session.viewcount} times.</h2>`);
});

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
