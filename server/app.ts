import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import voucherRoutes from "./routes/voucher";
import purchasedVoucerRoutes from "./routes/purchasedVoucher";
var cors = require("cors");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/users", userRoutes);
app.use("/vouchers", voucherRoutes);
app.use("/purchase", purchasedVoucerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
