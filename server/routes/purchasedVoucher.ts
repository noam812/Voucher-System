import express from "express";
import User from "../models/user";
import PurchasedVoucher from "../models/purchasedVoucher";
import Voucher from "../models/voucher";

const router = express.Router();

router.put(`/`, async (req, res) => {
  try {
    const { userId, voucherId } = req.body;
    const user = await User.findById(userId);
    const voucher = await Voucher.findById(voucherId);
    if (!user || !voucher) {
      return res.status(404).json("User or voucher not found");
    }
    if (user.balance < voucher.cost) {
      return res.status(400).json("Insufficient balance");
    }
    if (voucher.amount <= 0) {
      return res.status(400).json("Voucher out of stock");
    }

    const purchasedVoucher = new PurchasedVoucher({
      user: userId,
      voucher: voucherId,
    });

    await purchasedVoucher.save();
    user.balance -= voucher.cost;
    user.purchasedVouchers.push(purchasedVoucher._id);
    await user.save();

    voucher.amount -= 1;
    await voucher.save();

    res.status(201).json(purchasedVoucher);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while purchasing the voucher");
  }
});

export default router;
