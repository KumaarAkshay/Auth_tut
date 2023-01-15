const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
// Connection for mongose on system
// const dbURI = "mongodb://127.0.0.1:27017/students-api";

// Connection for mongodb atlas online
const uname = "akshay-db";
const pass = "aks123456";
const dbname = "auth-db";
const dbURI = `mongodb+srv://${uname}:${pass}@cluster0.xxbhhvz.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose
  .connect(process.env.URL_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
