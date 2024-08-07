import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const router = express.Router();
router.post(`/`, async (req, res) => {
  try {
    const { email, password, balance } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, balance });
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while creating the user");
  }
});

router.get(`/:id`, async (req, res) => {
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

router.get(`/`, async (req, res) => {
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
router.put(`/:id/balance`, async (req, res) => {
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
