import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "masukkan email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "email tidak valid"],
    },
    password: {
        type: String,
        required: [true, "masukkan password"],
        minLength: [6, "minimal 6 karakter"],
    },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("user", userSchema);

export default User;
