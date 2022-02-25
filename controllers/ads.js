const errorHandler = require("../error/error");
const {
  isValid,
  isValidTimeString,
  isUrlValid,
} = require("../valitators/check_valid_value");
const isValidId = require("../valitators/valid_object");
const getFileName = require("../helper/upload_and_get_filename");
const removeFile = require("../helper/remove_file");
//Bring the add Schema
const adSchema = require("../models/ads");

//Bring the category schema
const categorySchema = require("../models/category");

//Bring the advertiser schema
const advertiserSchema = require("../models/advertiser");

/*
@desc: Add a ad
@access: Public
*/
exports.addAd = async (req, res, next) => {
  try {
    //Get the ad image from req.body

    const { startTime, endTime, category, creator, imageUrl } = req.body;
    //Validate the image
    if (isUrlValid(imageUrl) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error adding an ad in addAd function",
        "Please provide a valid ad image url"
      );
    }
    //Validate all the fields
    if (
      isValidTimeString(startTime) == false ||
      isValidTimeString(endTime) == false
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error adding an ad in addAd function",
        "Pleave provide a valid timestamp!"
      );
    }

    if (
      isValidId(category) == false ||
      (await categorySchema.findOne({ _id: category })) == null
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error adding an ad in addAd function",
        "Please provide a valid category"
      );
    }
    //Validatate the creator
    if (
      isValidId(creator) == false ||
      (await advertiserSchema.findOne({ _id: creator })) == null
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error adding an ad in addAd function",
        "Please provide a valid creator"
      );
    }
    //Create the add
    await adSchema.create({
      category: category,
      startTime: startTime,
      endTime: endTime,
      creator: creator,
      imageUrl: imageUrl,
    });

    //Return the result
    return res.status(200).json({
      success: true,
      messege: "Ad created successfully",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error adding an ad in addAd function",
      "Error adding an ad"
    );
  }
};

/*
@desc: Update an ad
@access: Public
*/
exports.updateAd = async (req, res, next) => {
  try {
    //Get the adId from the url and validate it
    const adId = req.query.adId;
    console.log(isValidId(adId));
    if (
      isValidId(adId) == false ||
      (await adSchema.findOne({ _id: adId })) == null
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an ad in updateAd function",
        "Please provide a valid ad Id"
      );
    }

    const { startTime, endTime, category, creator, imageUrl } = req.body;
    console.log(
      req.body.startTime,
      req.body.endTime,
      category,
      creator,
      imageUrl
    );
    console.log(isUrlValid(imageUrl));
    //Validate the image
    if (isUrlValid(imageUrl) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an ad in updateAd function",
        "Please provide a valid ad image url"
      );
    }
    //Validate all the fields
    if (
      isValidTimeString(startTime) == false ||
      isValidTimeString(endTime) == false
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an ad in updateAd function",
        "Pleave provide a valid timestamp!"
      );
    }

    if (
      isValidId(category) == false ||
      (await categorySchema.findOne({ _id: category })) == null
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an ad in updateAd function",
        "Please provide a valid category"
      );
    }
    //Validatate the creator
    if (
      isValidId(creator) == false ||
      (await advertiserSchema.findOne({ _id: creator })) == null
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating an ad in updateAd function",
        "Please provide a valid creator"
      );
    }
    //Fetch the ad
    const ad = await adSchema.findOne({ _id: adId });

    //Update the other result
    ad.category = category;
    ad.startTime = startTime;
    ad.endTime = endTime;
    ad.creator = creator;
    ad.imageUrl = imageUrl;
    ad.save();
    //Return the result
    return res.status(200).json({
      success: true,
      messege: "Ad updated successfully",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error updating an ad in updateAd function",
      "Error updating an ad"
    );
  }
};
/*
@desc: Get an ad with id
@access: Public
*/
exports.getAd = async (req, res, next) => {
  try {
    //Get the adId from the url and validate it
    const adId = req.query.adId;
    if (
      isValidId(adId) == false ||
      (await adSchema.findOne({ _id: adId })) == null
    ) {
      return await errorHandler(
        res,
        next,
        null,
        "Error fetching an ad in getAd function",
        "Please provide a valid ad Id"
      );
    }

    const ad = await adSchema
      .findOne({ _id: adId })
      .populate(["category", "creator"]);

    //Return the result
    return res.status(200).json({
      success: true,
      data: ad,
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error fetching an ad in getAd function",
      "Error fetching an ad"
    );
  }
};

/*
@desc: Get all ads
@access: Public
*/
exports.getAllAds = async (req, res, next) => {
  try {
    const ads = await adSchema.find().populate(["category", "creator"]);
    return res.status(200).json({
      success: true,
      data: ads,
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error fetching all ad in getAllAds function",
      "Error fetching all ads"
    );
  }
};
/*
@desc: Delete an ad
@access: Public
*/
exports.deleteAd = async (req, res, next) => {
  try {
    //Get the adId from the url and validate it
    const adId = req.query.adId;
    if (isValidId(adId) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error deleting an ad in deleteAd function",
        "Please provide a valid ad Id"
      );
    }
    //Check if there is an ad with this id or not
    const ad = await adSchema.findOneAndDelete({ _id: adId });
    if (ad == null) {
      return await errorHandler(
        res,
        next,
        null,
        "Error deleting an ad in deleteAd function",
        "There is no ad with this id present"
      );
    }
    return res.status(200).json({
      success: true,
      messege: "Ad deleted successfully!",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error deleting an ad in deleteAd function",
      "Error deleting the ad"
    );
  }
};
