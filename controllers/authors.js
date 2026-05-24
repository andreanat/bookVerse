const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("library-api")
      .collection("authors")
      .find();

    const authors = await result.toArray();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db("library-api")
      .collection("authors")
      .find({ _id: authorId });

    const authors = await result.toArray();
    res.status(200).json(authors[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      nationality,
      birthYear,
      notableWork
    } = req.body;

    if (!firstName || !lastName || !nationality || !birthYear || !notableWork) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const author = {
      firstName,
      lastName,
      nationality,
      birthYear,
      notableWork
    };

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("authors")
      .insertOne(author);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);

    const {
      firstName,
      lastName,
      nationality,
      birthYear,
      notableWork
    } = req.body;

    if (!firstName || !lastName || !nationality || !birthYear || !notableWork) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const author = {
      firstName,
      lastName,
      nationality,
      birthYear,
      notableWork
    };

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("authors")
      .replaceOne({ _id: authorId }, author);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Error updating author" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("authors")
      .deleteOne({ _id: authorId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Error deleting author" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};