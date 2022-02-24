const express = require("express");

const router = express.Router();

//Bring the controller functions
const {
  createAdvertiser,
  updateAdvertiser,
  getAdvertiser,
  deleteAdvertiser,
  getAllAdvertiser,
} = require("../controllers/advertiser");

router.route("/createAdvertiser").post(createAdvertiser);
router.route("/updateAdvertiser").put(updateAdvertiser);
router.route("/getAdvertiser").get(getAdvertiser);
router.route("/deleteAdvertiser").delete(deleteAdvertiser);
router.route("/getAllAdvertiser").get(getAllAdvertiser);

module.exports = router;
