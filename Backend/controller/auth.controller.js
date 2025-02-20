import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

import {
  createUser,
  getAllUsers,
  getUserByUsername,
} from "../models/queries.js";

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await getUserByUsername(userName);
    // First check if the user exists
    if (!user) {
      return res.status(409).json({ error: "Invalid Username or Password" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(409).json({ error: "Invalid Username or Password" });
    }

    generateRefreshToken(user.userName, user.role, res);

    res.status(200).json({
      userId: user.id,
      name: user.name,
      userName: user.userName,
      role: user.role,
      accessToken: generateAccessToken(user.userName, user.role),
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("refreshToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in sign up controller", error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { name, contact, username, password, email, role } = req.body;
    await createUser(name, contact, username, password, email, role).then(
      async (result) => {
        if (!result.success) {
          return res.status(409).json({ data: "Username already exits" });
        }
        return res.status(200).json({ data: await getAllUsers() });
      }
    );
  } catch (error) {
    console.log("Error in sign up controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = [];
    const response = await getAllUsers();
    response.map((user) => {
      const oneUser = {};
      oneUser.id = user.id;
      oneUser.name = user.name;
      oneUser.username = user.username;
      users.push(oneUser);
    });

    return res.send(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
