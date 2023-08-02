const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const { DB_HOST, DB_PORT } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(DB_PORT, () => {
      console.log(`Database connection successful. Use our API on port: ${DB_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
