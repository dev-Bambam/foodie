"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DatabaseConnect = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Databse connected successfully");
    }
    catch (error) {
        console.error(`Error connecting: ${error}`);
    }
};
exports.default = DatabaseConnect;
