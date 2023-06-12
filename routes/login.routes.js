const router = require("express").Router();
const sha256 = require("sha256");
const User = require("../models/user.model");
const { generateAccessToken } = require("../helpers/jwt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const hashedPassword = sha256(password.toString());
    if (hashedPassword !== user.password) {
      return res.send({ error: true, message: "Invalid Password" });
    }

    const access_token = await generateAccessToken(user._id);
    return res.send({ token: access_token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
