import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
    console.log("conectado com o banco");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export default connectDatabase;
