// middleware/validation.js

const { validationResult } = require("express-validator");

module.exports = (view) => {
  return (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors.array());

    if (!errors.isEmpty()) {
      return res.render(view, {
        errors: errors.mapped(),
        oldInput: req.body,
      });
    }

    next();
  };
};
