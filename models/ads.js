const mongoose = require("mongoose");

const adsSchema = mongoose.Schema({
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  imageUrl: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "advertiser",
  },
});

module.exports = mongoose.model("ads", adsSchema);
