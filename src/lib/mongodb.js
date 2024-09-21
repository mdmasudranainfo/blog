const { default: mongoose } = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connection succeeded");
  } catch (e) {
    console.log("database", e);
  }
};

export default connectMongoDB;
