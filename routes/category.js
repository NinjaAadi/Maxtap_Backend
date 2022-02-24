const express = require("express");

const router = express.Router();

//Bring the controller functions
const {
  addCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
} = require("../controllers/category");

router.route("/addCategory").post(addCategory);
router.route("/updateCategory").put(updateCategory);
router.route("/getAllCategory").get(getAllCategory);
router.route("/deleteCategory").delete(deleteCategory);

module.exports = router;
