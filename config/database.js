import { readFileSync } from "fs";
import mongoose from "mongoose";
import path from "path";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      sslValidate: true,
      sslKey: path.resolve('./config/mongo_cert.pem'),
      sslCert: path.resolve('./config/mongo_cert.pem'),
      authMechanism: "MONGODB-X509",
      authSource: "$external",
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected at ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit();
  }
};

export default connectDatabase;
