import mongoose from "mongoose";
async function dbConnection() {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
    console.log("db connected");
  } catch (error) {
    console.log("db not connected ", error);
  }
}

export { dbConnection };
