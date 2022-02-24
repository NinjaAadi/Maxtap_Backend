const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const env = require("dotenv").config({ path: path.join(__dirname, ".env") });
const logger = require("./logger/logger");
const app = express();
//Bring the database
const connectDb = require("./database/database");
//Connect to the db
connectDb();

//Server as a static folder
app.use(express.static("public/images"));
//Middleware function for file upload
app.use(fileUpload());

/*Middleware function to use request.body */
app.use(express.json());

//Bring the routes
const categoryRoute = require("./routes/category");
const advertiserRoute = require("./routes/advertiser");
const adRoute = require("./routes/ad");
//routes
app.use(`/${process.env.API_INITIAL_URL}category/`, categoryRoute);
app.use(`/${process.env.API_INITIAL_URL}advertiser/`, advertiserRoute);
app.use(`/${process.env.API_INITIAL_URL}ad/`, adRoute);
app.listen(process.env.PORT, () => {
  logger.info("App running in port " + process.env.PORT);
});
