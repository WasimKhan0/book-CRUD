const express = require("express");
const router = express.Router();
const Book = require("../model/bookModel");
const mongoose = require("mongoose");

//Create book
router.post("/create", async (req, res) => {
  try {
    const {title} = req.body;
    const bookTitle = await Book.findOne({ title });
    if (bookTitle) {
      return res.status(409).json({ message: "Book already Available" });
    }
    const book = new Book(req.body);
    const bookReg = await book.save();
    res.status(200).json(bookReg);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ message: "No Books Available" });
    }
    return res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Upadate book from their bookId
router.put("/update/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "User updated successfully", updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete book from their bookId
router.delete("/delete/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
