const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bookRouter = require("./Router/bookRouter");
app.use(cors());
app.use(express.json());
 
app.use("/api",bookRouter);

mongoose.connect("mongodb://127.0.0.1:27017/book-db").
then(()=>console.log("connnected to DB")).catch((err)=>console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
 });

 