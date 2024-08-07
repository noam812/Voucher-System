import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  balance: number;
  purchasedVouchers: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  purchasedVouchers: [{ type: Schema.Types.ObjectId, ref: "PurchasedVoucher" }],
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
