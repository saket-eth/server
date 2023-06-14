const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = async ({ _id }) => {
  const token = jwt.sign({ userId: _id }, process.env.JWT_ACCESS_SECRETE_KEY, {
    expiresIn: process.env.JWT_EXP,
  });
  return token;
};

module.exports.validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the Authorization header

  jwt.verify(token, process.env.JWT_ACCESS_SECRETE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    }

    // Store the decoded user information for subsequent use

    req.user = decoded;
    next();
  });
};
