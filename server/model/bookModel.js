const mongoose = require("mongoose");
const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;


