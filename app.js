require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT;
const connectionString = process.env.connectionString;

const app = express();
app.use(express.json());

app.use(cors());

try {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log(err);
}

app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
