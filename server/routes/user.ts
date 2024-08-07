import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import auth from "../middleware/auth";

const router = express.Router();

// Register a new user and return a token
router.post(`/`, async (req, res) => {
  try {
    const { email, password, balance } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, balance });
    await user.save();

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while creating the user");
  }
});

// Get user by ID
router.get(`/:id`, auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while fetching the user");
  }
});

// Get all users
router.get(`/`, auth, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json("No users found");
    }
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while fetching the users");
  }
});

// Update user balance
router.put(`/:id/balance`, auth, async (req, res) => {
  try {
    const { balance } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { balance },
      { new: true }
    );
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while updating the user's balance");
  }
});

export default router;
