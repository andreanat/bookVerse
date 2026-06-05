const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticate");
const booksController = require("../controllers/books.js");

router.get("/", isAuthenticated, booksController.getAll);
router.get("/:id", isAuthenticated, booksController.getSingle);
router.post("/", isAuthenticated, booksController.createBook);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;