const mongoose = require("mongoose");

const db = async () => {
  try {
    const c = await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to MONGO_DATABASE");
  } catch (e) {
    console.log(e);
  }
};



module.exports = db;