const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("library-api")
      .collection("books")
      .find();

    const books = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db("library-api")
      .collection("books")
      .find({ _id: bookId });

    const books = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      pages,
      publishedYear,
      language,
      available
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !pages ||
      !publishedYear ||
      !language ||
      available === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const book = {
      title,
      author,
      genre,
      pages,
      publishedYear,
      language,
      available
    };

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("books")
      .insertOne(book);

    res.status(201).json({
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);

    const {
      title,
      author,
      genre,
      pages,
      publishedYear,
      language,
      available
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !pages ||
      !publishedYear ||
      !language ||
      available === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const book = {
      title,
      author,
      genre,
      pages,
      publishedYear,
      language,
      available
    };

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("books")
      .replaceOne({ _id: bookId }, book);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: "Error updating book"
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("books")
      .deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: "Error deleting book"
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};