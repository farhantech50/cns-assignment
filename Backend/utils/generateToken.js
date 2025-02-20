import express from "express";
const app = express.Router();
import jwt from "jsonwebtoken";

const generateAccessToken = (userName, userRole) => {
  const token = jwt.sign({ userName, userRole }, process.env.JWT_KEY, {
    expiresIn: "1m",
  });
  return token;
};

const generateRefreshToken = (userName, userRole, res) => {
  const token = jwt.sign({ userName, userRole }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  res.cookie("refreshToken", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    secure: true,
    sameSite: "strict",
  });
};

const newAccessToken = app.post("/", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res
      .status(401)
      .json({ error: "Forbidden in token Route", message: "No Refresh Token" });

  jwt.verify(refreshToken, process.env.JWT_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ error: "Refresh Token is not valid access this resourse" });
    const newAccessToken = generateAccessToken(user.userName, user.userRole);
    res.status(200).json({ accessToken: newAccessToken });
  });
});

export { generateAccessToken, generateRefreshToken, newAccessToken };
