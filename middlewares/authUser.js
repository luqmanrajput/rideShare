const jwt = require("jsonwebtoken");
const JWT_SECRET = "mySecretString";

const authUser = async (req, res, next) => {
  const token = req.headers["token"];
  console.log(token);
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }
  try {
    const verification = await jwt.verify(token, JWT_SECRET);
    req.user = verification.user;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate token" });
  }
};

module.exports = authUser;
