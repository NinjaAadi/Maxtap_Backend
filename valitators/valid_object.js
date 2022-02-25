const mongoose = require("mongoose");

const isValidObjId = (id) => {
  console.log(mongoose.isValidObjectId("6218d90496240fd7e8926b5a"));
  return mongoose.isValidObjectId(id.toString());
};

module.exports = isValidObjId;
