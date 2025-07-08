import mongoose from "mongoose";
import { TUser } from "../api/user/types/user.types";
import bcrypt from "bcryptjs";

// User Schema
const userSchema = new mongoose.Schema<TUser>(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["customer", "admin"], default: "customer" },
      phone: { type: String },
      address: {
         street: { type: String },
         city: { type: String },
         state: { type: String },
      },
   },
   { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

const User = mongoose.model("User", userSchema);

export default User;
