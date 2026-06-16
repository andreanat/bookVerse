const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticate");

const studentsController = require("../controllers/students");

router.get("/", studentsController.getAll);
router.get("/:id", studentsController.getSingle);

router.post("/", isAuthenticated, studentsController.createStudent);
router.put("/:id", isAuthenticated, studentsController.updateStudent);
router.delete("/:id", isAuthenticated, studentsController.deleteStudent);

module.exports = router;