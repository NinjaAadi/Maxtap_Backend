const express = require("express");

const router = express.Router();

//Bring the controller functions
const {
  addAd,
  updateAd,
  getAd,
  getAllAds,
  deleteAd,
} = require("../controllers/ads");

router.route("/createAd").post(addAd);
router.route("/updateAd").put(updateAd);
router.route("/getAd").get(getAd);
router.route("/deleteAd").delete(deleteAd);
router.route("/getAllAds").get(getAllAds);

module.exports = router;
