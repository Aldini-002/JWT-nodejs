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

// static method to login user
userSchema.statics.signin = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

export default User;
