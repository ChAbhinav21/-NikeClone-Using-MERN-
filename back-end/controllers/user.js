// back-end/controllers/user.js
const User = require('../model/user');
const { setToken } = require('../service/auth');

// ================= CREATE USER / SIGNUP =================
const createUser = async (req, res) => {
  const { email, password, addresses, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ msg: "All required fields must be provided" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      email: email.trim().toLowerCase(),
      password,
      addresses,
      firstName,
      lastName,
    });

    // Generate JWT token
    const token = setToken(user);

    // Set token as httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      sameSite: "lax", // for localhost
      secure: false, // true if using https
    });

    // Remove password before sending to frontend
    const userObj = user.toObject();
    userObj.password = undefined;

    // Return response expected by frontend Redux slice
    return res.status(201).json({ user: userObj });

  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ================= LOGIN / AUTH =================
const handelUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await user.correctPassword(password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    // Generate JWT token
    const token = setToken(user);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "lax",
      secure: false,
    });

    // Remove password before sending user
    const userObj = user.toObject();
    userObj.password = undefined;

    // Return expected format
    return res.status(200).json({ user: userObj });

  } catch (error) {
    console.error("Error in handelUserLogin:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, handelUserLogin };
