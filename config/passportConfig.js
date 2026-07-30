const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models/queries");
const bcrypt = require("bcryptjs");

//PASSPORT CONFIG HERE:
