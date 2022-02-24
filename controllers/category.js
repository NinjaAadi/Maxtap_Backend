const errorHandler = require("../error/error");
const { isValid } = require("../valitators/check_valid_value");
const isValidId = require("../valitators/valid_object");
//Bring the category schema
const categorySchema = require("../models/category");
const req = require("express/lib/request");

//Bring the ad Schema and the advertiser schema
const adSchema = require("../models/ads");
const advertiserSchema = require("../models/advertiser");
const ads = require("../models/ads");
/*
@desc: Add a category
@access: Public
*/
exports.addCategory = async (req, res, next) => {
  try {
    const name = req.body.name;

    //Validate the name
    if (isValid(name, 1) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error adding a category in addCategory function",
        "Please provide a valid category name"
      );
    }

    //Add the category to the database
    await categorySchema.create({ name: name });

    //Return the result
    return res.status(200).json({
      success: true,
      messege: "Category added successfully!",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error adding a category in addCategory function",
      "Error adding a category"
    );
  }
};

/*
@desc: Update a category
@access: Public
*/
exports.updateCategory = async (req, res, next) => {
  try {
    const name = req.body.name;
    const categoryId = req.query.categoryId;
    //Validate the name
    if (isValid(name, 1) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating a category in updateCategory function",
        "Please provide a valid category name"
      );
    }
    //Validate the id
    if (isValidId(categoryId) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating a category in updateCategory function",
        "Please provide a valid category id"
      );
    }
    //Find the category
    const category = await categorySchema.findOne({ _id: categoryId });
    if (category == null) {
      return await errorHandler(
        res,
        next,
        null,
        "Error updating a category in updateCategory function",
        "There is no category with this id"
      );
    }
    //Update the result
    category.name = name;
    await category.save();
    //Return the result
    return res.status(200).json({
      success: true,
      messege: "Category updated successfully!",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error updating a category in updateCategory function",
      "Error updating a category"
    );
  }
};

/*
@desc: Get all category
@access: Public
*/
exports.getAllCategory = async (req, res, next) => {
  try {
    const allCategory = await categorySchema.find();

    //Return the result
    return res.status(200).json({
      success: true,
      data: allCategory,
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error fetching all the categories in getAllCategory function",
      "Error fetching all the categories"
    );
  }
};

/*
@desc: Delete a category
@access: Public
*/
exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.query.categoryId;

    //Validate the id
    if (isValidId(categoryId) == false) {
      return await errorHandler(
        res,
        next,
        null,
        "Error deleting a category in deleteCategory function",
        "Please provide a valid category id"
      );
    }
    //Find the category
    const category = await categorySchema.findOneAndDelete({ _id: categoryId });
    if (category == null) {
      return await errorHandler(
        res,
        next,
        null,
        "Error deleting a category in deleteCategory function",
        "There is no category with this id"
      );
    }

    //Delete all the ads and the advertisers with this category
    await adSchema.deleteMany({ category: categoryId });
    await advertiserSchema.deleteMany({ category: categoryId });
    //Return the result
    return res.status(200).json({
      success: true,
      messege: "Category deleted successfully!",
    });
  } catch (error) {
    return await errorHandler(
      res,
      next,
      error,
      "Error deleting all the categories in deleteCategory function",
      "Error deleting all the categories"
    );
  }
};
