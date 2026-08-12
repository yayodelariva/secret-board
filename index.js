require("dotenv").config();
const express = require("express");
const path = require("node:path");
const passport = require("passport");

const sessionConfig = require("./config/sessionConfig");

require("./config/passportConfig");

const secretboardRouter = require("./routes/secretboardRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Session middleware FIRST
app.use(sessionConfig());

// Then Passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.isAuth = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

// Routes
app.use("/", secretboardRouter);

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App is now live! Listening on port ${PORT}!`);
});
