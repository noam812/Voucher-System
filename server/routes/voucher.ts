import express from "express";
import Voucher from "../models/voucher";

const router = express.Router();

router.post(`/`, async (req, res) => {
  try {
    const { amount, cost, company } = req.body;
    const voucher = new Voucher({ amount, cost, company });
    await voucher.save();
    res.json(voucher);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while creating the voucher");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }
    res.json(voucher);
  } catch (error) {
    res.status(500).json({ message: "Error fetching voucher" });
  }
});

router.get("/", async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    if (!vouchers) {
      return res.status(404).json({ message: "No vouchers found" });
    }
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vouchers" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { amount, cost, company } = req.body;
    const voucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      { amount, cost, company },
      { new: true }
    );
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }
    res.json(voucher);
  } catch (error) {
    res.status(500).json({ message: "Error updating voucher" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }
    res.json({ message: "Voucher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting voucher" });
  }
});

export default router;
