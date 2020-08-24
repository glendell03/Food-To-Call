const router = require("express").Router();
const User = require("../models/user.model");
const auth = require("../middleware/auth");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    let { username } = req.body;

    // Validate

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "The password must be atleast 5 characters long" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password did not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }
    if (!username) {
      username = email;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 8);

    // Save new user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "No account found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/me", auth, async (req, res) => {
  try {
    const deleteduser = await User.findByIdAndDelete(req.user);
    res.json(deleteduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/isValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user);

  const { username, email, _id } = user;
  res.json({
    username,
    email,
    _id,
  });
});

module.exports = router;
