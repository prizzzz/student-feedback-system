const mongoose = require('mongoose');

/**
 * Function to connect to the MongoDB database.
 * We use async/await because connecting to a database is a 
 * network request that takes time to complete.
 */
const connectDB = async () => {
  try {
    // Attempt to connect using the URI stored in the .env file
    // process.env.MONGO_URI is provided by the dotenv package
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, log the host name to the console
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs, log the message and stop the server
    console.error(`Error: ${error.message}`);
    process.exit(1); // 1 means exit with failure
  }
};

// Export the function so it can be used in server.js
module.exports = connectDB;