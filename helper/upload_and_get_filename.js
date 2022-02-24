const fs = require("fs");
const path = require("path");

const uploadAndGetFileName = async (image, id, pathToSave) => {
  const fileName = `${id}${path.parse(image.name).ext}`;
  //Set the image name to the modified name value
  image.name = fileName;

  //Move to the directory
  image.mv(`${pathToSave}/${image.name}`, async (err) => {
    if (err) {
      console.log("reaching here"); 
      console.log(err);
    }
  });

  return fileName;
};

module.exports = uploadAndGetFileName;
