const pool = require("../config/pool");
const { validationResult } = require("express-validator");

async function renderHomepage(req, res) {
  res.render("index");
}

module.exports = {
  renderHomepage,
};
