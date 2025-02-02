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

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("body of request", req.body)

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ error: "Email and password are required" });
  }

  userModel.findByEmail(email, async (err, user) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password validation:', isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Send user data (exclude password)
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      console.log('Login successful:', userData);
      res.status(200).json({
        message: "Login successful",
        user: userData,
      });
    } catch (error) {
      console.log("Error comparing passwords:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
