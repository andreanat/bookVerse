const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("library-api")
      .collection("students")
      .find();

    const students = await result.toArray();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db("library-api")
      .collection("students")
      .find({ _id: studentId });

    const students = await result.toArray();
    res.status(200).json(students[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      studentId,
      gradeLevel,
      email,
      readingGoal,
      booksRead
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !studentId ||
      !gradeLevel ||
      !email ||
      readingGoal === undefined ||
      booksRead === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = {
      firstName,
      lastName,
      studentId,
      gradeLevel,
      email,
      readingGoal,
      booksRead
    };

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("students")
      .insertOne(student);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const {
      firstName,
      lastName,
      studentId,
      gradeLevel,
      email,
      readingGoal,
      booksRead
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !studentId ||
      !gradeLevel ||
      !email ||
      readingGoal === undefined ||
      booksRead === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = {
      firstName,
      lastName,
      studentId,
      gradeLevel,
      email,
      readingGoal,
      booksRead
    };

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("students")
      .replaceOne({ _id: id }, student);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Error updating student" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("students")
      .deleteOne({ _id: id });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Error deleting student" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};