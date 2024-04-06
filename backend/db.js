//in this folder we connect to backend
const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/dropbox";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL)
    console.log("Connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;
