require("dotenv").config();
const express = require("express");

const app = express();
const secretboardRouter = require("./routes/secretboardRoutes");
const path = require("node:path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", secretboardRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App is now live! Listening on port ${PORT}!`);
});
