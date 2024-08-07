import mongoose, { Schema, Document } from "mongoose";

export interface IPurchasedVoucher extends Document {
  user: mongoose.Types.ObjectId;
  voucher: mongoose.Types.ObjectId;
  purchaseDate: Date;
}

const PurchasedVoucherSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  voucher: { type: Schema.Types.ObjectId, ref: "Voucher", required: true },
  purchaseDate: { type: Date, default: Date.now },
});

const PurchasedVoucher = mongoose.model<IPurchasedVoucher>(
  "PurchasedVoucher",
  PurchasedVoucherSchema
);

export default PurchasedVoucher;
