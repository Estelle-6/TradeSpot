import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // save user in database
    userModel.createUser(username, email, hashedPassword, (err, result) => {
      if (err) {
        console.log("Error inserting user:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};