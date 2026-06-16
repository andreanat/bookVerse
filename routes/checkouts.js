const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticate");

const checkoutsController = require("../controllers/checkouts");

router.get("/", checkoutsController.getAll);
router.get("/:id", checkoutsController.getSingle);

router.post("/", isAuthenticated, checkoutsController.createCheckout);
router.put("/:id", isAuthenticated, checkoutsController.updateCheckout);
router.delete("/:id", isAuthenticated, checkoutsController.deleteCheckout);

module.exports = router;