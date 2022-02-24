const errorHandler = require("../error/error");
const { isValid, validDate } = require("../valitators/check_valid_value");
const isValidId = require("../valitators/valid_object");
//Bring the creator schema
const advertiserSchema = require("../models/advertiser");

//Bring the category schema
const categorySchema = require("../models/category");
//Bring the ad Schema
const adSchema = require("../models/ads");
const removeFile = require("../helper/remove_file");
/*
@desc: Create a advertiser
@access: Public
*/
exports.createAdvertiser = async (req, res, next) => {
  try {
    const { name, category, startDate, endDate } = req.body;
    //Validate the fields
    if (isValid(name, 1) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error adding an advertiser in createAdvertiser function",
        "Please enter a valid name"
      );
    }
    //Validate the category
    if (
      isValidId(category) == false ||
      (await categorySchema.findOne({ _id: category })) == null
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error adding an advertiser in createAdvertiser function",
        "Please enter a valid category"
      );
    }

    //Validate the dates
    if (validDate(startDate) == false || validDate(endDate) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error adding an advertiser in createAdvertiser function",
        "Please enter a valid date"
      );
    }
    //Create the advertiser and return the result
    await advertiserSchema.create({
      name,
      category,
      startDate,
      endDate,
    });

    return res.status(200).json({
      success: true,
      messege: "Advertiser created successfully",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error adding an advertiser in createAdvertiser function",
      "Error createing an advertiser"
    );
  }
};
/*
@desc: Update an advertiser
@access: Public 
*/
exports.updateAdvertiser = async (req, res, next) => {
  try {
    const advertiserId = req.query.advertiserId;
    //Validate the id
    if (advertiserId == null) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an advertiser in updateAdvertiser function",
        "Please enter a valid advertiser id"
      );
    }
    const { name, category, startDate, endDate } = req.body;
    //Validate the fields;
    if (isValid(name, 1) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an advertiser in updateAdvertiser function",
        "Please enter a valid name"
      );
    }
    //Validate the category
    if (
      isValidId(category) == false ||
      (await categorySchema.findOne({ _id: category })) == null
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an advertiser in updateAdvertiser function",
        "Please enter a valid category"
      );
    }

    //Validate the dates
    if (validDate(startDate) == false || validDate(endDate) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an advertiser in updateAdvertiser function",
        "Please enter a valid date"
      );
    }
    //Create the advertiser and return the result
    const advertiser = await advertiserSchema.findOneAndUpdate(
      {
        _id: advertiserId,
      },
      {
        name,
        category,
        startDate,
        endDate,
      },
      { new: true }
    );
    if (advertiser == null) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an advertiser in updateAdvertiser function",
        "No advertiser present with this id!s"
      );
    }

    return res.status(200).json({
      success: true,
      messege: "Advertiser updated successfully",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error updating an advertiser in updateAdvertiser function",
      "Error updating an advertiser"
    );
  }
};
/* 
@desc: Get an advertiser
@access: Public
*/
exports.getAdvertiser = async (req, res, next) => {
  try {
    const advertiserId = req.query.advertiserId;

    //Validate the id
    if (isValidId(advertiserId) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error fetching an advertiser in getAdvertiser function",
        "Please provide a valid advertiser id"
      );
    }
    const advertiser = await advertiserSchema
      .findOne({ _id: advertiserId })
      .populate(["category"]);
    if (advertiser == null) {
      return await errorHandler(
        res,
        next,
        null,
        "Error fetching an advertiser in getAdvertiser function",
        "No advertiser with this id present"
      );
    }
    return res.status(200).json({
      success: true,
      data: advertiser,
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error fetching an advertiser in getAdvertiser function",
      "Error fetching an advertiser"
    );
  }
};
/*
@desc: Delete advertiser
@access: public
*/
exports.deleteAdvertiser = async (req, res, next) => {
  try {
    const advertiserId = req.query.advertiserId;

    //Validate the id
    if (isValidId(advertiserId) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error deleting an advertiser in deleteAdvertiser function",
        "Please provide a valid advertiser id"
      );
    }
    const advertiser = await advertiserSchema.findOneAndDelete({
      _id: advertiserId,
    });
    if (advertiser == null) {
      return await errorHandler(
        res,
        next,
        null,
        "Error deleting an advertiser in deleteAdvertiser function",
        "No advertiser with this id present"
      );
    }
    //Delete all the ads associated with this advertiser
    const allAdsWithThisCreator = await adSchema.deleteMany({
      creator: advertiserId,
    });

    return res.status(200).json({
      success: true,
      messege:
        "Advertiser and all the ads associated with it deleted successfully!",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error deleting an advertiser in deleteAdvertiser function",
      "Error deleting an advertiser"
    );
  }
};
/*
@desc: Get all the advertiser
@access: Public
*/
exports.getAllAdvertiser = async (req, res, next) => {
  try {
    const allAdvertiser = await advertiserSchema.find().populate(["category"]);
    return res.status(200).json({
      success: true,
      data: allAdvertiser,
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error deleting an advertiser in deleteAdvertiser function",
      "Error deleting an advertiser"
    );
  }
};
