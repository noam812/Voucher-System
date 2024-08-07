import mongoose, { Schema, Document } from "mongoose";

export interface IVoucher extends Document {
  amount: number;
  cost: number;
  company: string;
}

const VoucherSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  cost: { type: Number, required: true },
  company: { type: String, required: true },
});

const Voucher = mongoose.model<IVoucher>("Voucher", VoucherSchema);

export default Voucher;
