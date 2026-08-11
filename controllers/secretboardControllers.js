const bcrypt = require("bcryptjs");
const pool = require("../config/pool");
const { validationResult } = require("express-validator");

const renderHomepage = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        messages.id,
        messages.message,
        messages.created_at,
        users.username
      FROM messages
      JOIN users ON messages.user_id = users.id
      ORDER BY messages.created_at DESC
    `);

    res.render("index", {
      posts: result.rows,
      isAuthenticated: req.isAuthenticated(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading posts");
  }
};

async function renderSignup(req, res) {
  res.render("signup", {
    errors: {},
    oldInput: {},
  });
}

async function createSignup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    //Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user and hashed password into the database
    await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
      [username, hashedPassword],
    );

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function renderLogin(req, res) {
  res.render("login", {
    errors: {},
    oldInput: {},
  });
}

const createPost = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  if (!message || message.trim() === "") {
    return res.status(400).send("Post cannot be empty");
  }

  try {
    await pool.query(
      `INSERT INTO messages (message, user_id)
       VALUES ($1, $2)`,
      [message.trim(), userId],
    );

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
};

module.exports = {
  renderHomepage,
  renderSignup,
  renderLogin,
  createSignup,
  createPost,
};
