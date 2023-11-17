import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    console.log("Already have a db connection!");
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.mongodburl);
  console.log("Mongo DB connected!");
  return handler(req, res);
};

export default connectDB;
