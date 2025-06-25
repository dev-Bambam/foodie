import mongoose, { Document } from "mongoose";

//User Interface
export interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   role: "customer" | "admin";
   phone?: string;
   address?: {
      street: string;
      city: string;
      state: string;
   };
   createdAt: Date;
}
