import mongoose, {Document} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document{
   id: mongoose.Types.ObjectId
   name: string
   email: string
   password: string
   role: string
   phone: string
   address?: {
      street: string
      city: string
      state: string
   }

}
// User Schema
const userSchema = new mongoose.Schema<IUser>(
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
