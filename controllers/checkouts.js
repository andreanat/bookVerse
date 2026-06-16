const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("library-api")
      .collection("checkouts")
      .find();

    const checkouts = await result.toArray();
    res.status(200).json(checkouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const checkoutId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db("library-api")
      .collection("checkouts")
      .find({ _id: checkoutId });

    const checkouts = await result.toArray();
    res.status(200).json(checkouts[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCheckout = async (req, res) => {
  try {
    const {
      studentId,
      bookTitle,
      checkoutDate,
      dueDate,
      returned,
      lateFee
    } = req.body;

    if (
      !studentId ||
      !bookTitle ||
      !checkoutDate ||
      !dueDate ||
      returned === undefined ||
      lateFee === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const checkout = {
      studentId,
      bookTitle,
      checkoutDate,
      dueDate,
      returned,
      lateFee
    };

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("checkouts")
      .insertOne(checkout);

    res.status(201).json({
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const updateCheckout = async (req, res) => {
  try {
    const checkoutId = new ObjectId(req.params.id);

    const {
      studentId,
      bookTitle,
      checkoutDate,
      dueDate,
      returned,
      lateFee
    } = req.body;

    if (
      !studentId ||
      !bookTitle ||
      !checkoutDate ||
      !dueDate ||
      returned === undefined ||
      lateFee === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const checkout = {
      studentId,
      bookTitle,
      checkoutDate,
      dueDate,
      returned,
      lateFee
    };

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("checkouts")
      .replaceOne({ _id: checkoutId }, checkout);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: "Error updating checkout"
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const deleteCheckout = async (req, res) => {
  try {
    const checkoutId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db("library-api")
      .collection("checkouts")
      .deleteOne({ _id: checkoutId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: "Error deleting checkout"
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCheckout,
  updateCheckout,
  deleteCheckout
};